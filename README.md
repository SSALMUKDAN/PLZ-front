# PLZ (Project Learning Zone) - 백엔드 개발 명세서

## 🎯 프로젝트 개요

PLZ는 선생님과 학생이 프로젝트 아이디어를 공유하고 협업할 수 있는 플랫폼입니다.

- **선생님**은 학교에 필요한 서비스 아이디어를 제안하고 학생들의 참여를 받습니다
- **학생**은 자신의 프로젝트 아이디어를 제안하거나 선생님의 아이디어에 참여할 수 있습니다
- 아이디어 내에서 **댓글과 대댓글**을 통해 지속적인 소통이 가능합니다

## 🏗️ 기술 스택

### 프론트엔드

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

### 백엔드 (구현 필요)

- **Framework**: Next.js API Routes
- **Database**: MongoDB
- **ORM**: Prisma
- **Environment Variables**: dotenv

## 📊 도메인 모델

### 1. User (사용자)

사용자는 선생님(TEACHER)과 학생(STUDENT) 두 가지 역할로 나뉩니다.

**핵심 속성:**

- 고유 식별자 (id)
- 이름 (name)
- 이메일 (email) - 로그인 및 계정 식별에 사용
- 비밀번호 (password) - 암호화 저장 필요
- 역할 (role: TEACHER | STUDENT)
- 생성일시 (createdAt)

**역할별 추가 속성:**

- **선생님 (TEACHER)**
  - 담당부서/과목 (workPlace) - 선택사항
- **학생 (STUDENT)**
  - 학번 (studentId) - 필수
  - 전공/관심분야 (major) - 프로필용
  - 기술스택 (skills) - 배열 형태
  - 자기소개 (bio)

**비즈니스 규칙:**

- 이메일은 유일해야 합니다 (중복 불가)
- 회원가입 시 역할을 반드시 선택해야 합니다
- 비밀번호는 해시화하여 저장해야 합니다

### 2. Idea (아이디어/프로젝트)

선생님과 학생이 제안하는 프로젝트 아이디어입니다.

**핵심 속성:**

- 고유 식별자 (id)
- 제목 (title)
- 설명 (description) - 상세한 프로젝트 설명
- 카테고리 (category) - 프로젝트 분류
- 태그 (tags) - 배열 형태, 키워드 검색용
- 상태 (status: 모집중 | 진행중 | 완료)
- 작성자 정보 (authorId, authorName, authorRole)
- 협업자 모집 여부 (lookingForCollaborators)
- 생성일시 (createdAt)
- 수정일시 (updatedAt)

**Mock 데이터에서 확인된 태그 예시:**

- 선생님 아이디어: 생물, 환경, 커뮤니티, 역사, 현장학습, 교육, 수학, 워크숍, 코딩, 커리큘럼 등
- 학생 아이디어: AI, 공학, VR, 보건, 모바일, 데이터, 소프트웨어, 문학, 웹, 심리, 챗봇 등

**비즈니스 규칙:**

- 로그인한 사용자만 아이디어를 생성할 수 있습니다
- 아이디어는 작성자만 수정/삭제할 수 있습니다
- 상태는 작성자가 프로젝트 진행 상황에 따라 변경할 수 있습니다
- 태그는 최소 1개 이상 필요합니다

### 3. Comment (댓글)

아이디어에 대한 댓글과 대댓글을 관리합니다.

**핵심 속성:**

- 고유 식별자 (id)
- 내용 (content)
- 작성자 정보 (authorId, authorName, authorRole, authorAvatar)
- 아이디어 참조 (ideaId)
- 부모 댓글 참조 (parentId) - 대댓글인 경우
- 좋아요 수 (likes)
- 생성일시 (createdAt)

**비즈니스 규칙:**

- 로그인한 사용자만 댓글을 작성할 수 있습니다
- 댓글은 작성자만 수정/삭제할 수 있습니다
- 대댓글은 부모 댓글(parentId)을 참조합니다
- 대댓글에는 더 이상 대댓글을 달 수 없습니다 (1단계 깊이만 허용)

### 4. IdeaParticipation (프로젝트 참여)

학생이 아이디어에 참여하는 관계를 관리합니다.

**핵심 속성:**

- 고유 식별자 (id)
- 학생 정보 (studentId)
- 아이디어 정보 (ideaId)
- 참여 역할 (role) - 예: 프론트엔드 개발자, 백엔드 개발자 등
- 참여 상태 (status: 신청 | 승인 | 거절)
- 참여일시 (createdAt)

**비즈니스 규칙:**

- 학생만 프로젝트에 참여 신청할 수 있습니다
- 아이디어 작성자가 참여 요청을 승인/거절할 수 있습니다
- 한 학생은 동일한 아이디어에 중복 참여할 수 없습니다

## 🔄 핵심 서비스 기능

### 1. 인증 (Authentication) 서비스

**회원가입 (Signup)**

- 선생님과 학생 각각의 회원가입 처리
- 역할별 필수 정보 검증
- 이메일 중복 확인
- 비밀번호 암호화

