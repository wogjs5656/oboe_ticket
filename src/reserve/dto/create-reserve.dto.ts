import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReserveDto {
@IsString()
@ApiProperty({
    example: '이재헌',
    description: '예약자 성함 입력',
})   
@IsNotEmpty({ message: '예약자의 이름을 입력해주세요.' })
reserveName: string;

@IsNumber()
@ApiProperty({
    example: '10',
    description: '좌석번호 입력',
})   
@IsNotEmpty({ message: '좌석을 지정해주세요. '})
seats: number
}
