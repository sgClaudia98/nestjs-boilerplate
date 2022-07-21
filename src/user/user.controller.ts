import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { User } from './user';
import { UserService } from './user.service';

@Crud({
  model: {
    type: User
  },
  routes: {
    exclude: ['createManyBase']
  },
  query: {
    exclude: ["password"],
    join: {
      rol: {
        eager: true
      }
    }
  }
})

@Controller('users')
export class UserController implements CrudController<User>{
  constructor(public service: UserService) { }
}
