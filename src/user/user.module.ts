import { Rol } from './rol';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule { }
