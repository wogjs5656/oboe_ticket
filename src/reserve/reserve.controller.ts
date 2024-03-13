import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UnReserveDto } from './dto/unReserve.dto';

@ApiTags('예약 API')
@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @ApiOperation({
    summary: '공연 예약 API',
    description: '공연을 좌석과 함께 예약할 수 있다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post(':showId')
  async reservation(
    @Body() createReserveDto: CreateReserveDto,
    @Param('showId') showId: number,
    @UserInfo() user: User,
  ) {
    return await this.reserveService.reservation(
      createReserveDto,
      showId,
      user,
    )
  }

  @ApiOperation({
    summary: '공연 예약 취소 API',
    description: '예약을 취소할 수 있다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post(':showId/:seatId')
  async unReservation(
    @Param('showId') showId: number,
    @Param('seatId') seatId: number,
    @UserInfo() user: User,
  ) {
    return await this.reserveService.unReservation(showId,seatId,user);
  }

  @Get('findRes/:showId')
  async findReservation(@Param('showId') showId: number) {
    return await this.reserveService.findReserveByShowId(showId);
  }

}
