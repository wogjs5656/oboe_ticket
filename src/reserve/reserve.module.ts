import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Show from 'src/shows/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import { Seat } from './entities/seat.entity';
import { Reserve } from './entities/reserve.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show,User,Seat,Reserve])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
