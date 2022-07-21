import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from './usuario';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistarUsuarioDto } from '../auth/dto/registar-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService extends TypeOrmCrudService<Usuario>{
  constructor(@InjectRepository(Usuario) repo: Repository<Usuario>) {
    super(repo);
  }

  async registrar(userDto: RegistarUsuarioDto): Promise<Usuario> {

    // check if the user exists in the db
    const userInDb = await this.repo.findOne({
      where: { email: userDto.email }
    });

    if (userInDb) {
      throw new HttpException('El Usuario ya existe', HttpStatus.BAD_REQUEST);
    }
    else {
      const user: Usuario = await this.repo.create(userDto);
      await this.repo.save(user);
      return this.repo.findOne(user.id);
    }
  }
}
