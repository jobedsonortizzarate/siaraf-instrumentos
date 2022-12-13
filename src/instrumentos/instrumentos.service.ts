import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../commons/services/service.commons';
import { Repository } from 'typeorm';
import { InstrumentosEntity } from '../commons/entities/mssql-db-siaraf/Instrumentos.entity';
// import { InstrumentosEntity } from '../commons/entities/postgres-db-siaraf/Instrumentos.entity';

@Injectable()
export class InstrumentosService extends BaseService<InstrumentosEntity> {
  constructor(
    @InjectRepository(
      InstrumentosEntity,
      'default',
      // process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL
      //   ? ConnectionNames.MSSQL_DB_SIARAF
      //   : ConnectionNames.DB_SIARAF,
    )
    private repository: Repository<InstrumentosEntity>,
  ) {
    super();
  }
  getRepository(): Repository<InstrumentosEntity> {
    return this.repository;
  }
}
