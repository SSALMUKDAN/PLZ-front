# PLZ 백엔드 API 구현 완료

## ✅ 완료된 작업

### 1. 환경 설정

- ✅ Prisma, bcryptjs, jsonwebtoken 설치
- ✅ Prisma 초기화 및 설정
- ✅ MongoDB 스키마 정의

### 2. 데이터베이스 스키마

- ✅ User 모델 (선생님/학생 구분)
- ✅ Idea 모델 (프로젝트 아이디어)
- ✅ Comment 모델 (댓글/대댓글)
- ✅ IdeaParticipation 모델 (프로젝트 참여)

### 3. 유틸리티 함수

- ✅ Prisma Client 설정
- ✅ JWT 토큰 생성/검증
- ✅ 비밀번호 해싱/검증
- ✅ 인증 미들웨어

### 4. API 엔드포인트

#### 인증 API

- ✅ POST `/api/user/signup` - 회원가입
- ✅ POST `/api/auth/login` - 로그인
- ✅ GET `/api/auth/me` - 현재 사용자 정보
- ✅ GET `/api/user/profile` - 프로필 조회
- ✅ PUT `/api/user/profile` - 프로필 수정

#### 아이디어 API

- ✅ GET `/api/ideas` - 아이디어 목록 (필터링/정렬)
- ✅ POST `/api/ideas` - 아이디어 생성
- ✅ GET `/api/ideas/[id]` - 아이디어 상세
- ✅ PUT `/api/ideas/[id]` - 아이디어 수정
- ✅ DELETE `/api/ideas/[id]` - 아이디어 삭제

#### 댓글 API

- ✅ GET `/api/ideas/[id]/comments` - 댓글 목록
- ✅ POST `/api/ideas/[id]/comments` - 댓글/대댓글 생성
- ✅ PUT `/api/comments/[id]` - 댓글 수정
- ✅ DELETE `/api/comments/[id]` - 댓글 삭제
- ✅ POST `/api/comments/[id]/like` - 댓글 좋아요

### 5. 프론트엔드 API 연결 (✅ 모두 완료)

- ✅ Axios 인터셉터 설정
- ✅ 로그인/회원가입 API 연결
- ✅ Navbar 인증 상태 관리
- ✅ 프로필 페이지 API 연결
- ✅ 선생님 아이디어 목록 API 연결
- ✅ 학생 아이디어 목록 API 연결
- ✅ 아이디어 상세 페이지 API 연결
- ✅ 댓글/대댓글 작성 API 연결
- ✅ 아이디어 생성 API 연결

## 🎯 Mock 데이터 제거 완료

### 업데이트된 페이지들

1. **components/navbar.tsx**

   - localStorage 키 수정 (`token` → `authToken`)
   - 실시간 로그인 상태 추적
   - pathname 변경 감지

2. **app/profile/page.tsx**

   - Mock 데이터 완전 제거
   - `/api/auth/me` API 호출
   - 로딩 상태 추가
   - 인증 체크 및 리다이렉트

3. **app/ideas/teachers/page.tsx**

   - Mock 데이터 제거
   - `/api/ideas?role=TEACHER` API 호출
   - 로딩 상태 추가
   - Status 값 변환 (OPEN → 모집중)

4. **app/ideas/students/page.tsx**

   - Mock 데이터 제거
   - `/api/ideas?role=STUDENT` API 호출
   - 로딩 상태 추가
   - Status 값 변환

5. **app/ideas/[id]/page.tsx**

   - Mock 데이터 제거
   - `/api/ideas/[id]` API 호출
   - 댓글 작성 API 연결
   - 대댓글 작성 API 연결
   - 좋아요 API 연결
   - 관련 아이디어 표시

6. **app/ideas/new/page.tsx**
   - `/api/ideas` POST 연결
   - 생성 후 상세 페이지로 리다이렉트

## 🚀 시작 방법

### 1. MongoDB 설정

**옵션 A: 로컬 MongoDB**

```bash
# MongoDB 설치 후 실행
mongod
```

**옵션 B: MongoDB Atlas (권장 - 무료)**

1. https://www.mongodb.com/cloud/atlas 에서 무료 클러스터 생성
2. Database Access에서 사용자 생성
3. Network Access에서 IP 추가 (0.0.0.0/0 또는 현재 IP)
4. 연결 문자열 복사

### 2. 환경 변수 설정

`.env.local` 파일을 확인하고 MongoDB URL을 설정하세요:

```env
# 로컬 MongoDB
DATABASE_URL="mongodb://localhost:27017/plz"

# 또는 MongoDB Atlas
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/plz?retryWrites=true&w=majority"

JWT_SECRET="plz-secret-key-change-in-production-2025"
NODE_ENV="development"
```

### 3. Prisma 클라이언트 생성

```bash
npx prisma generate
```

### 4. 개발 서버 실행

```bash
npm run dev
```

서버가 http://localhost:3000 에서 실행됩니다.

## ✅ 테스트 체크리스트

### 인증 플로우

- [ ] 선생님 회원가입 (/signup/teacher)
- [ ] 학생 회원가입 (/signup/student)
- [ ] 로그인 (/login)
- [ ] 프로필 조회 (/profile)
- [ ] 로그아웃 (Navbar 버튼)

### 아이디어 플로우

- [ ] 선생님 아이디어 목록 (/ideas/teachers)
- [ ] 학생 아이디어 목록 (/ideas/students)
- [ ] 아이디어 생성 (/ideas/new)
- [ ] 아이디어 상세 (/ideas/[id])
- [ ] 댓글 작성
- [ ] 대댓글 작성
- [ ] 댓글 좋아요

## 📝 API 테스트

### 회원가입 테스트

**선생님 회원가입:**

```bash
curl -X POST http://localhost:3000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "김철수",
    "email": "teacher@example.com",
    "password": "password123",
    "role": "TEACHER",
    "workPlace": "컴퓨터과학과"
  }'
```

**학생 회원가입:**

```bash
curl -X POST http://localhost:3000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "이영희",
    "email": "student@example.com",
    "password": "password123",
    "role": "STUDENT",
    "studentId": "20240001"
  }'
```

### 로그인 테스트

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "password123"
  }'
```

응답에서 `token`을 복사하여 다음 요청에 사용합니다.

### 아이디어 생성 테스트

```bash
curl -X POST http://localhost:3000/api/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "AI 학습 도우미 개발",
    "description": "학생들의 학습을 돕는 AI 챗봇을 만들고 싶습니다.",
    "category": "교육",
    "tags": ["AI", "교육", "챗봇"],
    "lookingForCollaborators": true
  }'
```

## 🎯 다음 단계 (선택사항)

Phase 4를 구현하려면:

### 프로젝트 참여 API

- `POST /api/ideas/[id]/participate` - 참여 신청
- `PUT /api/participations/[id]` - 참여 승인/거절
- `GET /api/participations/my` - 내 참여 목록

### 추가 기능

- 페이지네이션
- 검색 기능 강화
- 파일 업로드 (프로필 이미지)
- 이메일 인증
- 비밀번호 재설정

## 🐛 문제 해결

### MongoDB 연결 오류

- MongoDB가 실행 중인지 확인
- `.env.local`의 DATABASE_URL이 올바른지 확인
- 방화벽 설정 확인 (MongoDB Atlas 사용 시)

### Prisma 오류

```bash
# Prisma 클라이언트 재생성
npx prisma generate

# 스키마 검증
npx prisma validate
```

### 타입 오류

```bash
# TypeScript 체크
npm run build
```
