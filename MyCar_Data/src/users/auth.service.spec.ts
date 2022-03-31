import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of a UsersService

    const users:User[]=[];

    fakeUserService = {
      find: (email:string) => {
        const filteredUsers=users.filter(user => user.email===email)
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) =>{
       const user= {id:Math.floor(Math.random()*9999999),email,password} as User;
       users.push(user);
       return Promise.resolve(user);
      }
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a  new user with a salted and hashed password ', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async (done) => {
   
    await service.signup('asdf@asdf.com', 'asdf')
    try {
      await service.signup('asdf@asdf.com', 'asdf');
    } catch (err) {
      done();
    }
  });

  it('throws if signin is called with an unused email', async (done) => {
    try {
      await service.signin('asdfa@asdf.com', 'asdff');
    } catch (err) {
      done();
    }
  });

  it('throws if an invalid password is provided', async (done) => {
    // fakeUserService.find = () =>
    //   Promise.resolve([{ email: 'asdf@asdf.com', password: 'asdf' } as User,]);
    await service.signup('asdf@as.com', 'password123');
    try {
      await service.signin('asdf@as.com', 'password');
    } catch (err) {
      done();
    }
  });

  it('returns a user if correct password is provided', async () => {
    // fakeUserService.find = () =>
    //   Promise.resolve([{ email: 'asdf@asdf.com', password: 'a8c4ad6b7e7ee4c8.a0ddf8c04e9511b5452631041a0fad9d52046938b5663c50b31a2f36902fe5f2' } as User,]);

    await service.signup('asdf@asdf.com','mypassword');

    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();
    // const user=await service.signup('asdf@asdf.com','mypassword');
    // console.log(user);
  });
});
