import { QueryParams } from '../dtos/query-params';
import { Wrapper } from '../dtos/wrapper';
import { PageInfo } from '../dtos/page-info';
import { Repository } from 'typeorm';

export interface BaseRepository<T, K> {
  // modelToEntity(model: K): T;
  // entityToModel(entity: T): K;
  getRepository(): Repository<T>;
  modelToEntity(model: K): T;
  entityToModel(entity: T): K;
  entitiesToModels(entities: T[]): K[];
  modelsToEntities(models: K[]): T[];

  count(queryParams: QueryParams): Promise<PageInfo>;

  create(data: K | any): Promise<Wrapper<K>>;
  //este metodo abarca el create y el update, basicamente, si la entidad no existe la crea y si existe la actualiza
  // saveOrUpdate(data: K | any): Promise<Wrapper<K>>;
  update(id: string | any, data: K | any): Promise<Wrapper<K>>;
  // delete(id: number): Promise<void>;
  findOneById(id: string | any): Promise<Wrapper<K>>;
  findAll(queryParams: QueryParams): Promise<Wrapper<K[]>>;
  remove(id: string | any): Promise<Wrapper<K>>;
  updateArray(data: T | T[] | any): Promise<Wrapper<K>>;
}
