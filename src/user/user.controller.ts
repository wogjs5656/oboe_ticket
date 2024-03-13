import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '유저생성 API',
    description: 'role.User로 된 유저를 생성한다.',
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.register(
      registerDto.email,
      registerDto.password,
      registerDto.confirmPassword,
      registerDto.name,
      registerDto.point,
    );
  }

  @ApiOperation({
    summary: '유저생성 API',
    description: 'role.Admin으로 된 유저를 생성한다.',
  })
  @Post('register/admin')
  async registerAdmin(@Body() registerDto: RegisterDto) {
    return await this.userService.registerAdmin(
      registerDto.email,
      registerDto.password,
      registerDto.confirmPassword,
      registerDto.name,
      registerDto.point,
    );
  }

  // @Res = 커먼에서 제공하는 리스폰스. 자동으로 들어가짐 쿠키가
  @ApiOperation({
    summary: '로그인 API',
    description: '회원가입한 ID, PASSWORD로 로그인한다',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.userService.login(
      loginDto.email,
      loginDto.password,
    );
    res.cookie('authorization', `Bearer ${user.access_token}`);
    res.send('환영합니다.');
  }
  @ApiOperation({
    summary: '사용자 프로필 조회',
    description: '로그인한 아이디 프로필을 조회할 수 있다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findProfile(@Param('id') id: number) {
    return await this.userService.findProfile(id);
  }
}
