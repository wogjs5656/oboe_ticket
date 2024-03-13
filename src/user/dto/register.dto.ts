import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../types/userRole.type";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @IsEmail()
    @ApiProperty({
        example: 'wowo1111@naver.com',
        description: '이메일 입력',
    })
    @IsNotEmpty({message: '이메일을 입력해주세요.'})
    email: string;

    @IsString()
    @ApiProperty({
        example: 'qwer1234',
        description: '비밀번호 입력',
    })
    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    password: string;

    @IsString()
    @ApiProperty({
        example: 'qwer1234',
        description: '비밀번호 확인 입력',
    })
    @IsNotEmpty({message: '비밀번호확인을 입력해주세요.'})
    confirmPassword: string;

    @IsString()
    @ApiProperty({
        example: '이재헌',
        description: '이름 입력',
    })
    @IsNotEmpty({message: '이름을 입력해주세요.'})
    name: string;

    // @IsEnum(Role, { message: 'User, Admin 중 하나만 입력할 수 있습니다.' })
    // @IsNotEmpty({ message: '역할을 입력해주세요.' })
    // role: Role;
    role: Role.Admin;
    
    point: number;
}