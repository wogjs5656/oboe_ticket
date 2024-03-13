import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { createShowDto } from './dto/create-show.dto';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('공연 API')
@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}
  @ApiOperation({
    summary: '공연 정보 조회 API',
    description: '모든 공연의 정보를 볼 수 있다.',
  })
  @Get()
  async findAllShows() {
    return await this.showsService.findAllShows();
  }

  @ApiOperation({
    summary: '공연 상세 정보 API',
    description: '공연 id를 Param으로 입력시 상세 정보를 볼 수 있다. ',
  })
  @Get(':id')
  async findShowDetail(@Param('id') id: number) {
    return await this.showsService.findShowDetail(id);
  }

  @ApiOperation({
    summary: '공연 검색 API',
    description: '마지막에 오류 나서 사용이 안됩니다',
  })
  @Get('search')
  async searchForShows(@Query('keyword') keyword: string) {
      const resultShow = await this.showsService.serchForShows(keyword);
      return resultShow;
    }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @Post()
  async createShow(@Body() createDto: createShowDto, @UserInfo() user: User) {
    return await this.showsService.createShow(createDto);
  }
}
