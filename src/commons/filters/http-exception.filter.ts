import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Order } from '../constants';
import { QueryParams } from '../dtos/query-params';
import { Wrapper } from '../dtos/wrapper';
import { CRUDMessages } from '../messages.enum';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`);
    //generar clase de salida
    const wrapper = new Wrapper<any>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      { timespan: new Date().toISOString(), path: req.url, error: msg },
      false,
      `${CRUDMessages.GenericException} Detalle: ${msg.message}.`,
    );

    //   res
    //     .status(status)
    //     .json({ timespan: new Date().toISOString(), path: req.url, error: msg });
    res.status(status).json(wrapper);
  }
}
