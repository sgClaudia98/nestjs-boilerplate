import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Crud({
  model: {
    type: Usuario
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

@Controller('usuarios')
export class UsuarioController implements CrudController<Usuario>{
  constructor(public service: UsuarioService) { }
}
