import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        example: 'wowo1111@naver.com',
        description: '가입시 적었던 이메일 입력',
    })
    @IsNotEmpty({ message: '이메일을 입력해주세요.'})
    email: string;

    @IsString()
    @ApiProperty({
        example: 'qwer1234',
        description: '가입시 적었던 비밀번호 입력',
    })
    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    password: string;
}   