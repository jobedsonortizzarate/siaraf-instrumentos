import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

@Injectable()
export class ResponseAddAccessTokenToHeaderInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();
    // Se activa CORS
    ResponseObj.setHeader('Access-Control-Allow-Origin', '*');
    // ResponseObj.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );
    // ResponseObj.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    ResponseObj.setHeader('Access-Control-Allow-Methods', '*');
    // ResponseObj.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    ResponseObj.setHeader('Access-Control-Allow-Headers', '*');
    return next.handle();
  }
}
