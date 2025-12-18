# 인증 상태 관리 수정 완료

## 🔧 수정된 파일

### 1. components/navbar.tsx

- ✅ `localStorage.getItem('token')` → `localStorage.getItem('authToken')` 수정
- ✅ pathname 변경 시 로그인 상태 재확인
- ✅ storage 이벤트 리스너 추가 (다른 탭에서 로그인/로그아웃 감지)

### 2. app/profile/page.tsx

- ✅ Mock 데이터 제거
- ✅ `/api/auth/me` API 호출로 실제 사용자 정보 조회
- ✅ 로그인되지 않은 경우 `/login`으로 리다이렉트
- ✅ 로딩 상태 추가
- ✅ 사용자 역할(TEACHER/STUDENT)에 따른 UI 분기 처리
- ✅ `localStorage.removeItem('token')` → `localStorage.removeItem('authToken')` 수정

## ✅ 해결된 문제

1. **로그인하지 않았는데 프로필 버튼이 표시되던 문제**

   - localStorage 키 불일치 수정 (`token` → `authToken`)
   - Navbar에서 실시간으로 로그인 상태 추적

2. **프로필 페이지 Mock 데이터**
   - 실제 API에서 사용자 정보를 가져오도록 수정
   - 인증되지 않은 사용자는 로그인 페이지로 리다이렉트

## 🎯 동작 방식

### 로그인 전

- Navbar: "로그인" 버튼과 "회원가입" 버튼 표시
- `/profile` 접근 시 → `/login`으로 자동 리다이렉트

### 로그인 후

- Navbar: "프로필" 아이콘과 텍스트 표시
- `/profile` 접근 시 → 실제 사용자 정보 표시
- 로그아웃 시 localStorage에서 토큰 제거하고 홈으로 이동

## 📝 추가 개선 사항 (선택)

현재 프로필 페이지에서 프로젝트 목록은 빈 배열로 되어 있습니다.
추후 다음 API를 구현하면 실제 데이터를 표시할 수 있습니다:

```typescript
// 내가 제안한 아이디어 목록
GET /api/ideas?authorId={userId}

// 내가 참여중인 프로젝트 (학생만)
GET /api/participations/my
```
