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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Navbar from "@/components/navbar";

// Sample data for teacher ideas
const teacherIdeas = [
  {
    id: 1,
    title: "Renewable Energy Science Fair Project",
    description:
      "Looking for students interested in building small-scale renewable energy demonstrations for the upcoming science fair.",
    tags: ["Science", "Environment", "Engineering"],
    comments: 12,
    status: "Open",
    author: "Dr. Sarah Johnson",
    postedDate: "2일 전",
  },
  {
    id: 2,
    title: "Local History Documentary",
    description:
      "Seeking students to collaborate on a documentary about our town's historical landmarks. Need research, filming, and editing skills.",
    tags: ["History", "Media", "Research"],
    comments: 8,
    status: "In Progress",
    author: "Prof. Michael Chen",
    postedDate: "1주 전",
  },
  {
    id: 3,
    title: "Mobile App for Campus Navigation",
    description:
      "Looking for computer science students to develop a mobile app that helps new students navigate our campus.",
    tags: ["Computer Science", "Mobile", "UX Design"],
    comments: 15,
    status: "Open",
    author: "Dr. Emily Rodriguez",
    postedDate: "3일 전",
  },
  {
    id: 4,
    title: "Mathematics Tutoring Platform",
    description:
      "Seeking students to help build an online platform for peer-to-peer mathematics tutoring.",
    tags: ["Mathematics", "Education", "Web Development"],
    comments: 6,
    status: "Completed",
    author: "Prof. James Wilson",
    postedDate: "1개월 전",
  },
  {
    id: 5,
    title: "Community Garden Project",
    description:
      "Looking for students interested in designing and implementing a community garden on campus.",
    tags: ["Biology", "Environment", "Community"],
    comments: 20,
    status: "In Progress",
    author: "Dr. Lisa Patel",
    postedDate: "2주 전",
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let variant: "outline" | "default" | "secondary" | "destructive" = "outline";
  let label = status;

  switch (status) {
    case "Open":
      variant = "default";
      label = "모집중";
      break;
    case "In Progress":
      variant = "secondary";
      label = "진행 중";
      break;
    case "Completed":
      variant = "outline";
      label = "완료";
      break;
  }

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {status}
    </Badge>
  );
}

export default function IdeasPage() {
  const [filter, setFilter] = useState("최신순");

  // Filter ideas based on selected filter
  const filteredIdeas = [...teacherIdeas].sort((a, b) => {
    if (filter === "인기순") {
      return b.comments - a.comments;
    }
    // Default to Latest (by ID in this mock data)
    return b.id - a.id;
  });

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

        {/* Ideas grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="flex flex-col">
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
      </div>
    </div>
  );
}
