// user.entity.ts
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../types/userRole.type';
import { Seat } from '../../reserve/entities/seat.entity';
import { Reserve } from 'src/reserve/entities/reserve.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'int', default: 1000000 })
  point: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  // User 1:N Reserve 
  @OneToMany(() => Reserve, reserve => reserve.user)
  reserves: Reserve;

  @OneToMany(() => Seat, (seat) => seat.reservedUser)
  reservedUser: Seat;

  // user 1:N seat 근데 seat를 참조하는 reserv를 같이 연결
  // @OneToMany(() => Seat, (seat) => seat.reservation)
  // reservation: Seat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
