// seat.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import Show from 'src/shows/entities/show.entity';
import { Reserve } from './reserve.entity';

@Entity({
  name: 'seats',
})
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  seatNum: number;

  @Column({ type: 'boolean', default: false })
  isReserved: boolean;

  // @ManyToOne(() => Show, (show) => show.seatss)
  // @JoinColumn({ name: 'showId' })
  // shows: Show;

  @ManyToOne(() => Reserve, (reserve) => reserve.seats)
  // @JoinColumn({ name: 'reserveId' })
  reserve: Reserve;

  @ManyToOne(() => User, (user) => user.reservedUser)
  reservedUser: User;

  @Column('int', { name: 'showId', select: true, nullable: false })
  showId: number;

  @Column('int', { name: 'reserveId' })
  reserveId: number;
}
