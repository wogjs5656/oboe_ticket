import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Seat } from 'src/reserve/entities/seat.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'shows',
})

export default class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({type: 'varchar'})
  showDate: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  place: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', default: 'Scheduled' })
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(()=> Reserve, reserve => reserve.show)
  reserves: Reserve[];

  // @OneToMany(()=> Seat, (seat) => seat.shows)
  // seatss: Seat[];

  // @OneToMany(() => Seat, seat => seat.shows)
  // seats: Seat[];
}
