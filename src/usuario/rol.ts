import { Usuario } from './usuario';
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

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];
}
