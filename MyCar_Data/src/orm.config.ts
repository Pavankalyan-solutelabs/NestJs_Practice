import { TypeOrmModuleOptions } from "@nestjs/typeorm";



export const config: TypeOrmModuleOptions={
    type:'postgres',
    username:'postgres',
    password:'pg@solutelabs',
    port:5432,
    host:'127.0.0.1',
    database:'Nest_Practice',
    synchronize:true,
    entities:["dist/**/*.entity{.ts,.js}"],



}