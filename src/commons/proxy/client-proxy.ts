import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
// import { RabbitMQ } from 'common/constants';
import { RabbitMQ } from '../constants';
//configuracion de RabbitMQ
@Injectable()
export class ClientProxyIndep {
  // constructor(private readonly config: ConfigService) {}
  // constructor() {}
  static url(): string {
    const { AMQP_URL } = process.env;
    const url = AMQP_URL ? AMQP_URL : 'amqps://root:test@localhost:5672';
    return url;
  }
  clientProxyInstrumentos(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [ClientProxyIndep.url()],
        queue: RabbitMQ.instrumentosQueue,
        // durable: true,
        // persistent: true,
      },
    });
  }
}
