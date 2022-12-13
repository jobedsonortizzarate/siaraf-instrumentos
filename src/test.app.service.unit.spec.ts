import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';

jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppService],
    }).compile();

    appService = moduleFixture.get<AppService>(AppService);
  });

  it('onModuleInit', async () => {
    const result = await appService.onModuleInit();
    expect(result).toBe(undefined);
  });

  it('RabbitMQ url', async () => {
    const result = AppService.url();
    console.log(result);
    expect(result.indexOf('amqp') > -1).toBe(true);
  });

  it('RabbitMQ sin variable de entorno url', async () => {
    delete process.env.AMQP_URL;
    const result = AppService.url();
    console.log(result);
    expect(result.indexOf('amqp') > -1).toBe(true);
  });
});
