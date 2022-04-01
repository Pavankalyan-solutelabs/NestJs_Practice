import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private usersService:UsersService){}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const {UserId}=req.session || {};
        if(UserId){
            const user=await this.usersService.findOne(UserId);
            //@ts-ignore
            req.currentUser=user;

        }
        next();
    }
}






