import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt_decode from "jwt-decode";


@Injectable()
export class SecurityMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let index = req.rawHeaders.indexOf('Authorization');
        if (index !== -1) {
            index++;
            // let result = base64.decode(req.rawHeaders[index]);
            let result = jwt_decode(req.rawHeaders[index]);
            // console.log(result);
        }
        next();
    }
}
