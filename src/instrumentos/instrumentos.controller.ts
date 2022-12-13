import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { InstrumentosService } from './instrumentos.service';
import { ApiTags } from '@nestjs/swagger';
import { Wrapper } from '../commons/dtos/wrapper';
import { QueryParams } from '../commons/dtos/query-params';
import { InstrumentosEntity } from '../commons/entities/mssql-db-siaraf/Instrumentos.entity';
// import { InstrumentosEntity } from '../commons/entities/postgres-db-siaraf/Instrumentos.entity';
import { BitacoraService } from '../bitacora-microservice-connection/bitacora.services';
import { CatalogoService } from '../catalogo-microservice-conecction/application/catalogo.services';
import { Comparison, Order } from '../commons/constants';
import { CRUDMessages } from '../commons/messages.enum';
import { Filter } from '../commons/dtos/filter';

@ApiTags('instrumentos')
@Controller('instrumentos')
export class InstrumentosController {
  constructor(
    private readonly instrumentosService: InstrumentosService,
    private readonly bitacoraService: BitacoraService,
    private readonly catalogoService: CatalogoService,
  ) { }

  @Post()
  async create(
    @Body() dto: InstrumentosEntity,
  ): Promise<Wrapper<InstrumentosEntity>> {
    try {

      {

        let filtros = [
          new Filter('fnencomienda',
            Comparison.EQUAL,
            dto.fnencomienda.toString(),
            dto.fnencomienda)
        ];

        let pack = await this.instrumentosService.findAll(
          new QueryParams(Order.DESC, 1, 1, filtros, 'fninstrumento')
        )
        let resultInstrumento = pack.result as any[];
        if (resultInstrumento.length > 0) {
          let newFninstrumento = (pack.result as any[])[0].fninstrumento += 1;
          dto.fninstrumento = newFninstrumento;
        } else {
          dto.fninstrumento = 1;
        }
      }


      //Decimal
      let decimales = [
        "fnmontomaximo",
        "fnvaloroperador1",
        "fnvaloroperador2",
        "fnvaloroptasamor",
        "fncomisionesvalor1",
        "fncomisionesvalor2",
        "fncomisionesvalor3",
        "fncomisionesvalor4",
        "fncomisionesvalor5",
        "fncobrominimocom1",
        "fncobrominimocom2",
        "fncobrominimocom3",
        "fncobrominimocom4",
        "fncobrominimocom5",
        "fnpropdedescuento",
        "fnmargenintermed1",
        "fnmargenintermed2",
        "fnvalorcomisfte1",
        "fnvalorcomisfte2",
        "fnvalorcomisfte3",
        "fnvalorcomisfte4",
        "fnvalorcomisfte5",
        "fnfronteramaxima",
        "fnfronteraminima"
      ]

      for (const key in dto) {
        if (Object.prototype.hasOwnProperty.call(dto, key)) {
          const elementValue = dto[key];
          if (elementValue) {
            for (let index = 0; index < decimales.length; index++) {
              const elementDecimales = decimales[index];
              if (key === elementDecimales
                && elementValue.length > 0
                && !isNaN(elementValue)
                && elementValue.indexOf('.') === -1
              ) {
                dto[key] += '.0';
                break;
              }
            }
          }
        }
      }

      // return this.instrumentosService.create(dto);
      const wrapperObj = await this.instrumentosService.create(dto);
      if (wrapperObj.success)
        this.bitacoraService.saveBitacora(
          dto.fnencomienda,
          CRUDMessages.CreateSuccess,
          InstrumentosController.name,
        );
      else
        this.bitacoraService.saveBitacora(
          dto.fnencomienda,
          CRUDMessages.CreateError,
          InstrumentosController.name,
        );
      return wrapperObj;
    } catch (err) {
      const msg = `al crear: ${err.message}`;
      if (dto && dto.fnencomienda) {
        try {
          this.bitacoraService.saveBitacora(
            dto.fnencomienda,
            msg,
            'InstrumentosController',
          );
        } catch (err) {
          Logger.error(err);
        }
      } else {
        try {
          this.bitacoraService.saveBitacora(-1, msg, 'InstrumentosController');
        } catch (err) {
          Logger.error(err);
        }
      }
      return this.instrumentosService.error(msg, -1);
    }
  }

