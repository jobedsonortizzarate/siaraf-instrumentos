import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

import { Comparison, Order } from '../constants';
import { BaseRepository } from '../domain/base-repository';
import { Filter } from '../dtos/filter';
import { PageInfo } from '../dtos/page-info';
import { QueryParams } from '../dtos/query-params';
import { Wrapper } from '../dtos/wrapper';
import { FechaUtiles } from '../utiles/date.util';
import { RepositoryMessages } from './base-repository.messagess';

//K es el tipo de entidad K es el modelo de dominio
export abstract class BaseRepositoryService<T, K>
  implements BaseRepository<T, K>
{
  public abstract getRepository(): Repository<T>;
  public abstract modelToEntity(model: K): T;
  public abstract entityToModel(entities: T): K;

  public entitiesToModels(entities: T[]): K[] {
    if (entities && entities.length > 0) {
      return entities.map((model) => this.entityToModel(model));
    } else {
      return [];
    }
  }

  public modelsToEntities(models: K[]): T[] {
    if (models && models.length > 0) {
      return models.map((model) => this.modelToEntity(model));
    } else {
      return [];
    }
  }

  public async count(queryParams: QueryParams): Promise<PageInfo> {
    if (!queryParams) {
      throw new Error('queryParams is null');
    }
    const metadata = this.getRepository().metadata;
    const queryBuilder = this.getRepository().createQueryBuilder('table');
    // Logger.debug('>>queryBuilder', queryBuilder);
    const skip = (queryParams.page - 1) * queryParams.take;
    //ORDENAR SOLO SI VIENE EL DATO DE ORDENAMIENTO
    if (queryParams.orderColumn) {
      // Logger.debug(queryParams.orderColumn);
      const ids = queryParams.orderColumn
        ? [queryParams.orderColumn]
        : this.getRepository().metadata.primaryColumns.map(
            (column) => column.propertyName,
          );
      //iterar por cada una de las propiedades de ordenamiento
      ids.forEach((id) => queryBuilder.addOrderBy(id, queryParams.order));
    }
    //iterar por cada una de las propiedades de busqueda
    if (queryParams.filters) {
      queryParams.filters.forEach((filter, idx) => {
        let newFilter: Filter;
        if (filter instanceof Filter) {
          newFilter = filter;
        } else {
          // Logger.debug('Base Repository:findAll filters JSON...');
          newFilter = JSON.parse((filter as string).toString());
        }
        const selectString = this.filterToSelect(
          newFilter,
          metadata.columns.some(
            (column) =>
              (column.type === 'date' || column.type === 'datetime') &&
              column.propertyName === newFilter.property,
          ),
        );
        // Logger.debug('>>>', selectString);
        idx == 0
          ? queryBuilder.where(selectString)
          : queryBuilder.andWhere(selectString);
      });
    }
    //paginar
    queryBuilder.skip(skip).take(queryParams.take);
    const totalItems = await queryBuilder.getCount();
    if (totalItems <= 0) {
      return Promise.resolve({
        totalItems: 0,
        totalPage: 0,
      });
    }

    const extraPage = totalItems % queryParams.take > 0 ? 1 : 0;
    const totalPage = Math.trunc(totalItems / queryParams.take) + extraPage;

    return Promise.resolve({
      totalItems,
      totalPage,
    });
  }

  //NUEVO CON CORRECCIONES PARA DATOS DECIMALES MAYORES A 16 DIGITOS CON SCALE=0
  public async create(data: T | T[] | any): Promise<Wrapper<K>> {
    if (!data) {
      throw new Error('Data is null');
    }
    // Logger.debug(data);
    const arrayData = Array.isArray(data) ? data : [data];
    //Si llega hasta aca significa que requiere conversion por datos largos
    //obtener metadatos de la entidad
    const metadata = this.getRepository().metadata;
    const columns = metadata.columns.map((column) => {
      return { propertyName: column.propertyName, propertyType: column.type };
    });
    // Logger.debug(JSON.stringify(columns));
    //variable para guardar el query
    let queryString = `INSERT INTO ${metadata.tableName} (`;
    columns.forEach(
      (column, idx) =>
        (queryString += `${(idx == 0 ? '' : ',') + column.propertyName}`),
    );
    queryString = queryString.concat(') VALUES ');
    //iterar por cada elemento del array
    arrayData.forEach((element, idxElement: number) => {
      // Logger.debug(`First column: ${data['fnnumeroapertura']}`);
      //abrir parentesis para el objeto, en caso del segundo dato en adelante, iniciar con ','
      queryString = queryString.concat(idxElement === 0 ? '(' : ',(');
      columns.forEach((column: any, idx: number) => {
        // Logger.debug(
        //   `property:${column.propertyName} value: ${element[column.propertyName]}`,
        // );
        if (
          column.propertyName === 'fnencomienda' &&
          !element[column.propertyName]
        ) {
          Logger.debug(`Error, encomienda undefined`);
        }
        queryString = queryString.concat(
          `${idx == 0 ? '' : ','} 
          ${
            element[column.propertyName] === null ||
            element[column.propertyName] === undefined ||
            element[column.propertyName] === 'null'
              ? null
              : column.propertyType === 'date' ||
                column.propertyType === 'datetime'
              ? "'" +
                this.convertDateToDatetime(element[column.propertyName]) +
                "'"
              : "'" + element[column.propertyName] + "'"
          } `,
          // ${
          //   column.propertyType === 'date'
          //     ? this.convertDateToDatetime(element[column.propertyName])
          //     : element[column.propertyName]
          // }`,
        );
      });
      queryString = queryString.concat(')');
    });
    queryString = queryString.concat(';');

    // Logger.debug(queryString);
    //hacer el insert
    await this.getRepository().query(queryString);
    return new Wrapper<K>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      null,
      true,
      RepositoryMessages.CreateSuccess,
      null,
    );
    // }
  }
  //NUEVO CON CORRECCIONES PARA DATOS DECIMALES MAYORES A 16 DIGITOS CON SCALE=0
  public async findOneById(id: string | any): Promise<Wrapper<K>> {
    if (!id) {
      throw new Error('Id is null');
    }
    // Logger.debug(JSON.stringify(id));
    const metadata = this.getRepository().metadata;
    // const result = await this.getRepository().findOne({ where: id });
    const queryBuilder = this.getRepository().createQueryBuilder();

    if (this.requireConversionEntidad()) {
      // Logger.debug('columna decimal con precision=16 y scale=0 ENCONTRADA.');
      Object.keys(metadata.propertiesMap).forEach((key: string, idx) => {
        if (idx === 0) {
          // key === 'fnnumeroapertura' || key === 'fnsujeto' || key === 'fncliente'
          this.requireConversionColumna(metadata.columns[idx])
            ? queryBuilder.select(`Cast(${key} as bigint)`, key)
            : queryBuilder.select(`${key}`, `${key}`);
        } else {
          // key === 'fnnumeroapertura' || key === 'fnsujeto' || key === 'fncliente'
          this.requireConversionColumna(metadata.columns[idx])
            ? queryBuilder.addSelect(`Cast(${key} as bigint)`, key)
            : queryBuilder.addSelect(`${key}`, `${key}`);
        }
        // Logger.debug(
        //   `data type: ${metadata.columns[idx].type} data precision: ${metadata.columns[idx].precision} data scale: ${metadata.columns[idx].scale}`,
        // );
      });
    }
    const primaryKeys = this.getRepository().metadata.primaryColumns.map(
      (column) => column.propertyName,
    );
    if (typeof id !== 'object') {
      id = JSON.parse(`{"${primaryKeys[0]}":"${id}"}`);
    }
    const result = (await queryBuilder.where(id).getRawOne()) as T | null;
    //generar clase de salida
    return new Wrapper<K>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      // result ? this.entityToModel(result) : null,
      result ? this.rawToModel(result) : null,
      true,
      RepositoryMessages.GetSuccess,
      null,
    );
  }
  //NUEVO CON CORRECCIONES PARA DATOS DECIMALES MAYORES A 16 DIGITOS CON SCALE=0
  public async findAll(queryParams: QueryParams): Promise<Wrapper<K[]>> {
    if (!queryParams) {
      throw new Error('queryParams is null');
    }
    const metadata = this.getRepository().metadata;
    const queryBuilder = this.getRepository().createQueryBuilder();
    if (this.requireConversionEntidad()) {
      // Logger.debug('columna decimal con precision=16 y scale=0 ENCONTRADA.');
      Object.keys(metadata.propertiesMap).forEach((key: string, idx) => {
        if (idx === 0) {
          // key === 'fnnumeroapertura' || key === 'fnsujeto' || key === 'fncliente'
          this.requireConversionColumna(metadata.columns[idx])
            ? queryBuilder.select(`Cast(${key} as bigint)`, key)
            : queryBuilder.select(`${key}`, `${key}`);
        } else {
          // key === 'fnnumeroapertura' || key === 'fnsujeto' || key === 'fncliente'
          this.requireConversionColumna(metadata.columns[idx])
            ? queryBuilder.addSelect(`Cast(${key} as bigint)`, key)
            : queryBuilder.addSelect(`${key}`, `${key}`);
        }
      });
    }

    const skip = (queryParams.page - 1) * queryParams.take;
    // Logger.debug(queryParams.orderColumn);
    //ORDENAR SOLO SI VIENE EL DATO DE ORDENAMIENTO
    if (queryParams.orderColumn && queryParams.orderColumn !== 'undefined') {
      const ids = queryParams.orderColumn
        ? [queryParams.orderColumn]
        : this.getRepository().metadata.primaryColumns.map(
            (column) => column.propertyName,
          );
      //iterar por cada una de las propiedades de ordenamiento
      ids.forEach((id, idx) =>
        idx == 0
          ? queryBuilder.orderBy(id, queryParams.order)
          : queryBuilder.addOrderBy(id, queryParams.order),
      );
    }
    //iterar por cada una de las propiedades de busqueda
    if (queryParams.filters) {
      queryParams.filters.forEach((filter, idx) => {
        let newFilter: Filter;
        if (filter instanceof Filter) {
          newFilter = filter;
        } else {
          // Logger.debug('Base Repository:findAll filters JSON...');
          newFilter = JSON.parse((filter as string).toString());
        }
        const selectString = this.filterToSelect(
          newFilter,
          metadata.columns.some(
            (column) =>
              (column.type === 'date' || column.type === 'datetime') &&
              column.propertyName === newFilter.property,
          ),
          // metadata.columns[newFilter.property].propertyType === 'date',
        );
        // Logger.debug(selectString);
        idx == 0
          ? queryBuilder.where(selectString)
          : queryBuilder.andWhere(selectString);
      });
    }
    //paginar
    queryBuilder.skip(skip).take(queryParams.take);
    // Logger.debug('findAll:getCount init...');
    const itemsCount = await queryBuilder.getCount();
    const { raw, entities } = await queryBuilder.getRawAndEntities();
    // entities = entities.length == 0 ? (raw as K[]) : entities;
    //generar clase de salida
    return new Wrapper<K[]>(
      queryParams,
      itemsCount,
      this.requireConversionEntidad()
        ? (raw as K[])
        : // this.rawToModels(raw)
          this.entitiesToModels(entities),
      true,
      RepositoryMessages.GetSuccess,
      null,
    );
    // return wrapper;
  }
  rawToModels(rawInfo: any[]): K[] {
    return rawInfo.map((rawObject) => this.rawToModel(rawObject));
  }
  rawToModel(rawObject: any): K {
    // return
    if (rawObject) {
      // Object.keys(rawObject).forEach(function (key, value: number) {
      Object.keys(rawObject).forEach(function (key) {
        rawObject[key] =
          rawObject[key] instanceof Date
            ? FechaUtiles.toDate(FechaUtiles.getUTCDateBDFormat(rawObject[key]))
            : rawObject[key];
      });
    }
    return rawObject as K;
  }
  //RAWTOMODEL ES UNA POSIBLE SOLUCION PARA POSTGRES Y ALGUN ERROR QUE DABA
  // rawToModel(rawObject: any): K {
  //   // return
  //   let model = {};
  //   let metadata = this.getRepository().metadata;
  //   if (rawObject) {
  //     Object.keys(rawObject).forEach(function (key, value: number) {
  //       //
  //       let newPropertyName = key.replace(`${metadata.name}_`, '');
  //       model[newPropertyName] =
  //         rawObject[key] instanceof Date
  //           ? FechaUtiles.toDate(FechaUtiles.getUTCDateBDFormat(rawObject[key]))
  //           : rawObject[key];
  //     });
  //   }
  //   // return rawObject as K;
  //   return model as K;
  // }
  public async remove(id: string | any): Promise<Wrapper<K>> {
    if (!id) {
      throw new Error('Id is null');
    }

    const result = await this.getRepository().delete(id);
    return Promise.resolve(
      // generar clase de salida
      new Wrapper<K>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        result,
        true,
        RepositoryMessages.DeleteSuccess,
        null,
      ),
    );
  }
  //NUEVO CON CORRECCIONES PARA DATOS DECIMALES MAYORES A 16 DIGITOS CON SCALE=0
  public async update(id: any, data: T | any): Promise<Wrapper<K>> {
    if (!id) {
      throw new Error('Id is null');
    }

    if (!data) {
      throw new Error('Data is null');
    }
    const queryString: string = this.generarUpdateQueryString(data, id);
    //hacer el update
    await this.getRepository().query(queryString);

    // Logger.debug(queryString);
    return id
      ? this.findOneById(id)
      : new Wrapper<K>(
          new QueryParams(Order.DESC, 1, 1),
          1,
          null,
          true,
          RepositoryMessages.GetSuccess,
          null,
        );
  }

  public async updateArray(data: T | T[] | any): Promise<Wrapper<K>> {
    if (!data) {
      throw new Error('Data is null');
    }
    // Logger.debug(data);
    const arrayData = Array.isArray(data) ? data : [data];
    //hacer sqlquery masivo
    let queryString = '';
    arrayData.forEach((data, index) => {
      queryString = queryString.concat(
        (index == 0 ? '' : '\n') + this.generarUpdateQueryString(data),
      );
    });

    // Logger.debug(queryString);
    //hacer el update
    await this.getRepository().query(queryString);
    return new Wrapper<K>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      null,
      true,
      RepositoryMessages.GetSuccess,
      null,
    );
  }

  //metodo para regresar el simbolo comparador los where de las consultas
  protected filterToSelect(filter: Filter, isDate = false): string {
    // let newFilter: Filter = JSON.parse(filter.toString());
    const newFilter: Filter = filter;
    let compare = '=';
    let betweenSymbol = `'`;
    // let value: string = filter.value;
    let value: string = isDate
      ? `${this.convertDateToDatetime(new Date(filter.value))}`
      : filter.value;
    // Logger.debug(comparerStr);
    switch (newFilter.comparison) {
      case Comparison.LIKE:
        compare = 'like';
        betweenSymbol = `'%`;
        break;
      case Comparison.IN:
        compare = 'in';
        value = `(${value})`;
        betweenSymbol = '';
        break;
      case Comparison.LESS_THAN:
        compare = '<';
        break;
      case Comparison.LESS_EQUAL_THAN:
        compare = '<=';
        break;
      case Comparison.MORE_THAN:
        compare = '>';
        break;
      case Comparison.MORE_EQUAL_THAN:
        compare = '>=';
        break;
      case Comparison.NOT:
        compare = '<>';
        break;

      default:
        break;
    }

    return `${
      newFilter.property
    } ${compare} ${betweenSymbol}${value}${betweenSymbol
      .split('')
      .reverse()
      .join('')}`;
  }
  //metodos de ayuda para conversion y validacion de datos para guardar
  //una entidad requiere conversion cuando
  protected requireConversionEntidad(): boolean {
    const metadata = this.getRepository().metadata;
    return metadata.columns.some(
      (column) =>
        column.type === 'decimal' &&
        column.precision &&
        column.precision > 16 &&
        column.scale == 0,
    );
    //   ) {
  }
  //convierte //una entidad requiere conversion cuando
  protected requireConversionColumna(column: ColumnMetadata): boolean {
    //si el dato es decimal y su presiocion es mayor a 16 y su escala es 0
    return column.type === 'decimal'
      ? Number(column.precision) > 16 && column.scale == 0
      : false;
    //   ) {
  }
  //convierte una fecha que viene del front a fecha para guardar
  protected convertDateToDatetime(date: any): any {
    if (!date) return null;

    const dateString = `${FechaUtiles.getUTCDateBDFormat(date)}`;

    return dateString;
  }

  protected padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  protected formatDate(date) {
    const newDate = new Date(date);
    return (
      [
        newDate.getFullYear(),
        this.padTo2Digits(newDate.getMonth() + 1),
        this.padTo2Digits(newDate.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(newDate.getHours()),
        this.padTo2Digits(newDate.getMinutes()),
        this.padTo2Digits(newDate.getSeconds()),
      ].join(':')
    );
  }

  protected generarUpdateQueryString(data: T, id = null): string {
    if (!data) {
      throw new Error('Data is null');
    }
    //Si llega hasta aca significa que requiere conversion por datos largos
    //obtener metadatos de la entidad
    const metadata = this.getRepository().metadata;
    const columns = metadata.columns.map((column) => {
      return { propertyName: column.propertyName, propertyType: column.type };
    });

    //variable para guardar el query
    let queryString = `UPDATE ${metadata.tableName} SET `;
    // let isNoFirstColumn = false;
    // columns.forEach((column: any, idx: number) => {
    columns.forEach((column: any) => {
      //agregar el set de la columna solo si existe
      if (data[column.propertyName]) {
        if (column.propertyName === 'fntasapenal') {
          Logger.debug(column.propertyName, data[column.propertyName]);
        }
        queryString = queryString.concat(
          `${
            queryString.indexOf('SET ', queryString.length - 'SET '.length) !==
            -1
              ? ''
              : ','
          } ${column.propertyName}=${
            data[column.propertyName] === null ||
            data[column.propertyName] === undefined ||
            data[column.propertyName] === 'null'
              ? null
              : column.propertyType === 'date' ||
                column.propertyType === 'datetime'
              ? "'" +
                this.convertDateToDatetime(data[column.propertyName]) +
                "'"
              : "'" + data[column.propertyName] + "'"
          }`,
        );
      }
    });
    const primaryKeys = this.getRepository().metadata.primaryColumns.map(
      (column) => column.propertyName,
    );
    queryString = queryString.concat(` WHERE `);
    primaryKeys.forEach((pkey: string, idx: number) => {
      // );
      if (id) {
        //tirar error si el numero de propiedades es diferente a las llaves
        if (Object.keys(id).length < primaryKeys.length) {
          throw new Error('Id is incomplete');
        }
        queryString = queryString.concat(
          `${idx == 0 ? '' : ' AND '} ${pkey}=${
            id[pkey] === null || id[pkey] === undefined || id[pkey] === 'null'
              ? null
              : metadata.columns.some(
                  (column) =>
                    (column.type === 'date' || column.type === 'datetime') &&
                    column.propertyName === pkey,
                )
              ? "'" + this.convertDateToDatetime(id[pkey]) + "'"
              : "'" + id[pkey] + "'"
          }`,
        );
      } else {
        queryString = queryString.concat(
          `${idx == 0 ? '' : ' AND '} ${pkey}=${
            data[pkey] === null ||
            data[pkey] === undefined ||
            data[pkey] === 'null'
              ? null
              : metadata.columns.some(
                  (column) =>
                    (column.type === 'date' || column.type === 'datetime') &&
                    column.propertyName === pkey,
                ) //metadata.columns[pkey] === 'date'
              ? "'" + this.convertDateToDatetime(data[pkey]) + "'"
              : "'" + data[pkey] + "'"
          }`,
        );
      }
    });
    //finalizar con ;
    queryString = queryString.concat(';');
    return queryString;
  }
}
