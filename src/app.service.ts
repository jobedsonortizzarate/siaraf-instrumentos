import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit(): Promise<void> {
    // Hack para UTC
    process.env.TZ = process.env.TZ || 'UTC';
  }

  static url(): string {
    const { AMQP_URL } = process.env;
    const url = AMQP_URL
      ? AMQP_URL
      : 'amqps://root:test@localhost:5672/siaraf-exchange';
    Logger.debug(`rabbitMQ url:${url}`);
    return url;
  }
}
