import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { InstrumentosEntity } from '../entities/mssql-db-siaraf/Instrumentos.entity';

@Injectable()
export class PostgresDbSiarafConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_SIARAF_HOST,
      port: parseInt(process.env.POSTGRES_SIARAF_PORT),
      username: process.env.POSTGRES_SIARAF_USER,
      password: process.env.POSTGRES_SIARAF_PASSWORD,
      database: process.env.POSTGRES_SIARAF_DATABASE,
      // entities: [`${process.env.MODE === 'DEV' ? 'src' : 'dist'}/commons/entities/*db-siaraf/*.entity{.ts,.js}`],
      entities: [InstrumentosEntity],
      // synchronize: !!process.env.DB_SYNC,
      synchronize: false,
    };
  }
}
