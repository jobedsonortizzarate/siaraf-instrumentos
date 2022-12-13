import { Test, TestingModule } from '@nestjs/testing';
import { QueryParams } from 'src/commons/dtos/query-params';
import { Comparison, Order } from 'src/commons/constants';
import { Wrapper } from 'src/commons/dtos/wrapper';
// import { InstrumentosEntity } from "src/commons/entities/postgres-db-siaraf/Instrumentos.entity";
import { InstrumentosController } from './instrumentos.controller';
import { InstrumentosService } from './instrumentos.service';
import { InstrumentosServiceMock } from './test/instrumentos.service.mock';
import { BitacoraService } from 'src/bitacora-microservice-connection/bitacora.services';
import { BitacoraServiceMock } from './test/bitacora-service-mock';
import { CatalogoService } from 'src/catalogo-microservice-conecction/application/catalogo.services';
import { CatalogoServiceMock } from './test/catalogo-service-mock';
import { InstrumentosEntity } from 'src/commons/entities/mssql-db-siaraf/Instrumentos.entity';
import { Filter } from 'src/commons/dtos/filter';

describe('Prueba sobre instrumentos-microservices', () => {
  let instrumentoController: InstrumentosController;
  let instrumentoService: InstrumentosService;
  let bitacoraService: BitacoraService;
  let catalogoService: CatalogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstrumentosController],
      providers: [
        {
          provide: InstrumentosService,
          useClass: InstrumentosServiceMock,
        },
        {
          provide: BitacoraService,
          useClass: BitacoraServiceMock,
        },
        {
          provide: CatalogoService,
          useClass: CatalogoServiceMock,
        },
      ],
    }).compile();

    instrumentoService = module.get<InstrumentosService>(InstrumentosService);
    instrumentoController = module.get<InstrumentosController>(
      InstrumentosController,
    );
    bitacoraService = module.get<BitacoraService>(BitacoraService);
    catalogoService = module.get<CatalogoService>(CatalogoService);
  });

  it('should be defined', () => {
    expect(instrumentoController).toBeDefined();
  });

  it('Busqueda findAll', async () => {
    const tempQueryParamsFindAll = new QueryParams(Order.ASC, 1, 1000);
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().findAll(tempQueryParamsFindAll);
    jest
      .spyOn(instrumentoService, 'findAll')
      .mockImplementation(() => resultService);

    const tempQueryParamsEncomiendasAll = new QueryParams(Order.ASC, 1, 50);
    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().getEncomiendasAll(
        tempQueryParamsEncomiendasAll,
      );
    jest
      .spyOn(catalogoService, 'getEncomiendasAll')
      .mockImplementation(() => resultEncomiendasAll);

    const response = await instrumentoController.findAll(
      tempQueryParamsFindAll,
    );
    const payload = (response as any).result;

    expect(payload.listInstrumentos).toStrictEqual(
      InstrumentosServiceMock.payload,
    );
    expect(payload.listEncomiendas).toStrictEqual(
      CatalogoServiceMock.payloadBmgEncomienda,
    );
  });


  it('Busqueda findAll (con caso filtro nombre encomienda)', async () => {
    const tempQueryParamsFindAll = new QueryParams(Order.ASC, 1, 1000, [new Filter('nombreEncomienda', Comparison.LIKE, 'Ex')]);
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().findAll(tempQueryParamsFindAll);
    jest
      .spyOn(instrumentoService, 'findAll')
      .mockImplementation(() => resultService);

    const tempQueryParamsEncomiendasAll = new QueryParams(Order.ASC, 1, 50);
    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().getEncomiendasAll(
        tempQueryParamsEncomiendasAll,
      );
    jest
      .spyOn(catalogoService, 'getEncomiendasAll')
      .mockImplementation(() => resultEncomiendasAll);

    const response = await instrumentoController.findAll(
      tempQueryParamsFindAll,
    );
    const payload = (response as any).result;

    expect(payload.listInstrumentos).toStrictEqual(
      InstrumentosServiceMock.payload,
    );
    expect(payload.listEncomiendas).toStrictEqual(
      CatalogoServiceMock.payloadBmgEncomienda,
    );
  });

  it('Busqueda findAll (Si no hay encomiendas)', async () => {
    const tempQueryParamsFindAll = new QueryParams(Order.ASC, 1, 1000, [new Filter('nombreEncomienda', Comparison.LIKE, 'Ex')]);
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().findAll(tempQueryParamsFindAll);
    jest
      .spyOn(instrumentoService, 'findAll')
      .mockImplementation(() => resultService);

    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().sinRegistrosEncomienda();
    jest
      .spyOn(catalogoService, 'getEncomiendasAll')
      .mockImplementation(() => resultEncomiendasAll);

    const response = await instrumentoController.findAll(
      tempQueryParamsFindAll,
    );
    const payload = (response as any).result;

    expect(payload.listInstrumentos).toStrictEqual(
      undefined,
    );
    expect(payload.listEncomiendas).toStrictEqual(
      undefined,
    );
  });

  it('Busqueda findAll (con excepcion)', async () => {
    const tempQueryParamsFindAll = new QueryParams(Order.ASC, 1, 1000);
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().error();
    jest
      .spyOn(instrumentoService, 'error')
      .mockImplementation(() => resultService);

    jest.spyOn(instrumentoService, 'findAll').mockImplementation(() => {
      throw new Error('Error de prueba 1');
    });

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const tempQueryParamsEncomiendasAll = new QueryParams(Order.ASC, 1, 50);
    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().getEncomiendasAll(
        tempQueryParamsEncomiendasAll,
      );
    jest
      .spyOn(catalogoService, 'getEncomiendasAll')
      .mockImplementation(() => resultEncomiendasAll);

    const result = await instrumentoController.findAll(tempQueryParamsFindAll);

    expect(result.success).toBe(false);
  });

  it('Busqueda findAll (si bitacora falla)', async () => {
    const tempQueryParamsFindAll = new QueryParams(Order.ASC, 1, 1000);
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().error();
    jest
      .spyOn(instrumentoService, 'error')
      .mockImplementation(() => resultService);

    jest.spyOn(instrumentoService, 'findAll').mockImplementation(() => {
      throw new Error('Error de prueba 2');
    });
    jest.spyOn(bitacoraService, 'saveBitacora').mockImplementation(() => {
      throw new Error(
        'Error intencional 1/6 provocado para: Busqueda findAll (si bitacora falla)',
      );
    });

    const tempQueryParamsEncomiendasAll = new QueryParams(Order.ASC, 1, 50);
    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().getEncomiendasAll(
        tempQueryParamsEncomiendasAll,
      );
    jest
      .spyOn(catalogoService, 'getEncomiendasAll')
      .mockImplementation(() => resultEncomiendasAll);

    const result = await instrumentoController.findAll(tempQueryParamsFindAll);

    expect(result.success).toBe(false);
  });

  it('Busqueda findOneMultiKey', async () => {
    const tempQueryParamsFindOneMultiKey = new QueryParams(Order.ASC, 1, 1);
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().findOneById(tempQueryParamsFindOneMultiKey);
    jest
      .spyOn(instrumentoService, 'findOneById')
      .mockImplementation(() => resultService);

    const response = await instrumentoController.findOneMultiKey(122, 3160);
    const payload = (response as any).result;
    expect(payload).toStrictEqual(InstrumentosServiceMock.payload[0]);
  });

  it('Busqueda findOneMultiKey (con excepcion)', async () => {
    jest.spyOn(instrumentoService, 'findOneById').mockImplementation(() => {
      throw new Error('Error de prueba 4');
    });

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result = await instrumentoController.findOneMultiKey(122, 3160);
    expect(result.success).toBe(false);
  });

  it('Busqueda findOneMultiKey (si falla bitacora)', async () => {
    jest.spyOn(instrumentoService, 'findOneById').mockImplementation(() => {
      throw new Error('Error de prueba 5');
    });
    jest.spyOn(bitacoraService, 'saveBitacora').mockImplementation(() => {
      throw new Error(
        'Error intencional 2/6 provocado para: Busqueda findOneMultiKey (si falla bitacora)',
      );
    });

    const result = await instrumentoController.findOneMultiKey(122, 3160);
    expect(result.success).toBe(false);
  });

  it('Alta', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().create(InstrumentosServiceMock.payload[0]);
    jest
      .spyOn(instrumentoService, 'create')
      .mockImplementation(() => resultService);

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.create(
      InstrumentosServiceMock.payload[0],
    );
    expect(result.success).toBe(true);
  });

  it('Alta (sin registros en la base)', async () => {

    {
      const resultService: Promise<Wrapper<any>> =
        new InstrumentosServiceMock().sinRegistros();
      jest
        .spyOn(instrumentoService, 'findAll')
        .mockImplementation(() => resultService);
    }

    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().create(InstrumentosServiceMock.payload[0]);
    jest
      .spyOn(instrumentoService, 'create')
      .mockImplementation(() => resultService);


    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.create(
      InstrumentosServiceMock.payload[0],
    );
    expect(result.success).toBe(true);
  });

  it('Alta (con respuesta fallida)', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().error();
    jest
      .spyOn(instrumentoService, 'create')
      .mockImplementation(() => resultService);

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.create(
      InstrumentosServiceMock.payload[0],
    );
    expect(result.success).toBe(false);
  });

  it('Alta (con excepcion)', async () => {
    jest.spyOn(instrumentoService, 'create').mockImplementation(() => {
      throw new Error('Error de prueba 7');
    });

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.create(
      InstrumentosServiceMock.payload[0],
    );
    expect(result.success).toBe(false);
  });

  it('Alta (si falla bitacora)', async () => {
    jest.spyOn(instrumentoService, 'create').mockImplementation(() => {
      throw new Error('Error de prueba 8');
    });
    jest.spyOn(bitacoraService, 'saveBitacora').mockImplementation(() => {
      throw new Error(
        'Error intencional 3/6 provocado para: Alta (si falla bitacora)',
      );
    });

    const result: any = await instrumentoController.create(
      InstrumentosServiceMock.payload[0],
    );
    expect(result.success).toBe(false);
  });

  it('Alta (caso else) (con excepcion)', async () => {
    jest.spyOn(instrumentoService, 'create').mockImplementation(() => {
      throw new Error('Error de prueba 10');
    });

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.create(undefined);
    expect(result.success).toBe(false);
  });

  it('Alta (caso else) (si falla bitacora)', async () => {
    jest.spyOn(instrumentoService, 'create').mockImplementation(() => {
      throw new Error('Error de prueba 11');
    });
    jest.spyOn(bitacoraService, 'saveBitacora').mockImplementation(() => {
      throw new Error(
        'Error intencional 4/6 provocado para: Alta (caso else) (si falla bitacora)',
      );
    });

    const result: any = await instrumentoController.create(undefined);
    expect(result.success).toBe(false);
  });

  it('Baja', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().remove(
        InstrumentosServiceMock.payload[0].fnencomienda,
        InstrumentosServiceMock.payload[0].fninstrumento,
      );
    jest
      .spyOn(instrumentoService, 'remove')
      .mockImplementation(() => resultService);

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.remove(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
    );
    expect(result.success).toBe(true);
  });

  it('Baja (caso respuesta fallida)', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().error();
    jest
      .spyOn(instrumentoService, 'remove')
      .mockImplementation(() => resultService);

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.remove(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
    );
    expect(result.success).toBe(false);
  });
  it('Baja (con excepcion)', async () => {
    jest.spyOn(instrumentoService, 'remove').mockImplementation(() => {
      throw new Error('Error de prueba 13');
    });

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result = await instrumentoController.remove(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
    );
    expect(result.success).toBe(false);
  });

  it('Baja (si falla bitacora)', async () => {
    jest.spyOn(instrumentoService, 'remove').mockImplementation(() => {
      throw new Error('Error de prueba 14');
    });
    jest.spyOn(bitacoraService, 'saveBitacora').mockImplementation(() => {
      throw new Error(
        'Error intencional 5/6 provocado para: Baja (si falla bitacora)',
      );
    });

    const result = await instrumentoController.remove(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
    );
    expect(result.success).toBe(false);
  });

  it('Cambio', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().update(
        InstrumentosServiceMock.payload[0].fnencomienda,
        InstrumentosServiceMock.payload[0].fninstrumento,
        InstrumentosServiceMock.payload[0],
      );
    jest
      .spyOn(instrumentoService, 'update')
      .mockImplementation(() => resultService);

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.update(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
      InstrumentosServiceMock.payload[0],
    );

    expect(result.success).toBe(true);
  });

  it('Cambio (caso respuesta fallida)', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().error();
    jest
      .spyOn(instrumentoService, 'update')
      .mockImplementation(() => resultService);

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result: any = await instrumentoController.update(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
      InstrumentosServiceMock.payload[0],
    );

    expect(result.success).toBe(false);
  });

  it('Cambio (con excepcion)', async () => {
    jest.spyOn(instrumentoService, 'update').mockImplementation(() => {
      throw new Error('Error de prueba 16');
    });

    const resultBitacora = new BitacoraServiceMock().saveBitacora(1, '', '');
    jest
      .spyOn(bitacoraService, 'saveBitacora')
      .mockImplementation(() => resultBitacora);

    const result = await instrumentoController.update(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
      InstrumentosServiceMock.payload[0],
    );
    expect(result.success).toBe(false);
  });

  it('Cambio (si falla bitacora)', async () => {
    jest.spyOn(instrumentoService, 'update').mockImplementation(() => {
      throw new Error('Error de prueba 17');
    });
    jest.spyOn(bitacoraService, 'saveBitacora').mockImplementation(() => {
      throw new Error(
        'Error intencional 6/6 provocado para: Cambio (si falla bitacora)',
      );
    });

    const result = await instrumentoController.update(
      InstrumentosServiceMock.payload[0].fnencomienda,
      InstrumentosServiceMock.payload[0].fninstrumento,
      InstrumentosServiceMock.payload[0],
    );
    expect(result.success).toBe(false);
  });

  it('getEncomiendas', async () => {
    const tempQueryParamsEncomiendasAll = new QueryParams(Order.ASC, 1, 50);
    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().getEncomiendasAll(
        tempQueryParamsEncomiendasAll,
      );
    jest
      .spyOn(catalogoService, 'getEncomiendasAll')
      .mockImplementation(() => resultEncomiendasAll);

    const result = await instrumentoController.getEncomiendas();
    expect(result.success).toBe(true);
  });

  it('tipo-programa', async () => {
    const tempQueryParamsEncomiendasAll = new QueryParams(Order.ASC, 1, 50);
    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().getTipoPrograma(
        tempQueryParamsEncomiendasAll,
      );
    jest
      .spyOn(catalogoService, 'getTipoPrograma')
      .mockImplementation(() => resultEncomiendasAll);

    const result = await instrumentoController.getTipoPrograma();
    expect(result.success).toBe(true);
  });
  it('cata/:fcidecat', async () => {
    const resultEncomiendasAll: Promise<Wrapper<any>> =
      new CatalogoServiceMock().getCata();
    jest
      .spyOn(catalogoService, 'getCata')
      .mockImplementation(() => resultEncomiendasAll);

    const result = await instrumentoController.cata('any');
    expect(result.success).toBe(true);
  });
});