**로그인 (Login)**

- 이메일/비밀번호 기반 인증
- JWT 또는 세션 기반 토큰 발급
- 인증 토큰을 클라이언트에 반환

**인증 상태 확인**

- 보호된 API 엔드포인트 접근 시 토큰 검증
- 사용자 정보 조회

### 2. 사용자 (User) 서비스

**프로필 조회**

- 사용자 기본 정보 조회
- 제안한 프로젝트 목록 조회
- 참여중인 프로젝트 목록 조회 (학생)

**프로필 수정**

- 사용자 정보 업데이트
- 기술스택, 소개 등 수정

### 3. 아이디어 (Idea) 서비스

**아이디어 목록 조회**

- 전체 아이디어 목록 조회
- 역할별 필터링 (선생님/학생 아이디어)
- 상태별 필터링 (모집중/진행중/완료)
- 정렬 (최신순/인기순 - 댓글 수 기준)
- 카테고리별 필터링
- 태그 기반 검색

**아이디어 상세 조회**

- 아이디어 전체 정보 조회
- 작성자 정보 포함
- 댓글 목록 포함
- 관련 아이디어 추천 (같은 태그/카테고리)

**아이디어 생성**

- 로그인한 사용자만 가능
- 제목, 설명, 카테고리, 태그 필수
- 작성자 정보 자동 설정

**아이디어 수정**

- 작성자만 가능
- 제목, 설명, 태그, 상태 등 수정

**아이디어 삭제**

- 작성자만 가능
- 관련 댓글도 함께 삭제 (Cascade)

### 4. 댓글 (Comment) 서비스

**댓글 목록 조회**

- 특정 아이디어의 댓글 조회
- 대댓글 포함하여 계층 구조로 반환

**댓글 생성**

- 로그인한 사용자만 가능
- 아이디어에 대한 댓글 작성
- 대댓글 작성 (parentId 지정)

**댓글 수정**

- 작성자만 가능
- 내용 수정

**댓글 삭제**

- 작성자만 가능
- 대댓글이 있는 경우 함께 삭제 (Cascade) 또는 "삭제된 댓글" 표시

**좋아요 기능**

- 댓글 좋아요 수 증가/감소

### 5. 프로젝트 참여 (IdeaParticipation) 서비스

**참여 신청**

- 학생만 가능
- 아이디어에 참여 신청
- 역할 및 이유 작성

**참여 요청 관리**

- 아이디어 작성자가 승인/거절
- 참여 목록 조회

**내 참여 프로젝트 조회**

- 학생의 참여중인 프로젝트 목록

## 📁 데이터베이스 스키마 (Prisma Schema)

```prisma
// This is your Prisma schema file

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

enum Role {
  TEACHER
  STUDENT
}

enum IdeaStatus {
  OPEN       // 모집중
  IN_PROGRESS // 진행중
  COMPLETED  // 완료
}

enum ParticipationStatus {
  PENDING   // 신청
  APPROVED  // 승인
  REJECTED  // 거절
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String
  name      String
  role      Role

  // 선생님 전용 필드
  workPlace String?

  // 학생 전용 필드
  studentId String?
  major     String?
  skills    String[]
  bio       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  ideas          Idea[]
  comments       Comment[]
  participations IdeaParticipation[]
}

model Idea {
  id          String      @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  category    String
  tags        String[]
  status      IdeaStatus  @default(OPEN)

  authorId    String      @db.ObjectId
  author      User        @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorRole  Role

  lookingForCollaborators Boolean @default(true)

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  // Relations
  comments       Comment[]
  participations IdeaParticipation[]
}

model Comment {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  content   String

  authorId  String   @db.ObjectId
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  ideaId    String   @db.ObjectId
  idea      Idea     @relation(fields: [ideaId], references: [id], onDelete: Cascade)

  // 대댓글을 위한 자기 참조
  parentId  String?  @db.ObjectId
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  replies   Comment[] @relation("CommentReplies")

  likes     Int      @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model IdeaParticipation {
  id        String              @id @default(auto()) @map("_id") @db.ObjectId

  studentId String              @db.ObjectId
  student   User                @relation(fields: [studentId], references: [id], onDelete: Cascade)

  ideaId    String              @db.ObjectId
  idea      Idea                @relation(fields: [ideaId], references: [id], onDelete: Cascade)

  role      String              // 참여 역할 (예: 프론트엔드 개발자)
  status    ParticipationStatus @default(PENDING)

  createdAt DateTime            @default(now())
  updatedAt DateTime            @updatedAt

  // 한 학생은 같은 아이디어에 중복 참여 불가
  @@unique([studentId, ideaId])
}
```

## 🌐 API 엔드포인트 구조

### Authentication

- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보 조회

### User

- `POST /api/user/signup` - 회원가입
- `GET /api/user/profile` - 프로필 조회
- `PUT /api/user/profile` - 프로필 수정
- `GET /api/user/[id]/ideas` - 특정 사용자의 아이디어 목록
- `GET /api/user/[id]/participations` - 특정 사용자의 참여 프로젝트 (학생)

