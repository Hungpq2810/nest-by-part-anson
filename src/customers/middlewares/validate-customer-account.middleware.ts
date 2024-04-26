import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
        const { valid } = req.headers;
        if(valid) {
            next();
        } else {
            throw new HttpException("Invalid account", 401);
        }
    }
}