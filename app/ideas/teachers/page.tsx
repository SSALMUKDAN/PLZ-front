"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Home,
  User,
  Bell,
  Filter,
  MessageSquare,
  ChevronDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/navbar";

// 샘플 데이터: 상태 문자열을 학생 파일과 동일한 한국어로 변경
const teacherIdeas = [
  {
    id: 6,
    title: "교실 내 지속가능한 에너지 설계",
    description:
      "교실 전력 소비를 줄이기 위한 소형 재생에너지 솔루션을 학생들과 함께 설계하고 싶습니다.",
    tags: ["환경", "공학", "프로젝트"],
    comments: 10,
    status: "모집중",
    author: "김선생",
    postedDate: "3일 전",
  },
  {
    id: 5,
    title: "지역 사회 역사 교육 자료 개발",
    description:
      "학생들과 함께 지역 역사 교육용 자료와 워크숍을 제작하려 합니다. 역사 교육 자문 필요.",
    tags: ["역사", "교육", "연구"],
    comments: 7,
    status: "진행중",
    author: "박선생",
    postedDate: "1주 전",
  },
  {
    id: 4,
    title: "수학적 문제 해결 워크숍",
    description:
      "문제 해결 중심의 워크숍을 통해 학생들의 사고력을 키우고자 합니다. 커리큘럼 협업 희망.",
    tags: ["수학", "교육", "워크숍"],
    comments: 3,
    status: "완료",
    author: "이선생",
    postedDate: "1개월 전",
  },
  // ...필요시 항목 추가...
];

// Status badge: 학생 페이지와 동일한 스타일/로직으로 변경
function StatusBadge({ status }: { status: string }) {
  const base = "whitespace-nowrap px-2 py-1 rounded-full text-sm font-medium";
  let statusClasses = "bg-slate-100 text-slate-700 border border-slate-200";

  switch (status) {
    case "모집중":
      statusClasses = "bg-emerald-100 text-emerald-800 border-emerald-200";
      break;
    case "진행중":
      statusClasses = "bg-blue-100 text-blue-800 border-blue-200";
      break;
    case "완료":
      statusClasses = "bg-slate-100 text-slate-600 border-slate-200";
      break;
  }

  return (
    <Badge variant="outline" className={`${base} ${statusClasses}`}>
      {status}
    </Badge>
  );
}

export default function IdeasPage() {
  const [filter, setFilter] = useState("최신순");

  // 정렬 함수: 인기순/최신순 처리
  const sortIdeas = (ideas: typeof teacherIdeas) => {
    if (filter === "인기순") {
      return [...ideas].sort((a, b) => b.comments - a.comments);
    }
    return [...ideas].sort((a, b) => b.id - a.id);
  };

  // 상태 순서로 그룹화
  const statusOrder = ["모집중", "진행중", "완료"];
  const groupedIdeas = statusOrder.map((status) =>
    sortIdeas(teacherIdeas.filter((p) => p.status === status))
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Main content */}
      <div className="flex-1 p-6 px-48">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">선생님 아이디어</h1>
            <p className="text-muted-foreground">
              선생님이 게시한 프로젝트 아이디어를 둘러보세요
            </p>
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
                <DropdownMenuItem onClick={() => setFilter("최신순")}>
                  최신순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("인기순")}>
                  인기순
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <span>+ 추가하기</span>
            </Button>
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
                <span className="text-sm text-muted-foreground">
                  총 {ideas.length}개
                </span>
              </div>

              {/* 가로 스크롤 가능한 카드 행 */}
              <div className="flex gap-6 overflow-x-auto pb-2">
                {ideas.map((idea) => (
                  <Card
                    key={idea.id}
                    className={`flex flex-col w-[27rem] flex-shrink-0 ${
                      idea.status === "모집중"
                        ? "border-t-4 border-emerald-400"
                        : idea.status === "진행중"
                        ? "border-t-4 border-blue-500"
                        : "border-t-4 border-slate-400"
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
                        {idea.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {idea.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="font-normal whitespace-nowrap"
                          >
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
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
