import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UnReserveDto {
@IsNumber()
@ApiProperty({
    example: '2',
    description: '조회한 공연 id 를 입력',
})   
@IsNotEmpty({ message: 'showId를 입력해주세요.' })
showId: number;

@IsNumber()
@ApiProperty({
    example: '10',
    description: '예약했던 좌석번호 입력',
})   
@IsNotEmpty({ message: 'seatId를 입력해주세요. '})
seatId: number
}
