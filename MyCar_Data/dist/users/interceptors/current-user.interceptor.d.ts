import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";
export declare class CurrentUserInterceptors implements NestInterceptor {
    private usersService;
    constructor(usersService: UsersService);
    intercept(context: ExecutionContext, handler: CallHandler<any>): Promise<Observable<any>>;
}
