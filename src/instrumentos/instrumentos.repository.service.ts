import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepositoryService } from 'src/commons/services/base-repository.service';

import { InjectRepository } from '@nestjs/typeorm';
import { InstrumentosEntity } from '../commons/entities/mssql-db-siaraf/Instrumentos.entity';
// import { InstrumentosEntity } from '../commons/entities/postgres-db-siaraf/Instrumentos.entity';

@Injectable()
export class InstrumentosRepositoryService extends BaseRepositoryService<
  InstrumentosEntity,
  InstrumentosEntity
> {
  constructor(
    // @InjectRepository(InstrumentosEntity, ConnectionNames.DB_SIARAF) //se agrega como parametro el nombre de la conexion de la bd donde se encuentra la tabla de la entidad
    @InjectRepository(
      InstrumentosEntity,
      'default',
      // process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL
      //   ? ConnectionNames.MSSQL_DB_SIARAF
      //   : ConnectionNames.DB_SIARAF,
    )
    private instrumentosRepository: Repository<InstrumentosEntity>,
  ) {
    super();
  }
  getRepository(): Repository<InstrumentosEntity> {
    // return getRepository(
    //   InstrumentosEntity,
    // process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL
    //   ? ConnectionNames.MSSQL_DB_SIARAF
    //   : ConnectionNames.DB_SIARAF,
    // );
    return this.instrumentosRepository;
  }
  async save(data: InstrumentosEntity | InstrumentosEntity[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    await this.getRepository().save(models);
  }

  async findById(id: any): Promise<InstrumentosEntity | null> {
    const entity = await this.getRepository().findOne(id);
    return entity ?? null;
  }
  async findByEncomienda(fnencomienda: number): Promise<InstrumentosEntity[]> {
    return this.getRepository().findBy({ fnencomienda });
  }

  public modelToEntity(model: InstrumentosEntity): InstrumentosEntity {
    return model;
  }
  public entityToModel(entity: InstrumentosEntity): InstrumentosEntity {
    return entity;
  }
  async deleteByEncomienda(fnencomienda: number): Promise<void> {
    await this.getRepository().delete({ fnencomienda });
  }
}
