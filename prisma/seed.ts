import { PrismaClient, Role, IdeaStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 기존 데이터 삭제 (개발 환경에서만)
  await prisma.ideaParticipation.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.idea.deleteMany();
  await prisma.user.deleteMany();

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. 선생님 사용자 생성
  const teacher1 = await prisma.user.create({
    data: {
      email: "teacher1@plz.com",
      password: hashedPassword,
      name: "김철수",
      role: Role.TEACHER,
      workPlace: "컴퓨터공학과",
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: "teacher2@plz.com",
      password: hashedPassword,
      name: "이영희",
      role: Role.TEACHER,
      workPlace: "소프트웨어학과",
    },
  });

  const teacher3 = await prisma.user.create({
    data: {
      email: "teacher3@plz.com",
      password: hashedPassword,
      name: "박민수",
      role: Role.TEACHER,
      workPlace: "인공지능학과",
    },
  });

  // 2. 학생 사용자 생성
  const student1 = await prisma.user.create({
    data: {
      email: "student1@plz.com",
      password: hashedPassword,
      name: "홍길동",
      role: Role.STUDENT,
      studentId: "20240001",
      major: "컴퓨터공학",
      skills: ["React", "TypeScript", "Node.js"],
      bio: "웹 개발에 관심이 많은 학생입니다.",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: "student2@plz.com",
      password: hashedPassword,
      name: "김영수",
      role: Role.STUDENT,
      studentId: "20240002",
      major: "소프트웨어공학",
      skills: ["Python", "Django", "Machine Learning"],
      bio: "AI와 데이터 과학을 공부하고 있습니다.",
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: "student3@plz.com",
      password: hashedPassword,
      name: "정수현",
      role: Role.STUDENT,
      studentId: "20240003",
      major: "인공지능",
      skills: ["Java", "Spring Boot", "MySQL"],
      bio: "백엔드 개발자를 꿈꾸는 학생입니다.",
    },
  });

  const student4 = await prisma.user.create({
    data: {
      email: "student4@plz.com",
      password: hashedPassword,
      name: "최지은",
      role: Role.STUDENT,
      studentId: "20240004",
      major: "컴퓨터공학",
      skills: ["React Native", "Flutter", "Firebase"],
      bio: "모바일 앱 개발에 열정이 있습니다.",
    },
  });

  console.log("✅ Users created");

  // 3. 선생님 아이디어 생성
  const teacherIdea1 = await prisma.idea.create({
    data: {
      title: "AI 기반 학습 도우미 개발",
      description: `학생들의 학습을 돕는 AI 챗봇을 개발하고 싶습니다.
      
주요 기능:
- 질문에 대한 자동 답변
- 학습 진도 추적
- 맞춤형 학습 자료 추천
- 퀴즈 자동 생성

이 프로젝트를 통해 학생들이 더 효율적으로 학습할 수 있는 환경을 만들고자 합니다.`,
      category: "교육",
      tags: ["AI", "교육", "챗봇", "NLP"],
      status: IdeaStatus.OPEN,
      authorId: teacher1.id,
      authorRole: Role.TEACHER,
      lookingForCollaborators: true,
    },
  });

  const teacherIdea2 = await prisma.idea.create({
    data: {
      title: "스마트 캠퍼스 관리 시스템",
      description: `대학 캠퍼스의 다양한 시설을 효율적으로 관리하는 시스템입니다.

기능:
- 강의실 예약 시스템
- 시설 유지보수 관리
- 에너지 사용량 모니터링
- 실시간 알림 서비스

IoT 센서와 클라우드 기술을 활용하여 캠퍼스를 스마트하게 관리할 수 있습니다.`,
      category: "시스템",
      tags: ["IoT", "클라우드", "관리시스템"],
      status: IdeaStatus.OPEN,
      authorId: teacher2.id,
      authorRole: Role.TEACHER,
      lookingForCollaborators: true,
    },
  });

  const teacherIdea3 = await prisma.idea.create({
    data: {
      title: "온라인 코딩 교육 플랫폼",
      description: `초보자를 위한 인터랙티브 코딩 교육 플랫폼을 만들고자 합니다.

특징:
- 단계별 코딩 튜토리얼
- 실시간 코드 실행 환경
- AI 코드 리뷰 기능
- 학습 진도 시각화

프로그래밍을 처음 접하는 학생들이 쉽게 배울 수 있는 환경을 제공합니다.`,
      category: "교육",
      tags: ["교육", "코딩", "플랫폼", "Web"],
      status: IdeaStatus.IN_PROGRESS,
      authorId: teacher3.id,
      authorRole: Role.TEACHER,
      lookingForCollaborators: true,
    },
  });

  const teacherIdea4 = await prisma.idea.create({
    data: {
      title: "연구 논문 관리 및 협업 도구",
      description: `연구자들을 위한 논문 관리 및 협업 플랫폼입니다.

기능:
- 논문 자동 분류 및 태깅
- 참고문헌 자동 생성
- 연구팀 협업 기능
- 논문 리뷰 시스템

연구 효율성을 높이고 협업을 촉진하는 도구입니다.`,
      category: "연구",
      tags: ["연구", "협업", "논문관리"],
      status: IdeaStatus.OPEN,
      authorId: teacher1.id,
      authorRole: Role.TEACHER,
      lookingForCollaborators: true,
    },
  });

  const teacherIdea5 = await prisma.idea.create({
    data: {
      title: "가상현실 기반 실험실 시뮬레이션",
      description: `위험한 화학 실험을 VR로 안전하게 체험할 수 있는 시뮬레이션입니다.

목표:
- 실제와 같은 실험 환경 구현
- 안전 교육 강화
- 실험 비용 절감
- 반복 학습 가능

VR 기술을 활용하여 학생들이 안전하게 실험을 연습할 수 있습니다.`,
      category: "교육",
      tags: ["VR", "시뮬레이션", "안전", "교육"],
      status: IdeaStatus.COMPLETED,
      authorId: teacher2.id,
      authorRole: Role.TEACHER,
      lookingForCollaborators: false,
    },
  });

  console.log("✅ Teacher ideas created");

  // 4. 학생 아이디어 생성
  const studentIdea1 = await prisma.idea.create({
    data: {
      title: "대학생을 위한 시간표 최적화 앱",
      description: `수강신청을 도와주는 시간표 최적화 애플리케이션입니다.

기능:
- 공강시간 최소화
- 원하는 시간대 우선 배치
- 학점 분산 최적화
- 졸업요건 자동 체크

알고리즘을 활용하여 최적의 시간표를 자동으로 생성합니다.`,
      category: "앱",
      tags: ["모바일", "최적화", "알고리즘"],
      status: IdeaStatus.OPEN,
      authorId: student1.id,
      authorRole: Role.STUDENT,
      lookingForCollaborators: true,
    },
  });

  const studentIdea2 = await prisma.idea.create({
    data: {
      title: "캠퍼스 중고거래 플랫폼",
      description: `학생들 간의 안전한 중고거래를 돕는 플랫폼입니다.

특징:
- 학교 인증 시스템
- 거래 평점 시스템
- 실시간 채팅
- 안전 거래 가이드

교내에서만 사용 가능한 신뢰도 높은 거래 플랫폼을 만들고자 합니다.`,
      category: "서비스",
      tags: ["플랫폼", "거래", "커뮤니티"],
      status: IdeaStatus.OPEN,
      authorId: student2.id,
      authorRole: Role.STUDENT,
      lookingForCollaborators: true,
    },
  });

  const studentIdea3 = await prisma.idea.create({
    data: {
      title: "스터디 그룹 매칭 서비스",
      description: `같은 과목을 듣는 학생들을 자동으로 매칭해주는 서비스입니다.

기능:
- 학습 스타일 분석
- 시간대 자동 매칭
- 스터디 일정 관리
- 학습 자료 공유

혼자 공부하기 어려운 학생들에게 최적의 스터디 파트너를 찾아줍니다.`,
      category: "교육",
      tags: ["교육", "매칭", "스터디", "커뮤니티"],
      status: IdeaStatus.IN_PROGRESS,
      authorId: student3.id,
      authorRole: Role.STUDENT,
      lookingForCollaborators: true,
    },
  });

  const studentIdea4 = await prisma.idea.create({
    data: {
      title: "학식 메뉴 추천 및 리뷰 앱",
      description: `학생 식당의 메뉴를 추천하고 리뷰를 공유하는 앱입니다.

기능:
- 오늘의 메뉴 확인
- 메뉴별 평점 및 리뷰
- 개인 맞춤 추천
- 혼잡도 정보 제공

학생들이 더 나은 식사 선택을 할 수 있도록 돕습니다.`,
      category: "앱",
      tags: ["모바일", "리뷰", "추천시스템"],
      status: IdeaStatus.OPEN,
      authorId: student4.id,
      authorRole: Role.STUDENT,
      lookingForCollaborators: true,
    },
  });

  const studentIdea5 = await prisma.idea.create({
    data: {
      title: "취업 준비생을 위한 포트폴리오 빌더",
      description: `개발자 취업을 준비하는 학생들을 위한 포트폴리오 제작 도구입니다.

특징:
- 드래그 앤 드롭 UI
- 다양한 템플릿 제공
- GitHub 연동
- PDF 내보내기

누구나 쉽게 전문적인 포트폴리오를 만들 수 있습니다.`,
      category: "서비스",
      tags: ["취업", "포트폴리오", "Web"],
      status: IdeaStatus.OPEN,
      authorId: student1.id,
      authorRole: Role.STUDENT,
      lookingForCollaborators: true,
    },
  });

  const studentIdea6 = await prisma.idea.create({
    data: {
      title: "운동 메이트 찾기 서비스",
      description: `같이 운동할 친구를 찾아주는 매칭 서비스입니다.

기능:
- 운동 종목별 매칭
- 실력 레벨 구분
- 일정 조율 기능
- 운동 기록 공유

건강한 대학 생활을 위해 함께 운동할 메이트를 찾아드립니다.`,
      category: "건강",
      tags: ["운동", "매칭", "건강", "커뮤니티"],
      status: IdeaStatus.OPEN,
      authorId: student2.id,
      authorRole: Role.STUDENT,
      lookingForCollaborators: true,
    },
  });

  console.log("✅ Student ideas created");

  // 5. 댓글 생성 (일부 아이디어에)
  await prisma.comment.create({
    data: {
      content: "정말 좋은 아이디어네요! 백엔드 개발에 참여하고 싶습니다.",
      authorId: student3.id,
      ideaId: teacherIdea1.id,
      likes: 5,
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      content: "React로 프론트엔드 개발 도와드릴 수 있습니다.",
      authorId: student1.id,
      ideaId: teacherIdea1.id,
      likes: 3,
    },
  });

  // 대댓글
  await prisma.comment.create({
    data: {
      content: "감사합니다! 함께 협업해요 :)",
      authorId: teacher1.id,
      ideaId: teacherIdea1.id,
      parentId: comment1.id,
      likes: 1,
    },
  });

  await prisma.comment.create({
    data: {
      content: "IoT 센서 부분은 제가 경험이 있어서 도움드릴 수 있습니다.",
      authorId: student2.id,
      ideaId: teacherIdea2.id,
      likes: 2,
    },
  });

  await prisma.comment.create({
    data: {
      content: "디자이너도 필요하신가요? UI/UX 작업 도와드릴게요!",
      authorId: student4.id,
      ideaId: studentIdea1.id,
      likes: 4,
    },
  });

  console.log("✅ Comments created");

  // 6. 프로젝트 참여 신청
  await prisma.ideaParticipation.create({
    data: {
      studentId: student1.id,
      ideaId: teacherIdea1.id,
      role: "프론트엔드 개발자",
      status: "APPROVED",
    },
  });

  await prisma.ideaParticipation.create({
    data: {
      studentId: student3.id,
      ideaId: teacherIdea1.id,
      role: "백엔드 개발자",
      status: "PENDING",
    },
  });

  await prisma.ideaParticipation.create({
    data: {
      studentId: student2.id,
      ideaId: teacherIdea2.id,
      role: "IoT 개발자",
      status: "APPROVED",
    },
  });

  console.log("✅ Participations created");

  console.log("🎉 Seeding completed successfully!");
  console.log("\n📊 Created:");
  console.log("- 7 Users (3 Teachers, 4 Students)");
  console.log("- 11 Ideas (5 Teacher ideas, 6 Student ideas)");
  console.log("- 5 Comments (including 1 reply)");
  console.log("- 3 Participations");
  console.log("\n🔑 Test accounts (password: password123):");
  console.log("Teachers: teacher1@plz.com, teacher2@plz.com, teacher3@plz.com");
  console.log(
    "Students: student1@plz.com, student2@plz.com, student3@plz.com, student4@plz.com"
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
