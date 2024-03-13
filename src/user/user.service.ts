import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Role } from './types/userRole.type';
import { number } from 'joi';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    point: number,
  ) {
    
    if(password.length < 6) {
      throw new BadRequestException('비밀번호는 최소 6자리 이상이어야합니다.');
    }

    if(password !== confirmPassword) {
      throw new BadRequestException('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    const isValidUser = await this.findByEmail(email);
    if (isValidUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }
    const hashedPassword = await hash(password, 10);

    await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      point
    });

    return {
      'message': '환영합니다 회원가입이 완료되었습니다.',
      "data": {email, name, point}
    }
  }

  async registerAdmin(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    point: number,
  ) {
    
    if(password.length < 6) {
      throw new BadRequestException('비밀번호는 최소 6자리 이상이어야합니다.');
    }

    if(password !== confirmPassword) {
      throw new BadRequestException('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    const isValidUser = await this.findByEmail(email);
    if (isValidUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }
    const hashedPassword = await hash(password, 10);

    await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      role: Role.Admin,
      point
    });

    return {
      'message': '환영합니다 회원가입이 완료되었습니다.',
      "data": {email, name, point}
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findProfile(userId: number) {
    const user = await this.userRepository.findOne({
      select: ['email', 'name', 'role', 'point'],
      where: { id: userId },
    });
    
    if(_.isNil(user)) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    return {
      'message': '프로필 정보가 조회되었습니다.',
      'data': user 
    }
  }

  async updateProfile(userId: number, name: string) {
    const user = await this.userRepository.findOne({
      select: ['email', 'name', 'point'],
      where: {id: userId},
    })

    if(_.isNil(user)) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    await this.userRepository.update({id: userId}, {name});

    return {
      'message': '프로필 정보가 수정되었습니다.',
      'data': user 
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
