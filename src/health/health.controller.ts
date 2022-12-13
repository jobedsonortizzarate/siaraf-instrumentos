import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    @InjectConnection()
    private connection: Connection,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      //CHECAR LAS DEPENDENCIAS DE MICROSERVICIOS
      //CATALOGOS
      () =>
        this.http.pingCheck(
          'catalogos-microservice',
          process.env.CATALOGOS_HOST || 'http://catalogosms:4000/api-cat/v1',
        ),
      //BITACORAS
      //   () =>
      //     this.http.pingCheck(
      //       'bitacoras-microservice',
      //       process.env.BITACORA_HOST || 'http://bitacorasms:5010/api-bit/v1',
      //     ),
      //CHECHAR BASE DE DATOS
      () =>
        this.db.pingCheck(
          // process.env.BD_ENGINE_SIARAF === ConnectionEngines.MSSQL,
          // ? ConnectionNames.MSSQL_DB_SIARAF
          // : ConnectionNames.DB_SIARAF,
          'default',
          { connection: this.connection },
        ),
      //CHECAR DISCO DURO
      //The following example checks the storage used of the path / (or on Windows you can use C:\\). If that exceeds more than 70% of the total storage space it would response with an unhealthy Health Check.
      () =>
        this.disk.checkStorage('storage', {
          path: 'C:\\',
          thresholdPercent: 0.7,
        }),
      //CHECAR MEMORIA
      //This example would return an unhealthy response code in case your process does have more than 150MB allocated.
      () => this.memory.checkHeap('memory_heap', 250 * 1024 * 1024),
      //This example would return an unhealthy response code in case your process does have more than 150MB allocated.
      //   () => this.memory.checkRSS('memory_rss', 250 * 1024 * 1024),
    ]);
  }
}
