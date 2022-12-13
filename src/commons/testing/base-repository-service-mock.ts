import { DeleteResult, Repository } from 'typeorm';
import { Comparison, Order } from '../constants';
import { BaseRepository } from '../domain/base-repository';

import { PageInfo } from '../dtos/page-info';
import { QueryParams } from '../dtos/query-params';
import { Wrapper } from '../dtos/wrapper';
import { RepositoryMessages } from '../services/base-repository.messagess';

export abstract class BaseRepositoryMock<T, K> implements BaseRepository<T, K> {
  updateArray(data: any): Promise<Wrapper<K>> {
    // this._auxInstance = data;
    if (!data) {
      throw new Error('Data is null');
    }

    return Promise.resolve(
      new Wrapper<K>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        data ? this.entityToModel(data) : null,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }
  protected entities: T[] = [];

  public getRepository(): Repository<T> {
    return undefined as any; // Dummy
  }

  public abstract resetData(): void;
  public abstract modelToEntity(model: K): T;
  public abstract entityToModel(entity: T): K;

  public entitiesToModels(entities: T[]): K[] {
    return entities.map((model) => this.entityToModel(model));
  }

  public modelsToEntities(models: K[]): T[] {
    return models.map((model) => this.modelToEntity(model));
  }

  public getData(): T[] {
    return this.entities;
  }

  public setData(data: T[]): void {
    this.entities = [...data];
  }

  public async count(queryParams: QueryParams): Promise<PageInfo> {
    if (!queryParams) {
      throw new Error('queryParams is null');
    }

    const resWrapper = await this.findAll(queryParams);
    const res = Array.isArray(resWrapper.result)
      ? resWrapper.result
      : [resWrapper.result];
    const totalItems = res.length;
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

  public async create(data: T | any): Promise<Wrapper<K>> {
    // this._auxInstance = data;
    if (!data) {
      throw new Error('Data is null');
    }

    this.getData().push(data);

    return Promise.resolve(
      new Wrapper<K>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        data ? this.entityToModel(data) : null,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  // public async saveOrUpdate(data: T | any): Promise<Wrapper<K>> {
  //   // this._auxInstance = data;
  //   if (!data) {
  //     throw new Error('Data is null');
  //   }

  //   return Promise.resolve(
  //     new Wrapper<K>(
  //       new QueryParams(Order.DESC, 1, 1),
  //       1,
  //       data ? this.entityToModel(data) : null,
  //       true,
  //       RepositoryMessages.CreateSuccess,
  //       null,
  //     )
  //   );
  // }

  // TODO En las clases hijos poner la validacion de la llave simple o compuesta
  protected abstract isEquals(ent1: T, ent2: T): boolean;

  public async findOneById(id: string | any): Promise<Wrapper<K>> {
    if (!id) {
      throw new Error('Id is null');
    }

    if (id < 0 || id > this.getData().length) {
      throw new Error(`Id '${id}' is invalid.`);
    }

    // Hack para recuperar el id compuesto
    const val = this.getData().find((e) => {
      //
      return this.isEquals(id, e);
    });
    // 

    return Promise.resolve(
      new Wrapper<K>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        val ? this.entityToModel(val) : null,
        true,
        RepositoryMessages.GetSuccess,
        null,
      ),
    );
  }

  public async findAll(queryParams: QueryParams): Promise<Wrapper<K[]>> {
    if (!queryParams) {
      throw new Error('queryParams is null');
    }

    let data = this.getData();
    if (queryParams.filters) {
      // Hack para recuperar los registros por filtros
      // Logger.debug('find All by Filter: ', queryParams.filters);
      // Logger.debug('find All this.entities: ', this.entities);
      data = this.entities.filter((e) => {
        let res = true;
        queryParams.filters?.forEach((f) => {
          // Logger.debug('FV1: ', res);
          // Logger.debug('>> Compare: F:', f, ', ['+e[f.property]+']');
          if (f.comparison === Comparison.EQUAL) {
            if (f.rawValue) {
              // Logger.debug('F:', f, ', eq ['+e[f.property]+']: ', (f.rawValue === e[f.property]));
              res =
                res &&
                JSON.stringify(e[f.property]) === JSON.stringify(f.rawValue);
            } else {
              res = res && e[f.property] === Number(f.value);
            }
          } else if (f.comparison === Comparison.NOT) {
            //Logger.debug('entre al if dle not')
            if (f.rawValue) {
              res =
                res &&
                JSON.stringify(e[f.property]) !== JSON.stringify(f.rawValue);
            } else {
              res = res && e[f.property] !== Number(f.value);
            }
          } else if (f.comparison <= Comparison.LESS_EQUAL_THAN) {
            if (f.rawValue) {
              // Logger.debug('>> Compare: F:', f, ', V['+e[f.property]+'] <= F[', f.value, ']: ', (e[f.property] <= f.rawValue));
              res = res && e[f.property] <= f.rawValue;
            } else {
              res = res && e[f.property] <= Number(f.value);
            }
          } else if (f.comparison < Comparison.LESS_THAN) {
            if (f.rawValue) {
              res = res && e[f.property] < f.rawValue;
            } else {
              res = res && e[f.property] < Number(f.value);
            }
          } else if (f.comparison >= Comparison.MORE_EQUAL_THAN) {
            if (f.rawValue) {
              // Logger.debug('>> Compare: F:', f, ', V['+e[f.property]+'] >= F[', f.value, ']: ', (e[f.property] >= f.rawValue));
              res = res && e[f.property] >= f.rawValue;
            } else {
              res = res && e[f.property] >= Number(f.value);
            }
          } else if (f.comparison > Comparison.MORE_THAN) {
            if (f.rawValue) {
              res = res && e[f.property] > f.rawValue;
            } else {
              res = res && e[f.property] > Number(f.value);
            }
          } else {
            throw new Error(`Invalid Filter ${f.comparison}`);
          }
          // Logger.debug('FV2: ', res);
        });
        // Logger.debug('Found[',res, ']:', e);
        return res;
      });
      data = Array.isArray(data) ? data : [data];
      // Logger.debug('New data: ', data);
    }

    return Promise.resolve(
      new Wrapper<K[]>(
        new QueryParams(Order.DESC, 1, data?.length),
        1,
        this.entitiesToModels(data),
        true,
        RepositoryMessages.UpdateSuccess,
        null,
      ),
    );
  }

  public async remove(id: string | any): Promise<Wrapper<K>> {
    if (!id) {
      throw new Error('Id is null');
    }

    const res: DeleteResult = { raw: id, affected: 1 };
    return Promise.resolve(
      new Wrapper<K>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        res,
        true,
        RepositoryMessages.DeleteSuccess,
        null,
      ),
    );
  }

  public async update(id: string | any, data: T | any): Promise<Wrapper<K>> {
    if (!id) {
      throw new Error('Id is null');
    }

    if (!data) {
      throw new Error('Data is null');
    }

    if (id < 0 || id > this.getData().length) {
      throw new Error(`Id '${id}' is invalid.`);
    }

    let newData: T = this.modelToEntity(data);

    for (let i = 0; i < this.entities.length; ++i) {
      if (this.isEquals(id, this.entities[i])) {
        newData = {
          ...this.entities[i],
          ...data,
        };
        this.entities[i] = newData;
        // Logger.debug('Fixed data list['+i+']', id, ', new Data: ', await this.findOneById(id));
      }
    }

    // Logger.debug('New Data updated:', newData);

    return Promise.resolve(
      new Wrapper<K>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        newData ? this.entityToModel(newData) : null,
        true,
        RepositoryMessages.UpdateSuccess,
        null,
      ),
    );
  }
}
