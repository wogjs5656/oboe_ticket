## 공연 예약 시스템

### 😃프로젝트 의의
처음 써보는 TS, NestJS와 TypeORM 적응하기 위한
개인 프로젝트

### 📌 주요 기능
- [ ]  로그인 / 회원가입
- [ ]  프로필 보기
- [ ]  새 공연 등록
- [ ]  공연 목록 보기
- [ ]  공연 검색하기
- [ ]  공연 상세보기
- [ ]  예매 확인하기
- [ ]  공연의 좌석 예매 정보 확인하기
- [ ]  좌석을 지정하여 예매하기
- [ ]  동시성 처리하기
- [ ]  예매 취소하기
- [ ]  가입시 100만 포인트를 지급하기
- [ ]  사용자 보유 포인트 모자른 경우 예매x
- [ ]  예매 취소시 지불한 포인트 환불하기


### 프로젝트 접속 경로
#User
- http://localhost:3000/apis (스웨거 주소)
- localhost:3000/user/register (Role.User) 회원가입
- localhost:3000/user/register/admin (Role.Admin) 회원가입
- localhost:3000/user/login 로그인
- localhost:3000/user/1 사용자 정보조회 (포인트 조회 가능)

#Show
- localhost:3000/shows 공연 생성
- localhost:3000/shows 공연 조회
- localhost:3000/shows/1 공연 상세조회
- localhost:3000/shows/serch/search?keyword= 공연 검색

#Reservation
- localhost:3000/reserve/1 공연 예약
- localhost:3000/reserve/1/5 예약 취소
- localhost:3000/reserve/findRes/1 예약한 공연 조회


# 🔒환경변수


DB_HOST=


DB_PORT=


DB_USERNAME=


DB_PASSWORD=


DB_NAME=


DB_SYNC=


JWT_SECRET_KEY=



# 패키지
- npm

# 개발 환경
- TS
- NestJS
- TypeORM
- Swagger
- JWT
