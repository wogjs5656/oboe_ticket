import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Show from 'src/shows/entities/show.entity';
import { Repository } from 'typeorm';
import { Reserve } from './entities/reserve.entity';
import { User } from 'src/user/entities/user.entity';
import { Seat } from './entities/seat.entity';
import _ from 'lodash';
import { query } from 'express';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Show) private showRepository: Repository<Show>,
    @InjectRepository(Reserve) private reserveRepository: Repository<Reserve>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
  ) {}

  async reservation(reserveDto: CreateReserveDto, showId: number, user: User) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const shows = await queryRunner.manager.findOne(Show, {
        where: {
          id: showId,
        },
      });

      if (_.isNil(shows)) {
        throw new BadRequestException('해당 공연을 찾을 수 없습니다.');
      }

      const allSeats = await queryRunner.manager.find(Seat, {
        where: { showId },
      });

      const reservedSeats = allSeats.filter((seat) => seat.isReserved);

      // const reservedSeats = await queryRunner.manager.count(Seat, {
      //   where: {
      //     showId: showId,
      //     isReserved: true,
      //   },
      // });

      const unReservedSeats = allSeats.length - reservedSeats.length;

      if (unReservedSeats <= 0) {
        throw new BadRequestException(
          '현재 남은 좌석이 없어 예약 할 수 없습니다.',
        );
      }

      const seat = await queryRunner.manager.findOne(Seat, {
        where: {
          seatNum: reserveDto.seats,
        },
      });

      if (_.isNil(seat)) {
        throw new BadRequestException(
          '선택하신 좌석은 존재하지 않는 좌석입니다.',
        );
      }

      if (seat.isReserved) {
        throw new BadRequestException('선택하신 좌석은 예약된 좌석입니다.');
      }

      seat.isReserved = true;
      // 사용자에게 예약 정보를 저장
      seat.reservedUser = user;
      await queryRunner.manager.save(Seat, seat);

      user.point = user.point - shows.price;
      await queryRunner.manager.save(User, user);

      const reserve = new Reserve();
      reserve.showId = showId;
      reserve.showTitle = shows.title;
      reserve.userName = user.name;
      reserve.reserveName = reserveDto.reserveName;
      reserve.place = shows.place;
      reserve.show = shows;
      reserve.seatId = reserveDto.seats;

      await queryRunner.manager.save(Reserve, reserve);
      await queryRunner.commitTransaction();
      return {
        message: '예약에 성공하였습니다.',
        reserve
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async unReservation(showId: number, reserveId: number, user: User) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const shows = await queryRunner.manager.findOne(Show, {
        where: {
          id: showId,
        },
      });
      

      const reserves = await queryRunner.manager.findOne(Reserve, {
        where: {
          seatId: reserveId,
          userName: user.name,
        },
      });
      if (_.isNil(shows)) {
        throw new BadRequestException('공연을 입력해주세요.');
      }

      if (_.isNil(reserves)) {
        throw new BadRequestException('예약을 확인해주세요.');
      }

      const seats = await queryRunner.manager.findOne(Seat, {
        where: {
          id: reserves.seatId,
        },
      });

      seats.isReserved = false;
      seats.reserve = null;
      seats.reservedUser = null;
      await queryRunner.manager.save(Seat, seats);

      user.point = user.point + shows.price;
      await queryRunner.manager.save(User, user);

      await queryRunner.manager.delete(Reserve, reserves);

      await queryRunner.commitTransaction();

      return {
        message: '예약을 취소하였습니다.',
        reserves,
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findReserveByShowId(showId: number) {
    const reserveShowId = this.reserveRepository.findOneBy({
      showId: showId,
    })
    if(_.isNil(reserveShowId)) {
      throw new BadRequestException('예약을 확인바랍니다.');
    }

    const reserve = await this.reserveRepository.find({
      where: { 
        showId,
      }
    })
    return reserve;
  }
}
