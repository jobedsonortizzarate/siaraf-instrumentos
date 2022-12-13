import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { InstrumentosService } from './instrumentos.service';
import { InstrumentosController } from './instrumentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentosEntity } from '../commons/entities/mssql-db-siaraf/Instrumentos.entity';
// import { InstrumentosEntity } from '../commons/entities/postgres-db-siaraf/Instrumentos.entity';
import { BitacoraService } from '../bitacora-microservice-connection/bitacora.services';
import { CatalogoService } from '../catalogo-microservice-conecction/application/catalogo.services';
import { HttpModule } from '@nestjs/axios';
import { ProxyModule } from '../commons/proxy/proxy.module';
import { SecurityMiddleware } from './security.middleware';

@Module({
  // imports: [TypeOrmModule.forFeature([Instrumento], ConnectionNames.DB_SIARAF)],
  imports: [
    ProxyModule,
    TypeOrmModule.forFeature([InstrumentosEntity]),
    // TypeOrmModule.forFeature(
    //   [InstrumentosEntity],
    //   process.env.BD_ENGINE_DB_SIARAF === ConnectionEngines.MSSQL
    //     ? ConnectionNames.MSSQL_DB_SIARAF
    //     : ConnectionNames.DB_SIARAF,
    // ),
    HttpModule,
  ],
  controllers: [InstrumentosController],
  providers: [
    InstrumentosService,
    BitacoraService,
    CatalogoService,
  ]
})
export class InstrumentosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes(InstrumentosController);
  }


}

