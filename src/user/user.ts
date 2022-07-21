import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn, BeforeInsert, OneToMany, BaseEntity, JoinColumn, Timestamp,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rol } from './rol';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ length: 150, unique: true })
  email: string;

  @ManyToOne(() => Rol, rol => rol.users)
  @JoinColumn()
  rol: Rol;

  @Column({ nullable: true })
  rolId: number;

  @Column({ default: true })
  activo: boolean;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: number;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

}
