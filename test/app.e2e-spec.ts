import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Wrapper } from '../src/commons/dtos/wrapper';
import { InstrumentosService } from '../src/instrumentos/instrumentos.service';
import { BitacoraService } from '../src/bitacora-microservice-connection/bitacora.services';
import { CatalogoService } from '../src/catalogo-microservice-conecction/application/catalogo.services';
import { AppService } from '../src/app.service';
import { AppModule } from '../src/app.module';
import { InstrumentosServiceMock } from '../src/instrumentos/test/instrumentos.service.mock';
import { BitacoraServiceMock } from '../src/instrumentos/test/bitacora-service-mock';
import { CatalogoServiceMock } from '../src/instrumentos/test/catalogo-service-mock';
import { QueryParams } from '../src/commons/dtos/query-params';
import { Order } from '../src/commons/constants';

jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let instrumentoService: InstrumentosService;
  let catalogoService: CatalogoService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AppService,
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

    instrumentoService =
      moduleFixture.get<InstrumentosService>(InstrumentosService);
    catalogoService = moduleFixture.get<CatalogoService>(CatalogoService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/instrumentos (findAll)', async () => {
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

    const response = await request(app.getHttpServer())
      .get('/instrumentos?page=1&take=20&order=DESC')
      .expect(200);

    const payload = (response as any).body.result;

    // let payload = (response as any).result;

    expect(payload.listInstrumentos).toStrictEqual(
      InstrumentosServiceMock.payload,
    );
    expect(payload.listEncomiendas).toStrictEqual(
      CatalogoServiceMock.payloadBmgEncomienda,
    );
  });

  it('find/{fnencomienda}/{fninstrumento} (findOneMultiKey)', async () => {
    const tempQueryParamsFindOneMultiKey = new QueryParams(Order.ASC, 1, 1);
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().findOneById(tempQueryParamsFindOneMultiKey);
    jest
      .spyOn(instrumentoService, 'findOneById')
      .mockImplementation(() => resultService);

    const response = await request(app.getHttpServer())
      .get('/instrumentos/find/122/3160')
      .expect(200);

    const payload = (response as any).body.result;

    expect(payload).toStrictEqual(InstrumentosServiceMock.payload[0]);
  });

  it('/api-ins/v1/instrumentos (Alta)', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().create(InstrumentosServiceMock.payload[0]);
    jest
      .spyOn(instrumentoService, 'create')
      .mockImplementation(() => resultService);

    const sender = request(app.getHttpServer());

    const response = await sender
      .post('/instrumentos')
      .send(InstrumentosServiceMock.payload[0])
      .expect(201);

    const payload = (response as any).body;
    expect(payload.success).toBe(true);
  });

  it('/api-ins/v1/instrumentos/{fnencomienda}/{fninstrumento} (Baja)', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().remove(
        InstrumentosServiceMock.payload[0].fnencomienda,
        InstrumentosServiceMock.payload[0].fninstrumento,
      );
    jest
      .spyOn(instrumentoService, 'remove')
      .mockImplementation(() => resultService);

    const response = await request(app.getHttpServer())
      .delete('/instrumentos/122/3160')
      .expect(200);

    const payload = (response as any).body;
    expect(payload.success).toBe(true);
  });

  it('/api-ins/v1/instrumentos/{fnencomienda}/{fninstrumento} Cambio', async () => {
    const resultService: Promise<Wrapper<any>> =
      new InstrumentosServiceMock().update(
        InstrumentosServiceMock.payload[0].fnencomienda,
        InstrumentosServiceMock.payload[0].fninstrumento,
        InstrumentosServiceMock.payload[0],
      );
    jest
      .spyOn(instrumentoService, 'update')
      .mockImplementation(() => resultService);

    const response = await request(app.getHttpServer())
      .patch('/instrumentos/122/3160')
      .send(InstrumentosServiceMock.payload[0])
      .expect(200);

    const payload = (response as any).body;

    expect(payload.success).toBe(true);
  });
});
