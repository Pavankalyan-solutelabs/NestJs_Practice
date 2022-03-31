import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';


interface ClassConstructor{
    new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto:any){}
  
    intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> {
      //Run something before a request is Handled
      // by the request handler

      // console.log('Before Handler',context)

      return handler.handle().pipe(
          map((data:any)=>{
              return plainToClass(this.dto,data,{
                  excludeExtraneousValues:true,
              })
          })
      )
  }
}
