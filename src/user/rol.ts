import { User } from './user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany, BaseEntity
} from 'typeorm';


@Entity()
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: string;

  @OneToMany(() => User, user => user.rol)
  users: User[];
}
