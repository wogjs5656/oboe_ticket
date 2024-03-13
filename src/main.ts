import { ValidationPipe } from '@nestjs/common';
// 자동 유효성 검사를 위해 필요한 ValidationPipe
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import {setupSwagger} from 'src/utils/setupSwagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      //컨트롤러에서 유저의 입력값을 자동으로 DTO 객체로 변환해주는 옵션
    }),
  );
  setupSwagger(app)
  app.use(cookieParser())
  await app.listen(3000);
}

bootstrap();