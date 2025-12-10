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

// 샘플 데이터: 상태 문자열을 학생 파일과 동일한 한국어로 변경
const teacherIdeas = [
  {
    id: 12,
    title: '학교 텃밭 생태 교육 프로그램',
    description:
      '학생들과 함께 사계절 텃밭을 운영하며 생태 교육을 진행하려 합니다. 식물학 및 환경 교육에 관심 있는 분 환영.',
    tags: ['생물', '환경', '커뮤니티'],
    comments: 5,
    status: '모집중',
    author: '한경자 선생님',
    postedDate: '2일 전',
  },
  {
    id: 11,
    title: '지역 박물관 연계 역사 수업',
    description: '지역 박물관과 협력해 현장학습 및 기록물을 활용한 프로젝트형 수업을 만들고자 합니다.',
    tags: ['역사', '현장학습', '교육'],
    comments: 8,
    status: '진행중',
    author: '정민우 선생님',
    postedDate: '1주 전',
  },
  {
    id: 10,
    title: '수학적 사고력 향상 캠프',
    description: '문제 해결 중심의 집중 캠프를 운영하려 합니다. 교재 및 활동 설계에 참여하실 분 찾습니다.',
    tags: ['수학', '교육', '워크숍'],
    comments: 3,
    status: '완료',
    author: '이수진 선생님',
    postedDate: '3주 전',
  },
  {
    id: 9,
    title: '코딩 기초 보충 수업 커리큘럼',
    description: '초·중학생 대상의 코딩 보충 수업 커리큘럼을 공동 제작하고 싶습니다. 교수법 관련 자문 환영.',
    tags: ['코딩', '교육', '커리큘럼'],
    comments: 14,
    status: '모집중',
    author: '김태호 선생님',
    postedDate: '1일 전',
  },
  {
    id: 8,
    title: '학교 에너지 절감 캠페인',
    description: '학생들과 함께 학교 내 에너지 사용 실태를 조사하고 절감 캠페인을 기획하려 합니다.',
    tags: ['환경', '조사', '캠페인'],
    comments: 6,
    status: '진행중',
    author: '박혜정 선생님',
    postedDate: '5일 전',
  },
  {
    id: 7,
    title: '미술과 지역사회 연계 전시 프로젝트',
    description: '학생 작품을 지역 카페/공간에 전시하는 프로젝트를 기획합니다. 전시 기획/운영 경험 있으신 분 모집.',
    tags: ['미술', '커뮤니티', '전시'],
    comments: 11,
    status: '모집중',
    author: '송지나 선생님',
    postedDate: '4일 전',
  },
  {
    id: 6,
    title: '과학 실험 키트 제작 및 배포',
    description: '간단하고 안전한 실험 키트를 만들어 학교 내의 작은 과학 박람회에서 사용하고자 합니다.',
    tags: ['과학', '공학', '프로덕트'],
    comments: 9,
    status: '진행중',
    author: '오세훈 선생님',
    postedDate: '6일 전',
  },
  {
    id: 5,
    title: '독서 토론 활성화 프로그램',
    description: '다양한 장르의 책을 읽고 토론하는 프로그램을 운영합니다. 도서 선정 및 토론 가이드 제작 도움 필요.',
    tags: ['문학', '토론', '교육'],
    comments: 4,
    status: '완료',
    author: '김유리 선생님',
    postedDate: '2달 전',
  },
  {
    id: 4,
    title: '음악기 제작 워크숍',
    description: '재활용 재료로 간단한 악기를 만들어 보는 워크숍을 진행하려 합니다. 음악 수업 보조 가능하신 분 환영.',
    tags: ['음악', '공작', '교육'],
    comments: 7,
    status: '모집중',
    author: '최민석 선생님',
    postedDate: '3일 전',
  },
  {
    id: 3,
    title: '생활 속 화학 안전 교육 자료 개발',
    description: '실험 안전 및 생활 속 화학 지식을 쉽게 전달할 수 있는 교육 자료를 제작하고자 합니다.',
    tags: ['화학', '안전', '교육자료'],
    comments: 2,
    status: '완료',
    author: '윤서영 선생님',
    postedDate: '1개월 전',
  },
  {
    id: 2,
    title: '진로 탐색 멘토링 프로그램',
    description: '다양한 직업군의 멘토를 초청하어 멘토링과 직업 체험 기회를 제공하고자 합니다.',
    tags: ['진로', '멘토링', '커리어'],
    comments: 13,
    status: '진행중',
    author: '한상우 선생님',
    postedDate: '8일 전',
  },
  {
    id: 1,
    title: '디지털 리터러시 교육 개선 프로젝트',
    description: '디지털 시민성, 정보 검색 및 미디어 리터러시를 강화하는 수업 설계를 함께합니다.',
    tags: ['디지털', '미디어', '교육'],
    comments: 16,
    status: '모집중',
    author: '백지현 선생님',
    postedDate: '12시간 전',
  },
];

// Status badge: 학생 페이지와 동일한 스타일/로직으로 변경
function StatusBadge({ status }: { status: string }) {
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

export default function IdeasPage() {
  const [filter, setFilter] = useState('최신순');

  // 정렬 함수: 인기순/최신순 처리
  const sortIdeas = (ideas: typeof teacherIdeas) => {
    if (filter === '인기순') {
      return [...ideas].sort((a, b) => b.comments - a.comments);
    }
    return [...ideas].sort((a, b) => b.id - a.id);
  };

  // 상태 순서로 그룹화
  const statusOrder = ['모집중', '진행중', '완료'];
  const groupedIdeas = statusOrder.map((status) => sortIdeas(teacherIdeas.filter((p) => p.status === status)));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Main content */}
      <div className="flex-1 p-6 px-48">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">선생님 아이디어</h1>
            <p className="text-muted-foreground">선생님이 게시한 프로젝트 아이디어를 둘러보세요</p>
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
            <Link href="/idea/new">
              <Button>
                <span>+ 추가하기</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* 상태별 섹션: 모집중, 진행중, 완료 (학생 UI와 동일한 레이아웃) */}
        {statusOrder.map((status, idx) => {
          const ideas = groupedIdeas[idx];
          if (ideas.length === 0) return null;
          return (
            <section key={status} className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{status}</h2>
                <span className="text-sm text-muted-foreground">총 {ideas.length}개</span>
              </div>

              {/* 가로 스크롤 가능한 카드 행 */}
              <div className="flex gap-6 overflow-x-auto pb-2">
                {ideas.map((idea) => (
                  <Link href={`/ideas/${idea.id}`} key={idea.id} className="no-underline">
                    <Card
                      className={`flex flex-col w-[26rem] flex-shrink-0 cursor-pointer ${
                        idea.status === '모집중'
                          ? 'border-t-4 border-emerald-400'
                          : idea.status === '진행중'
                          ? 'border-t-4 border-blue-500'
                          : 'border-t-4 border-slate-400'
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{idea.title}</CardTitle>
                          <StatusBadge status={idea.status} />
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-muted-foreground mb-4">{idea.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {idea.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-normal whitespace-nowrap">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-3 border-t flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{idea.comments} 댓글</span>
                        </div>
                        <div>
                          <span>{idea.postedDate}</span>
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
