import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import Show from 'src/shows/entities/show.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User,Show]),
  ],
  providers: [UserService], // 이 모듈 내에서 사용할 서비스 정의

  controllers: [UserController], // 이 모듈 내에서 사용할 컨트롤러 정의

  exports: [UserService], // 외부에서 사용할 수 있는 provider 정의
})
export class UserModule {}
