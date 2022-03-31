import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt=promisify(_scrypt)

@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}


    async signup(email:string,password:string){
        // See if email already in use
        const users= await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('Email is already in Use')
        }


        // HAsh The Users Password
        // Generate a Salt
        const salt=randomBytes(8).toString('hex'); // j2jdnwhy7y3u82dcr8


        // Hash the Salt and Password together
        const hash=(await scrypt(password,salt,32)) as Buffer;

        // Join the Hashed result and the salt together
        const result=salt+'.'+hash.toString('hex');



        // Create New User and Save it
        const user=await this.usersService.create(email,result);

        // Return the User
        return user;
    }

    async signin(email:string,password:string){

        const [user]=await this.usersService.find(email);

        if(!user){
            throw new NotFoundException('User not found');
        }

        const[salt,storedHash]=user.password.split('.');

        const hash=(await scrypt(password,salt,32) as Buffer);

        if(storedHash!==hash.toString('hex')){
            throw new BadRequestException('Wrong Password');
        }
        return user;

    }



}