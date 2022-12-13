import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TimeOutInterceptor } from './commons/interceptors/timeout.interceptor';
import { AllExceptionFilter } from './commons/filters/http-exception.filter';
import { ConnectionNames } from './commons/constants';
import * as ESAPI from 'node-esapi';
import * as hpp from 'hpp';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { ResponseAddAccessTokenToHeaderInterceptor } from './commons/interceptors/response-add-access-token-to-header.interceptor';
import helmet from 'helmet';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.MODE === 'DEV'
        ? ['debug', 'log', 'verbose', 'warn', 'error']
        : ['log', 'warn', 'error'],
    // cors: true,
    // false,
  });
  const optionsCors = {
    "origin": [`${process.env.APP_URL}:${process.env.PORT}`],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
  }
  app.enableCors(optionsCors);

  app.use(helmet());

  app.use(ESAPI.middleware());
  // app.use(hpp());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "default-src": ["'self'"],
        // "default-src": ["'self'", `*${process.env.APP_URL ? process.env.APP_URL.split('//')[1] : ''}`],
        "connect-src": ["'self'"],
        "img-src": ["'self'", "data:"],
        "style-src-elem": ["'self'", "data:"],
        "script-src": ["'self'"],
        "object-src": ["'none'"],
      },
    })
  );

  Logger.debug(`Nombre de conexion: ${ConnectionNames.DB_SIARAF}`);
  Logger.debug(`Nombre de conexion siaraf: ${ConnectionNames.DB_SIARAF}`);
  Logger.debug(`Nombre de host siaraf: ${process.env.MSSQL_SIARAF_HOST}`);

  //INICIA SECCION DE CONFIGURACION DE RABBIT_MQ PARA RESOLVER EVENTOS
  // await app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     // urls: [process.env.AMQP_URL],
  //     urls: [AppService.url()],
  //     queue: RabbitMQ.instrumentosQueue,
  //   },
  // });
  //FINALIZA SECCION DE CONFIGURACION DE RABBIT_MQ PARA RESOLVER EVENTOS
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api-ins/v1');
  //antes del listen, pero despues de todo lo demas agregar la configuracion de swagger
  //configuracion de swagger
  const options = new DocumentBuilder()
    .setTitle('INDEP-SIARAF instrumentos API')
    .setDescription('Microservicio para los Instrumentos')
    .setVersion('1.0.0')
    // .addBearerAuth()
    .build();
  //creacion del documento swagger
  const document = SwaggerModule.createDocument(app, options);
  //configuracion de SwaggerModule
  SwaggerModule.setup('/api-ins/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });
  //INICIALIZA LAS CONEXIONES A MICROSERVICIOS(EN ESTE CASO PARA RABBITMQ)
  await app.startAllMicroservices();
  const port = process.env.PORT || 5100;
  app.useGlobalInterceptors(new ResponseAddAccessTokenToHeaderInterceptor());

  await app.listen(port);

  //TODO: al ejecutar npm run start:dev el process.env.PORT manda un puerto diferente en process.env.PORT al definido en .env.development

  Logger.debug(
    `User Instrumentos Microservice is listening http://localhost:${port}`,
  );

  app.use(cookieParser('2fc9fd1a-44df-516c-a193-389bcb91d37a'));
  app.use(session({
    secret: '21c7e331-949a-5fdc-b364-1299ef81a298',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  app.use(csurf());

}
bootstrap();
