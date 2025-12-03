'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Home, User, Bell, Filter, MessageSquare, ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/navbar';

// 변경: 학생 프로젝트 목업을 한국어로 번역하고 항목 추가
const studentProjects = [
  {
    id: 12,
    title: '스마트 분리수거 AI',
    description:
      '카메라와 AI를 활용해 재활용품을 자동 분류하는 시스템 개발. 머신러닝과 환경 과학에 대해 조언해주실 선생님을 찾습니다.',
    tags: ['AI', '환경', '공학'],
    comments: 18,
    status: '모집중',
    author: '김수현',
    postedDate: '3일 전',
  },
  {
    id: 11,
    title: 'VR 역사 체험관',
    description: '역사적 사건을 VR로 재현하는 체험 플랫폼 제작. 역사 지식 검증과 교육적 맥락을 제공해주실 선생님 필요.',
    tags: ['VR', '역사', '기술'],
    comments: 24,
    status: '진행중',
    author: '이민지',
    postedDate: '1주 전',
  },
  {
    id: 10,
    title: '커뮤니티 건강 추적 앱',
    description:
      '지역 사회의 건강 지표를 기록하고 시각화하는 모바일 앱. 보건 관련 지표 선정에 도움될 선생님을 찾습니다.',
    tags: ['보건', '모바일', '데이터'],
    comments: 9,
    status: '모집중',
    author: '박준호',
    postedDate: '2일 전',
  },
  {
    id: 9,
    title: '도시 텃밭 설계 도구',
    description: '도시민이 효율적으로 텃밭을 설계할 수 있는 웹 툴 개발. 식물학 관련 자문 가능한 선생님 필요.',
    tags: ['생물', '소프트웨어', '커뮤니티'],
    comments: 15,
    status: '진행중',
    author: '최지은',
    postedDate: '5일 전',
  },
  {
    id: 8,
    title: '시 감상 인터랙티브 플랫폼',
    description: '시를 분석하고 토론할 수 있는 상호작용형 웹 플랫폼. 문학(국어) 지도 가능한 선생님 찾습니다.',
    tags: ['문학', '웹', '교육'],
    comments: 21,
    status: '완료',
    author: '한민석',
    postedDate: '3주 전',
  },
  {
    id: 7,
    title: '교내 에너지 모니터링 시스템',
    description: '학교 건물의 전력 사용을 모니터링하고 절약 제안을 제시하는 시스템. 물리/전기 관련 선생님 필요.',
    tags: ['에너지', 'IoT', '환경'],
    comments: 12,
    status: '모집중',
    author: '오정민',
    postedDate: '1일 전',
  },
  {
    id: 6,
    title: '학생 심리 지원 챗봇',
    description: '심리 검사 기반의 지원 챗봇 개발. 심리학 또는 상담 관련 자문 가능한 선생님을 찾고 있습니다.',
    tags: ['심리', '챗봇', '복지'],
    comments: 30,
    status: '진행중',
    author: '권태우',
    postedDate: '6일 전',
  },
  {
    id: 5,
    title: '전자 쓰레기 업사이클 프로젝트',
    description: '버려지는 전자부품을 활용해 예술/실용품을 만드는 커뮤니티 프로젝트. 기술 지도 가능 선생님 환영.',
    tags: ['공학', '업사이클', '커뮤니티'],
    comments: 7,
    status: '모집중',
    author: '심지우',
    postedDate: '4일 전',
  },
  {
    id: 4,
    title: '코딩 기초 온라인 수업 플랫폼',
    description: '초중학생 대상의 코딩 입문 강의 플랫폼. 수업 커리큘럼 검토 가능한 선생님을 찾습니다.',
    tags: ['교육', '웹', '코딩'],
    comments: 19,
    status: '완료',
    author: '이서윤',
    postedDate: '2달 전',
  },
  {
    id: 3,
    title: '지역 데이터 기반 재난 대응 지도',
    description: '지역별 데이터를 종합해 재난 발생 시 대응 우선순위를 시각화하는 도구. 지리/사회 관련 자문자 필요.',
    tags: ['데이터', '사회', 'GIS'],
    comments: 5,
    status: '진행중',
    author: '백승호',
    postedDate: '8일 전',
  },
  {
    id: 2,
    title: '음악으로 배우는 언어 학습 앱',
    description: '노래 가사 기반으로 외국어를 익히는 모바일 앱. 언어 교육 교사와 협업 희망.',
    tags: ['음악', '언어', '모바일'],
    comments: 14,
    status: '모집중',
    author: '정예린',
    postedDate: '12시간 전',
  },
  {
    id: 1,
    title: '학교 박물관 디지털 아카이브',
    description:
      '학교에 남아있는 유물과 자료를 디지털로 보존하고 전시하는 아카이브 제작. 역사/도서관학 관련 선생님 환영.',
    tags: ['아카이브', '역사', '디지털'],
    comments: 3,
    status: '완료',
    author: '류하늘',
    postedDate: '1달 전',
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  // 상태별로 배지에 적용할 추가 클래스
  const base = 'whitespace-nowrap px-2 py-1 rounded-full text-sm font-medium';
  let statusClasses = 'bg-slate-100 text-slate-700 border border-slate-200';

  switch (status) {
    case '모집중':
      statusClasses = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      break;
    case '진행중':
      statusClasses = 'bg-blue-100 text-blue-800 border-blue-200';
      break;
    case '완료':
      statusClasses = 'bg-slate-100 text-slate-600 border-slate-200';
      break;
  }

  return (
    <Badge variant="outline" className={`${base} ${statusClasses}`}>
      {status}
    </Badge>
  );
}

export default function StudentIdeasPage() {
  const [filter, setFilter] = useState('최신순');

  // 정렬 함수: 각 상태 그룹 내에서 적용
  const sortProjects = (projects: typeof studentProjects) => {
    if (filter === '인기순') {
      return projects.sort((a, b) => b.comments - a.comments);
    }
    return projects.sort((a, b) => b.id - a.id);
  };

  // 상태 순서로 그룹화
  const statusOrder = ['모집중', '진행중', '완료'];
  const groupedProjects = statusOrder.map((status) => sortProjects(studentProjects.filter((p) => p.status === status)));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Main content */}
      <div className="flex-1 p-6 px-48">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">학생 아이디어</h1>
            <p className="text-muted-foreground">선생님과 협업을 원하는 학생들이 올린 프로젝트 아이디어를 둘러보세요</p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {filter}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter('최신순')}>최신순</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('인기순')}>인기순</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <span>+ 추가하기</span>
            </Button>
          </div>
        </header>

        {/* 상태별 섹션: 모집중, 진행중, 완료 (순서 고정) */}
        {statusOrder.map((status, idx) => {
          const projects = groupedProjects[idx];
          if (projects.length === 0) return null;
          return (
            <section key={status} className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{status}</h2>
                <span className="text-sm text-muted-foreground">총 {projects.length}개</span>
              </div>

              {/* 가로 스크롤 가능한 카드 행 */}
              <div className="flex gap-6 overflow-x-auto pb-2">
                {projects.map((project) => (
                  <Link href={`/ideas/${project.id}`} key={project.id} className="no-underline">
                    <Card
                      className={`flex flex-col w-[26rem] flex-shrink-0 cursor-pointer ${
                        project.status === '모집중'
                          ? 'border-t-4 border-emerald-400'
                          : project.status === '진행중'
                          ? 'border-t-4 border-blue-500'
                          : 'border-t-4 border-slate-400'
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          <StatusBadge status={project.status} />
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-normal whitespace-nowrap">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-3 border-t flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{project.comments} 댓글</span>
                        </div>
                        <div>
                          <span>{project.postedDate}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
