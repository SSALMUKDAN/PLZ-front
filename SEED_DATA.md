# Mock 데이터 생성 가이드

## 📦 생성되는 데이터

### 사용자 (Users)

**선생님 3명:**

- teacher1@plz.com - 김철수 (컴퓨터공학과)
- teacher2@plz.com - 이영희 (소프트웨어학과)
- teacher3@plz.com - 박민수 (인공지능학과)

**학생 4명:**

- student1@plz.com - 홍길동 (컴퓨터공학, React/TypeScript/Node.js)
- student2@plz.com - 김영수 (소프트웨어공학, Python/Django/ML)
- student3@plz.com - 정수현 (인공지능, Java/Spring Boot/MySQL)
- student4@plz.com - 최지은 (컴퓨터공학, React Native/Flutter/Firebase)

**모든 계정 비밀번호:** `password123`

### 아이디어 (Ideas)

**선생님 아이디어 (5개):**

1. AI 기반 학습 도우미 개발 (모집중)
2. 스마트 캠퍼스 관리 시스템 (모집중)
3. 온라인 코딩 교육 플랫폼 (진행중)
4. 연구 논문 관리 및 협업 도구 (모집중)
5. 가상현실 기반 실험실 시뮬레이션 (완료)

**학생 아이디어 (6개):**

1. 대학생을 위한 시간표 최적화 앱 (모집중)
2. 캠퍼스 중고거래 플랫폼 (모집중)
3. 스터디 그룹 매칭 서비스 (진행중)
4. 학식 메뉴 추천 및 리뷰 앱 (모집중)
5. 취업 준비생을 위한 포트폴리오 빌더 (모집중)
6. 운동 메이트 찾기 서비스 (모집중)

### 댓글 (Comments)

- AI 학습 도우미 프로젝트에 3개 댓글 (1개 대댓글 포함)
- 스마트 캠퍼스에 1개 댓글
- 시간표 최적화 앱에 1개 댓글

### 프로젝트 참여 (Participations)

- 학생1 → AI 학습 도우미 (프론트엔드 개발자, 승인됨)
- 학생3 → AI 학습 도우미 (백엔드 개발자, 대기중)
- 학생2 → 스마트 캠퍼스 (IoT 개발자, 승인됨)

## 🚀 사용 방법

### 1. tsx 패키지 설치 (처음 한 번만)

```bash
npm install -D tsx
```

### 2. 데이터베이스 초기화 및 Seed 실행

```bash
# Prisma 클라이언트 생성
npx prisma generate

# Mock 데이터 삽입
npm run db:seed
```

또는 Prisma 명령어로:

```bash
npx prisma db seed
```

### 3. 데이터 확인

```bash
# Prisma Studio 실행 (데이터베이스 GUI)
npx prisma studio
```

브라우저에서 http://localhost:5555 로 접속하여 데이터를 확인할 수 있습니다.

## 📊 데이터 초기화

Seed 스크립트는 실행 시 기존 데이터를 **모두 삭제**하고 새로운 데이터를 삽입합니다.
따라서 주의해서 사용하세요!

```typescript
// seed.ts 파일 내부
await prisma.ideaParticipation.deleteMany();
await prisma.comment.deleteMany();
await prisma.idea.deleteMany();
await prisma.user.deleteMany();
```

## 🧪 테스트 시나리오

### 1. 로그인 테스트

```bash
# 선생님으로 로그인
이메일: teacher1@plz.com
비밀번호: password123

# 학생으로 로그인
이메일: student1@plz.com
비밀번호: password123
```

### 2. 아이디어 목록 확인

- `/ideas/teachers` - 선생님이 올린 프로젝트 5개 확인
- `/ideas/students` - 학생이 올린 프로젝트 6개 확인

### 3. 아이디어 상세 페이지

- "AI 기반 학습 도우미" 아이디어 클릭
- 댓글 3개 확인 (1개는 대댓글)
- 참여자 2명 확인

### 4. 댓글 작성

- 로그인 후 아이디어 상세 페이지에서 댓글 작성
- 대댓글 작성 테스트

### 5. 프로필 확인

- `/profile` 페이지에서 사용자 정보 확인
- 선생님/학생별로 다른 정보 표시 확인

## 🔧 커스터마이징

`prisma/seed.ts` 파일을 수정하여 원하는 Mock 데이터를 추가하거나 변경할 수 있습니다.

### 새로운 아이디어 추가 예시:

```typescript
const newIdea = await prisma.idea.create({
  data: {
    title: "새로운 프로젝트",
    description: "프로젝트 설명",
    category: "카테고리",
    tags: ["태그1", "태그2"],
    status: IdeaStatus.OPEN,
    authorId: teacher1.id,
    authorRole: Role.TEACHER,
    lookingForCollaborators: true,
  },
});
```

## 📝 데이터 구조

### User

- id, email, password, name, role
- 선생님: workPlace
- 학생: studentId, major, skills[], bio

### Idea

- id, title, description, category, tags[]
- status (OPEN/IN_PROGRESS/COMPLETED)
- authorId, authorRole
- lookingForCollaborators

### Comment

- id, content, authorId, ideaId
- parentId (대댓글용)
- likes

### IdeaParticipation

- id, studentId, ideaId, role
- status (PENDING/APPROVED/REJECTED)

## ⚠️ 주의사항

1. **프로덕션 환경에서는 사용하지 마세요!**

   - 이 seed 스크립트는 개발/테스트용입니다.
   - 모든 기존 데이터를 삭제합니다.

2. **MongoDB 연결 확인**

   - `.env.local` 파일의 DATABASE_URL이 올바른지 확인하세요.

3. **bcryptjs 의존성**
   - 비밀번호 해싱을 위해 bcryptjs가 필요합니다.
   - 이미 설치되어 있어야 합니다.

## 🐛 문제 해결

### "Cannot find module 'tsx'"

```bash
npm install -D tsx
```

### "Cannot find module '@prisma/client'"

```bash
npx prisma generate
```

### "Error: P1001: Can't reach database server"

- MongoDB가 실행 중인지 확인
- `.env.local`의 DATABASE_URL 확인
- MongoDB Atlas 사용 시 IP 화이트리스트 확인

### 타입 오류

```bash
# Prisma 클라이언트 재생성
npx prisma generate

# TypeScript 체크
npm run build
```
