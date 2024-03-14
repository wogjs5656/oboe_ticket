import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Show from './entities/show.entity';
import { InsertResult, Like, Repository } from 'typeorm';
import { createShowDto } from './dto/create-show.dto';
import _ from 'lodash';
import { Seat } from 'src/reserve/entities/seat.entity';


@Injectable()
export class ShowsService {
    constructor(
        @InjectRepository(Show)
        private showRepository: Repository<Show>,
        @InjectRepository(Seat)
        private seatRepository: Repository<Seat>,
    ) {}

    // 등록된 공연 조회
    async findAllShows() { 
        const shows = await this.showRepository.find({
            where: {deletedAt: null},
            select: ['id', 'title', 'place', 'price', 'state'],
        });
        return shows;
    }

    // 공연 등록
    async createShow(
        createDto: createShowDto,
    ): Promise<Show> {
        const { title, content, price, place, showDate, category } = createDto;
        
        if(await this.findOneByShow(title)) {
            throw new BadRequestException('이미 등록된 공연입니다.');
        }

        const savedShow = await this.showRepository.save({
            title,
            content,
            price,
            place,
            showDate,
            category,
        })
        await this.addSeats(savedShow.id)
        return savedShow;
    }

    async addSeats(showId: number) {
        // 좌석 한번에 추가하기
        const seatsAllAdd = [];
        for(let i = 1; i <= 30; i++) {
            const seats = new Seat();
            seats.seatNum = i;
            seats.isReserved = false;
            seats.showId = showId;
            seatsAllAdd.push(seats);
        }
        const insertResult: InsertResult = await this.seatRepository.insert(seatsAllAdd);
        if(insertResult.identifiers.length !== 30){
            throw new Error('전체 좌석을 추가하지 못하였습니다.');
        }
    }


    // 키워드 인자를 입력받아 검색하기
    async searchForShows(keyword: string) {
        if (!keyword.trim()) {
            throw new BadRequestException('검색어가 비어있습니다.');
        }
        console.log('saasfasf',keyword)
        const resultShow = await this.showRepository.find({
            where: {
                title: Like(`%${keyword}%`)
            }
        });
        console.log(resultShow)
        if (resultShow.length === 0) {
            throw new BadRequestException('검색 결과가 존재하지 않습니다.');
        }
    
        return resultShow;
    }

    // 공연 상세보기
    async findShowDetail(id: number): Promise<Show> {
        if(_.isNaN(id)) {
            throw new BadRequestException('공연을 도출하지 못하였습니다.');
        }

        return await this.showRepository.findOne({
            where: {id},
        })
    }

    // 공연 제목 찾는 함수
    async findOneByShow(title: string) {
        return await this.showRepository.findOneBy({title});
    }
}
