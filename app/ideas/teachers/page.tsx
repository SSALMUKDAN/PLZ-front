'use client';

import { useState, useEffect } from 'react';
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
import Footer from '@/components/footer';
import api from '@/lib/apiAxios';

interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  comments: number;
  status: string;
  author: {
    name: string;
  };
  createdAt: string;
}

// Status badge: 학생 페이지와 동일한 스타일/로직으로 변경
function StatusBadge({ status }: { status: string }) {
  const base = 'whitespace-nowrap px-2 py-1 rounded-full text-sm font-medium';
  let statusClasses = 'bg-slate-100 text-slate-700 border border-slate-200';

  // API에서 오는 status (OPEN, IN_PROGRESS, COMPLETED)를 한국어로 매핑
  let displayStatus = status;
  switch (status) {
    case 'OPEN':
      displayStatus = '모집중';
      statusClasses = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      break;
    case 'IN_PROGRESS':
      displayStatus = '진행중';
      statusClasses = 'bg-blue-100 text-blue-800 border-blue-200';
      break;
    case 'COMPLETED':
      displayStatus = '완료';
      statusClasses = 'bg-slate-100 text-slate-600 border-slate-200';
      break;
    // 한국어 상태도 지원 (호환성)
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
      {displayStatus}
    </Badge>
  );
}

export default function IdeasPage() {
  const [filter, setFilter] = useState('최신순');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await api.get('/ideas?role=TEACHER');
        setIdeas(response.data.ideas);
      } catch (error) {
        console.error('Failed to fetch ideas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // 정렬 함수: 인기순/최신순 처리
  const sortIdeas = (ideasToSort: Idea[]) => {
    if (filter === '인기순') {
      return [...ideasToSort].sort((a, b) => b.comments - a.comments);
    }
    return [...ideasToSort].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // 상태 순서로 그룹화
  const statusOrder = ['OPEN', 'IN_PROGRESS', 'COMPLETED'];
  const groupedIdeas = statusOrder.map((status) => sortIdeas(ideas.filter((p) => p.status === status)));

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

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
                        <p className="text-muted-foreground mb-4">
                          {idea.description.length > 100 ? `${idea.description.slice(0, 100)}...` : idea.description}
                        </p>
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
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
