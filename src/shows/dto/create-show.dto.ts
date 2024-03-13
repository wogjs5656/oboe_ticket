import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createShowDto {
    @IsString()
    @ApiProperty({
        example: '헤드윅',
        description: '생성할 공연 제목 입력',
    })   
    @IsNotEmpty({ message: '공연 제목을 입력해주세요.'})
    title: string;

    @IsString()
    @ApiProperty({
        example: '더 이상의 수식어가 필요 없는 명작의 귀환',
        description: '공연에 대한 설명을 입력',
    })   
    @IsNotEmpty({ message: '공연 내용을 입력해주세요.'})
    content: string;

    @IsNumber()
    @ApiProperty({
        example: '30000',
        description: '공연 가격 입력',
    })   
    @IsNotEmpty({message: '공연 금액을 입력해주세요.'})
    price: number;

    @IsString()
    @ApiProperty({
        example: '샤롯데씨어터',
        description: '공연 장소 입력',
    })   
    @IsNotEmpty({message: '공연 장소를 입력해주세요.'})
    place: string;

    @IsString()
    @ApiProperty({
        example: '2024-03-31',
        description: '해당 공연 날짜 입력',
    })   
    @IsNotEmpty({message: '공연 시간을 입력해주세요.'})
    showDate: string;

    @IsString()
    @ApiProperty({
        example: 'musical',
        description: '해당 공연의 카테고리를 입력',
    })   
    @IsNotEmpty({message: '공연 카테고리를 입력해주세요.'})
    category: string;
}