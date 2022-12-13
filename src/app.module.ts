import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresDbSiarafConfigService } from './commons/services/postgres-bd-siaraf-config.service';
import { ConnectionEngines } from './commons/constants';
import { MssqlDbSiarafConfigService } from './commons/services/ms-sql-bd-siaraf-config.service';
import { InstrumentosModule } from './instrumentos/instrumentos.module';
import { HealthModule } from './health/health.module';
import { ProxyModule } from './commons/proxy/proxy.module';
import { ClientProxyIndep } from './commons/proxy/client-proxy';

@Module({
  imports: [
    ProxyModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    //CONFIG PARA PODER IMPLEMENTAR MULTIPLES BDS,
    //CONFIG DE MSSQL
    TypeOrmModule.forRootAsync({
      // name:
      //   process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL
      //     ? ConnectionNames.MSSQL_DB_SIARAF
      //     : ConnectionNames.DB_SIARAF,
      useClass:
        process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL
          ? MssqlDbSiarafConfigService
          : PostgresDbSiarafConfigService,
      inject: [
        process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL
          ? MssqlDbSiarafConfigService
          : PostgresDbSiarafConfigService,
      ],
    }),
    //POSTGRES
    // TypeOrmModule.forRootAsync({
    //   name: ConnectionNames.DB_SIARAF,
    //   useClass: PostgresDBSIARAFConfigService,
    //   inject: [PostgresDBSIARAFConfigService],
    // }),
    //modulos incluir
    InstrumentosModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    ClientProxyIndep,
    AppService,
    process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL
      ? MssqlDbSiarafConfigService
      : PostgresDbSiarafConfigService,
  ],
  exports: [ConfigModule, TypeOrmModule, ProxyModule],
})
export class AppModule {}
