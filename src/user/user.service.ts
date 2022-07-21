import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistarUserDto } from '../auth/dto/registar-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User>{
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  async registrar(userDto: RegistarUserDto): Promise<User> {

    // check if the user exists in the db
    const userInDb = await this.repo.findOne({
      where: { email: userDto.email }
    });

    if (userInDb) {
      throw new HttpException('El User ya existe', HttpStatus.BAD_REQUEST);
    }
    else {
      const user: User = await this.repo.create(userDto);
      await this.repo.save(user);
      return this.repo.findOne(user.id);
    }
  }
}
