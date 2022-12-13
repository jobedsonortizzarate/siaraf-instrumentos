import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comparison, Order } from '../constants';
import { Filter } from '../dtos/filter';
import { QueryParams } from '../dtos/query-params';
import { Wrapper } from '../dtos/wrapper';
import { CRUDMessages } from '../messages.enum';

export abstract class BaseService<T> {
  abstract getRepository(): Repository<T>;

  public async error(msg: string, indexError: number): Promise<Wrapper<T>> {
    const wrapper = new Wrapper<T>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      { hasError: indexError } as any,
      false,
      msg,
      null,
    );
    return wrapper;
  }

  public async create(data: T | any): Promise<Wrapper<T>> {
    const result = await this.getRepository().save(data);
    Logger.debug(data);
    //generar clase de salida
    const wrapper = new Wrapper<T>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      result,
      true,
      CRUDMessages.CreateSuccess,
      null,
    );
    return wrapper;
  }
  //comentario
  public async update(id: string | any, data: T | any): Promise<Wrapper<T>> {
    Logger.debug(id);
    await this.getRepository().update(id, data);
    const result = await this.getRepository().findOneById(id);
    //generar clase de salida

    Logger.debug(result);
    const wrapper = new Wrapper<T>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      result,
      true,
      CRUDMessages.UpdateSuccess,
      null,
    );
    Logger.debug(`Dato guardado con resultado: ${wrapper}`);
    return wrapper;
  }

  public async save(data: T | any): Promise<Wrapper<T>> {
    const result = await this.getRepository().save(data);
    const wrapper = new Wrapper<T>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      result,
      true,
      CRUDMessages.CreateSuccess,
      null,
    );
    return wrapper;
  }

  public async findOneById(id: string | any): Promise<Wrapper<T>> {
    const result = await this.getRepository().findOneById(id);
    //generar clase de salida
    const wrapper = new Wrapper<T>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      result,
      true,
      CRUDMessages.GetSuccess,
      null,
    );
    return wrapper;
  }

  public async findOneByEncomiendaId(
    fnencomienda: number | any,
  ): Promise<Wrapper<T>> {
    const result = await this.getRepository().findOneBy(fnencomienda);
    //generar clase de salida
    const wrapper = new Wrapper<T>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      result,
      true,
      CRUDMessages.GetSuccess,
      null,
    );
    return wrapper;
  }

  public async findAll(queryParams: QueryParams): Promise<Wrapper<T>> {
    const queryBuilder = this.getRepository().createQueryBuilder('table');
    const skip = (queryParams.page - 1) * queryParams.take;
    Logger.debug(queryParams.orderColumn);
    const ids = queryParams.orderColumn
      ? [queryParams.orderColumn]
      : this.getRepository().metadata.primaryColumns.map(
          (column) => column.propertyName,
        );
    //iterar por cada una de las propiedades de ordenamiento
    ids.forEach((id) => queryBuilder.addOrderBy(id, queryParams.order));
    //iterar por cada una de las propiedades de busqueda
    // Logger.debug(queryParams.filters);
    if (queryParams.filters) {
      queryParams.filters.forEach((filter) => {
        let newFilter: Filter;
        Logger.debug('intancia de filter', filter instanceof Filter);
        // if (filter instanceof Filter) {
        //   newFilter = filter;
        // } else {
        //   Logger.debug(
        //     'Base Repository:findAll filters JSON...: ',
        //     JSON.stringify(filter),
        //   );

        if (typeof filter === 'string') {
          Logger.debug(
            'Base Repository:findAll filters JSON...: ',
            JSON.stringify(filter),
          );
          newFilter = JSON.parse((filter as string).toString());
        } else {
          newFilter = filter;
        }
        const selectString = this.filterToSelect(
          new Filter(
            newFilter.property,
            newFilter.comparison,
            newFilter.value,
            newFilter.rawValue,
          ),
        );
        Logger.debug(selectString);
        queryBuilder.where(selectString);
      });
    }

    //paginar
    queryBuilder.skip(skip).take(queryParams.take);
    const itemsCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    //generar clase de salida
    const wrapper = new Wrapper<T>(
      queryParams,
      itemsCount,
      entities,
      true,
      CRUDMessages.GetSuccess,
      null,
    );
    return wrapper;
  }

  public async remove(id: string | any): Promise<Wrapper<T>> {
    const result = await this.getRepository().delete(id);
    //generar clase de salida
    const wrapper = new Wrapper<T>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      result,
      true,
      CRUDMessages.DeleteSuccess,
      null,
    );
    return wrapper;
  }
  //metodo para regresar el simbolo comparador los where de las consultas
  protected filterToSelect(filter: Filter): string {
    const newFilter: Filter = filter; //JSON.parse(filter.toString());
    let compare = '=';
    let betweenSymbol = `'`;
    // Logger.debug(comparerStr);
    switch (newFilter.comparison) {
      case Comparison.LIKE:
        compare = 'like';
        betweenSymbol = `'%`;
        break;
      case Comparison.IN:
        compare = 'in';
        newFilter.value = `(${newFilter.value})`;
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
    // Logger.debug(newFilter.comparison);
    // Logger.debug(compare);
    // Logger.debug(betweenSymbol);

    return `${newFilter.property} ${compare} ${betweenSymbol}${
      newFilter.value
    }${betweenSymbol.split('').reverse().join('')}`;
  }
  protected getComparer(comparerStr: string): string {
    let compare = '=';
    // Logger.debug(comparerStr);
    switch (comparerStr) {
      case Comparison.LIKE:
        compare = 'like';
        break;
      case Comparison.IN:
        compare = '= ANY';
        break;
      case Comparison.LESS_THAN:
        compare = '<';
        break;
      case Comparison.MORE_THAN:
        compare = '>';
        break;
      case Comparison.NOT:
        compare = '<>';
        break;

      default:
        compare = '=';
        break;
    }
    return compare;
  }
}
