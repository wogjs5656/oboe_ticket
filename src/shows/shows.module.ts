import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import Show from './entities/show.entity';
import { Seat } from 'src/reserve/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, User, Seat])],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