### Idea

- `GET /api/ideas` - 아이디어 목록 조회 (필터링/정렬 지원)
- `GET /api/ideas/[id]` - 아이디어 상세 조회
- `POST /api/ideas` - 아이디어 생성
- `PUT /api/ideas/[id]` - 아이디어 수정
- `DELETE /api/ideas/[id]` - 아이디어 삭제

### Comment

- `GET /api/ideas/[id]/comments` - 특정 아이디어의 댓글 목록
- `POST /api/ideas/[id]/comments` - 댓글 생성
- `PUT /api/comments/[id]` - 댓글 수정
- `DELETE /api/comments/[id]` - 댓글 삭제
- `POST /api/comments/[id]/like` - 댓글 좋아요

### Participation

- `POST /api/ideas/[id]/participate` - 프로젝트 참여 신청
- `PUT /api/participations/[id]` - 참여 요청 승인/거절
- `GET /api/participations/my` - 내 참여 목록

## 🔐 인증 및 권한

### 인증 방식

- JWT 토큰 기반 인증 추천
- 토큰은 localStorage에 저장 (프론트엔드)
- API 요청 시 Authorization 헤더에 토큰 포함

### 권한 규칙

- **공개 접근**: 아이디어 목록 조회, 아이디어 상세 조회
- **로그인 필요**: 아이디어 생성, 댓글 작성, 프로젝트 참여
- **작성자만**: 아이디어 수정/삭제, 댓글 수정/삭제
- **학생만**: 프로젝트 참여 신청
- **아이디어 작성자만**: 참여 요청 승인/거절

## 📦 환경 설정

### 환경 변수 (.env)

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/plz?retryWrites=true&w=majority"

# JWT Secret
JWT_SECRET="your-secret-key-here"

# Application
NODE_ENV="development"
```

### 필수 패키지 설치

```bash
# Prisma 및 MongoDB 클라이언트
npm install prisma @prisma/client

# 환경 변수 관리
npm install dotenv

# 비밀번호 암호화
npm install bcryptjs
npm install -D @types/bcryptjs

# JWT 인증
npm install jsonwebtoken
npm install -D @types/jsonwebtoken
```

## 🚀 개발 시작 가이드

### 1. Prisma 초기화

```bash
# Prisma 초기화
npx prisma init

# Prisma 스키마를 기반으로 MongoDB 동기화
npx prisma generate

# (선택) Prisma Studio로 데이터 확인
npx prisma studio
```

### 2. 데이터베이스 연결 테스트

```typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 3. API Route 예시 구조

```
app/
  api/
    auth/
      login/
        route.ts
      logout/
        route.ts
      me/
        route.ts
    user/
      signup/
        route.ts
      profile/
        route.ts
    ideas/
      route.ts           # GET (목록), POST (생성)
      [id]/
        route.ts         # GET (상세), PUT (수정), DELETE (삭제)
        comments/
          route.ts       # GET (댓글 목록), POST (댓글 생성)
        participate/
          route.ts       # POST (참여 신청)
    comments/
      [id]/
        route.ts         # PUT (수정), DELETE (삭제)
        like/
          route.ts       # POST (좋아요)
```

## 📝 구현 우선순위

### Phase 1: 기본 인증 및 사용자 관리

1. 회원가입 (선생님/학생)
2. 로그인/로그아웃
3. 사용자 정보 조회

### Phase 2: 아이디어 CRUD

1. 아이디어 목록 조회 (필터링/정렬)
2. 아이디어 상세 조회
3. 아이디어 생성
4. 아이디어 수정/삭제

### Phase 3: 댓글 시스템

1. 댓글 조회 (계층 구조)
2. 댓글 생성 (일반 댓글)
3. 대댓글 생성
4. 댓글 수정/삭제
5. 좋아요 기능

### Phase 4: 프로젝트 참여 관리

1. 참여 신청
2. 참여 요청 승인/거절
3. 참여 프로젝트 목록 조회

## 💡 추가 고려사항

### 성능 최적화

- MongoDB 인덱스 설정 (email, ideaId, authorId 등)
- 페이지네이션 구현 (아이디어 목록)
- 캐싱 전략 (인기 아이디어, 사용자 정보)

### 보안

- CORS 설정
- Rate Limiting
- XSS 방지
- SQL Injection 방지 (Prisma가 자동 처리)
- 민감 정보 로깅 방지

### 데이터 검증

- Zod 또는 Joi를 사용한 요청 데이터 검증
- 프론트엔드와 백엔드 모두에서 검증

### 에러 처리

- 일관된 에러 응답 형식
- 적절한 HTTP 상태 코드 사용
- 에러 로깅 및 모니터링

## 📚 참고 자료

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma with MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [JWT Authentication](https://jwt.io/)

---

**작성일**: 2025년 12월 17일  
**프로젝트**: PLZ (Project Learning Zone)  
**버전**: 1.0
