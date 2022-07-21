import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity( )
export class PasswordToken extends BaseEntity{
  @PrimaryColumn()
  email: string;

  @Column()
  token: string;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt: number;
  @DeleteDateColumn({ type: 'timestamp'})
  deletedAt: number;
}
