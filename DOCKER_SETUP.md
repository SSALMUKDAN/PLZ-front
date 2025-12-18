# Docker로 MongoDB 실행하기

## 1. Docker 설치 확인

Docker Desktop이 설치되어 있어야 합니다.
https://www.docker.com/products/docker-desktop/

## 2. MongoDB 컨테이너 실행

```bash
# MongoDB 컨테이너 시작
docker-compose up -d

# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs mongodb
```

## 3. Prisma 클라이언트 생성

```bash
npx prisma generate
```

## 4. 개발 서버 실행

```bash
npm run dev
```

## 유용한 명령어

```bash
# MongoDB 중지
docker-compose down

# MongoDB 중지 + 데이터 삭제
docker-compose down -v

# MongoDB 재시작
docker-compose restart

# MongoDB 쉘 접속
docker exec -it plz-mongodb mongosh -u admin -p admin123
```

## 데이터베이스 정보

- Host: localhost
- Port: 27017
- Database: plz
- Username: admin
- Password: admin123

## 문제 해결

### 포트 충돌

다른 프로그램이 27017 포트를 사용 중이면:

```bash
# 포트 확인
netstat -ano | findstr :27017

# docker-compose.yml에서 포트 변경
ports:
  - "27018:27017"  # 호스트 포트를 27018로 변경

# .env.local도 수정
DATABASE_URL="mongodb://admin:admin123@localhost:27018/plz?authSource=admin"
```

### Docker가 실행되지 않음

Docker Desktop을 시작하세요.
