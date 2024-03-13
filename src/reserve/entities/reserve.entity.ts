import Show from 'src/shows/entities/show.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seat } from './seat.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 'reserves',
})
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  showTitle: string;

  @Column({ type: 'varchar', nullable: false })
  userName: string;

  @Column({ type: 'varchar', nullable: false })
  reserveName: string;

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @Column({ type: 'int', nullable: false })
  seatId: number;

  @Column({ type: 'int', nullable: false })
  showId: number;

  @ManyToOne(() => User, user => user.reserves)
  @JoinColumn({name: 'userId'})
  user: User;

  @ManyToOne(() => Show, (show) => show.reserves)
  @JoinColumn({name: 'showId'})
  show: Show;

  @OneToMany(() => Seat, (seats) => seats.reserve)
  seats: Seat;

  // @OneToMany(() => Seat, (seat) => seat.reserve)
  // @JoinColumn({name: 'reserveId'})
  // seats: Seat[];

  // @Column('int',{name: 'userId', select:true, nullable: false })
  // userId: number;

}
