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

// Sample data for student project ideas
const studentProjects = [
  {
    id: 1,
    title: 'AI-Powered Recycling Sorter',
    description:
      'Developing an AI system that can identify and sort recyclable materials. Looking for a teacher with expertise in machine learning and environmental science.',
    tags: ['AI', 'Environment', 'Engineering'],
    comments: 18,
    status: '모집중',
    author: 'Alex Johnson',
    postedDate: '3일 전',
  },
  {
    id: 2,
    title: 'Virtual Reality History Tour',
    description:
      'Creating a VR experience of historical events. Need a history teacher to ensure accuracy and provide educational context.',
    tags: ['VR', 'History', 'Technology'],
    comments: 24,
    status: '진행중',
    author: 'Maya Patel',
    postedDate: '1주 전',
  },
  {
    id: 3,
    title: 'Community Health Tracking App',
    description:
      'Building a mobile app to track community health metrics. Seeking a health sciences teacher to advise on relevant metrics and interpretation.',
    tags: ['Health', 'Mobile', 'Data Science'],
    comments: 9,
    status: '모집중',
    author: 'Carlos Rodriguez',
    postedDate: '2일 전',
  },
  {
    id: 4,
    title: 'Urban Garden Planning Tool',
    description:
      'Developing software to help urban communities plan efficient gardens. Looking for a biology teacher with expertise in plant science.',
    tags: ['Biology', 'Software', 'Community'],
    comments: 15,
    status: '진행중',
    author: 'Zoe Williams',
    postedDate: '5일 전',
  },
  {
    id: 5,
    title: 'Interactive Poetry Analysis Platform',
    description:
      'Creating an interactive platform for poetry analysis and discussion. Need a literature teacher to provide expert guidance.',
    tags: ['Literature', 'Web Development', 'Education'],
    comments: 21,
    status: '완료',
    author: 'Jamal Thompson',
    postedDate: '3주 전',
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let variant: 'outline' | 'default' | 'secondary' | 'destructive' = 'outline';

  switch (status) {
    case '모집중':
      variant = 'default';
      break;
    case '진행중':
      variant = 'secondary';
      break;
    case '완료':
      variant = 'outline';
      break;
  }

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {status}
    </Badge>
  );
}

export default function StudentIdeasPage() {
  const [filter, setFilter] = useState('최신순');

  // Filter ideas based on selected filter
  const filteredProjects = [...studentProjects].sort((a, b) => {
    if (filter === '토론 많은 순') {
      return b.comments - a.comments;
    }
    // Default to Newest (by ID in this mock data)
    return b.id - a.id;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Main content */}
      <div className="flex-1 p-6 px-48">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">학생 아이디어</h1>
            <p className="text-muted-foreground">교사 협업을 원하는 학생들이 올린 프로젝트 아이디어를 둘러보세요</p>
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
                <DropdownMenuItem onClick={() => setFilter('토론 많은 순')}>토론 많은 순</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <span>+ 추가하기</span>
            </Button>
          </div>
        </header>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col">
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
          ))}
        </div>
      </div>
    </div>
  );
}