  @Get()
  async findAll(@Query() queryParams: QueryParams): Promise<Wrapper<any>> {
    try {
      let pack: any;
      let encomiendas: any;
      let filterSelected: Filter;

      if (queryParams.filters) {
        queryParams.filters = queryParams.filters.map(elementA => {
          if (typeof elementA === 'string') {
            const filter = JSON.parse(elementA);
            return new Filter(filter.property, filter.comparison, filter.value, filter.rawValue);
          } else return elementA;
        });
        filterSelected = queryParams.filters.find(elementA => elementA.property === 'nombreEncomienda');
      }

      if (filterSelected) {
        {
          filterSelected.property = 'fcnombre';
          let temp: Filter[] = [];
          queryParams.filters.forEach(elementA => { if (elementA.property !== 'fcnombre') temp.push(elementA); });
          queryParams.filters = temp;
        }

        let preareStatement = [];
        let originalTake = queryParams.take;
        let arrayEncomiendas: any[];

        do {
          preareStatement = [];
          let iterador = 0;
          arrayEncomiendas = (await this.catalogoService.getEncomiendasAll(new QueryParams(Order.ASC, 1, 50, [filterSelected]))).result as any[];
          if (arrayEncomiendas.length !== 0) {
            pack = await this.instrumentosService.findAll(queryParams);
            const arrayInstrumentos: any[] = pack.result as any[];
            arrayEncomiendas.forEach((elementA: any) => arrayInstrumentos.forEach((elementB: any) => {
              if (iterador < originalTake && elementA.fnencomienda === elementB.fnencomienda) {
                iterador++;
                preareStatement.push(elementB);
              }
            }));
          } else {
            preareStatement = [];
            break;
          }
          if (preareStatement.length !== originalTake) queryParams.take += 1000;
          if (pack.itemsCount < queryParams.take) break;
        } while (preareStatement.length !== originalTake);

        queryParams.take = originalTake;

        // search = new Promise<Wrapper<PrcCierre>>(() => new Wrapper(queryParams, preareStatement.length, preareStatement, true, '', undefined));
        filterSelected.property = 'fcnombre';

        pack.result = {
          listInstrumentos: preareStatement,
          listEncomiendas: arrayEncomiendas,
        };
      } else {
        queryParams.orderColumn = 'fnencomienda';
        pack = (await this.instrumentosService.findAll(
          queryParams,
        )) as Wrapper<any>;

        encomiendas = (await this.catalogoService.getEncomiendasAll(
          new QueryParams(Order.ASC, 1, 50),
        )) as Wrapper<any>;
        pack.result = {
          listInstrumentos: pack.result,
          listEncomiendas: encomiendas.result,
        };
      }
      return new Promise<any>((resolve) => {
        resolve(pack);
      });
    } catch (err) {
      const msg = `al buscar: ${err.message}`;
      try {
        this.bitacoraService.saveBitacora(
          -1,
          `al buscar: ${err.message}`,
          'InstrumentosController',
        );
      } catch (err) {
        Logger.error(err);
      }
      return this.instrumentosService.error(msg, -2);
    }
  }

  @Get('find/:fnencomienda/:fninstrumento')
  findOneMultiKey(
    @Param('fnencomienda') fnencomienda: number,
    @Param('fninstrumento') fninstrumento: number,
  ): Promise<Wrapper<InstrumentosEntity>> {
    try {
      return this.instrumentosService.findOneById({
        fnencomienda,
        fninstrumento,
      });
    } catch (err) {
      const msg = `al buscar: ${err.message}`;
      try {
        this.bitacoraService.saveBitacora(
          fnencomienda,
          `al buscar: ${err.message}`,
          'InstrumentosController',
        );
      } catch (err) {
        Logger.error(err);
      }
      return this.instrumentosService.error(msg, -3);
    }
  }

  @Patch(':fnencomienda/:fninstrumento')
  async update(
    @Param('fnencomienda') fnencomienda: number,
    @Param('fninstrumento') fninstrumento: number,
    @Body() dto: any,
  ): Promise<Wrapper<InstrumentosEntity>> {
    try {
      const wrapperObj = await this.instrumentosService.update(
        { fnencomienda, fninstrumento },
        dto,
      );
      if (wrapperObj.success)
        this.bitacoraService.saveBitacora(
          fnencomienda,
          CRUDMessages.UpdateSuccess,
          InstrumentosController.name,
        );
      else
        this.bitacoraService.saveBitacora(
          fnencomienda,
          CRUDMessages.UpdateError,
          InstrumentosController.name,
        );
      return wrapperObj;
    } catch (err) {
      const msg = `al buscar: ${err.message}`;
      try {
        this.bitacoraService.saveBitacora(
          fnencomienda,
          `al actualizar: ${err.message}`,
          'InstrumentosController',
        );
      } catch (err) {
        Logger.error(err);
      }
      return this.instrumentosService.error(msg, -4);
    }
  }

  @Delete(':fnencomienda/:fninstrumento')
  async remove(
    @Param('fnencomienda') fnencomienda: number,
    @Param('fninstrumento') fninstrumento: number,
  ): Promise<Wrapper<InstrumentosEntity>> {
    try {
      const wrapperObj = await this.instrumentosService.remove({
        fnencomienda,
        fninstrumento,
      });
      if (wrapperObj.success)
        this.bitacoraService.saveBitacora(
          fnencomienda,
          CRUDMessages.DeleteSuccess,
          InstrumentosController.name,
        );
      else
        this.bitacoraService.saveBitacora(
          fnencomienda,
          CRUDMessages.DeleteError,
          InstrumentosController.name,
        );
      return wrapperObj;
    } catch (err) {
      const msg = `al buscar: ${err.message}`;
      try {
        this.bitacoraService.saveBitacora(
          fnencomienda,
          `al borrar: ${err.message}`,
          'InstrumentosController',
        );
      } catch (err) {
        Logger.error(err);
      }
      return this.instrumentosService.error(msg, -5);
    }
  }

  @Get('getEncomiendas')
  async getEncomiendas() {
    return this.catalogoService.getEncomiendasAll(
      new QueryParams(Order.ASC, 1, 50),
    );
  }

  @Get('tipo-programa')
  async getTipoPrograma() {
    return this.catalogoService.getTipoPrograma(
      // new QueryParams(Order.ASC, 1, 100)
      new QueryParams(Order.ASC, 1, 50)
    );
  }

  @Get('cata/:fcidecat')
  async cata(
    @Param('fcidecat') fcidecat: string,
  ) {
    return this.catalogoService.getCata(fcidecat);
  }

}
