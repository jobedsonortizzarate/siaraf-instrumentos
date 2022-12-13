import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
// import { Order } from '../constants';
// import { QueryParams } from '../dtos/query-params';
// import { Wrapper } from '../dtos/wrapper';
// import { CRUDMessages } from '../messages.enum';

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // //generar clase de salida
    // const wrapper = new Wrapper<any>(
    //   new QueryParams(Order.DESC, 1, 1),
    //   1,
    //   null,
    //   false,
    //   `${CRUDMessages.GenericException} Detalle: ${msg.message}.`,
    //   { timespan: new Date().toISOString(), path: req.url, error: msg },
    // );
    return next.handle().pipe(timeout(Number(process.env.INTERCEPTOR_TIMEOUT)));
    // return wrapper;
  }
}
