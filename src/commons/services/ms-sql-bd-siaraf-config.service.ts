import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { InstrumentosEntity } from '../entities/mssql-db-siaraf/Instrumentos.entity';

@Injectable()
export class MssqlDbSiarafConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // name: ConnectionNames.MSSQL_DB_SIARAF,
      // type: 'mssql',
      // host: 'localhost',
      // port: 1433,
      // username: 'desarrollo',
      // password: '5m4c0d3v5',
      // database: ConnectionNames.MSSQL_DB_SIARAF,
      // synchronize: false,

      type: 'mssql',
      host: process.env.MSSQL_SIARAF_HOST,
      port: parseInt(process.env.MSSQL_SIARAF_PORT || '1433', 10),
      username: process.env.MSSQL_SIARAF_USER,
      password: process.env.MSSQL_SIARAF_PASSWORD,
      database: process.env.MSSQL_SIARAF_DATABASE,
      synchronize: false,
      // entities: [`dist/commons/entities/mssql-db-siaraf/*.entity{.ts,.js}`],
      entities: [InstrumentosEntity],
      options: {
        encrypt: process.env.MSSQL_BD_ENCRYPT?.toLowerCase() === 'true',
        useUTC: process.env.TZ?.toLowerCase() === 'utc',
      },
    };
  }
}
