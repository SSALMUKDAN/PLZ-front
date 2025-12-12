'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, Home, User, Bell, Users, Clock, ThumbsUp, Reply, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Sample idea data
const ideaData = {
  id: '1',
  title: '재생 에너지 과학 박람회 프로젝트',
  description:
    '다가오는 과학 박람회를 위해 소규모 재생 에너지 시연 제작에 관심 있는 학생들을 찾고 있습니다. 이 프로젝트는 태양광, 풍력, 수력 발전의 작동 모델 제작에 중점을 둡니다. 학생들은 에너지 변환, 효율성 및 다양한 에너지원의 환경적 영향에 대해 배우게 됩니다. 최종 프로젝트는 5월 지역 과학 박람회에서 전시되며, 우수 프로젝트는 전국 대회 진출 가능성이 있습니다.',
  tags: ['과학', '환경', '공학'],
  status: 'Open',
  author: {
    name: '김서연 교수',
    role: '과학 교사',
    avatar: '/SsalmukdanLogo.png?height=40&width=40',
  },
  postedDate: '2일 전',
  comments: [
    {
      id: 'c1',
      author: {
        name: '박지훈',
        role: '학생',
        avatar: '/SsalmukdanLogo.png?height=40&width=40',
      },
      content:
        '이 프로젝트에 정말 관심이 많습니다! 태양광 패널 효율성에 대해 연구해왔고 시연 모델을 만들어보고 싶어요.',
      timestamp: '1일 전',
      likes: 5,
      replies: [
        {
          id: 'r1',
          author: {
            name: '김서연 교수',
            role: '과학 교사',
            avatar: '/SsalmukdanLogo.png?height=40&width=40',
          },
          content:
            '좋네요, 지훈님! 태양광 패널 효율성에 관한 자료를 공유해드릴 수 있어요. 아이디어를 더 자세히 논의할 시간을 정해봅시다.',
          timestamp: '1일 전',
          likes: 2,
        },
        {
          id: 'r2',
          author: {
            name: '이수민',
            role: '학생',
            avatar: '/SsalmukdanLogo.png?height=40&width=40',
          },
          content:
            '지훈님, 저도 태양 에너지에 관심이 있어요. 태양광 기술의 다양한 측면에서 협력할 수 있을까요?',
          timestamp: '12시간 전',
          likes: 1,
        },
      ],
    },
    {
      id: 'c2',
      author: {
        name: '최예은',
        role: '학생',
        avatar: '/SsalmukdanLogo.png?height=40&width=40',
      },
      content:
        '수력 발전 모델을 작업하고 싶어요. 규모와 사용해야 할 재료에 대해 몇 가지 질문이 있습니다.',
      timestamp: '2일 전',
      likes: 3,
      replies: [],
    },
  ],
};

// Sample related ideas
const relatedIdeas = [
  {
    id: '2',
    title: '생물다양성 지도 제작 프로젝트',
    description: '지역 생물다양성의 디지털 지도 제작을 도와줄 학생들을 찾고 있습니다.',
    tags: ['생물학', '환경', '기술'],
    status: 'Open',
    author: '정민호 교수',
    postedDate: '3일 전',
  },
  {
    id: '3',
    title: '지속가능한 건축 모델',
    description: '친환경 건물 모델 설계에 관심 있는 학생들을 찾고 있습니다.',
    tags: ['건축', '환경', '디자인'],
    status: 'Open',
    author: '윤지영 교수',
    postedDate: '1주일 전',
  },
  {
    id: '4',
    title: '기후 변화 데이터 시각화',
    description: '기후 데이터의 인터랙티브 시각화를 제작할 학생들을 찾고 있습니다.',
    tags: ['데이터 과학', '환경', '시각화'],
    status: 'In Progress',
    author: '강동현 교수',
    postedDate: '5일 전',
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let variant: 'outline' | 'default' | 'secondary' | 'destructive' = 'outline';
  let label = status;

  switch (status) {
    case 'Open':
      variant = 'default';
      label = '모집중';
      break;
    case 'In Progress':
      variant = 'secondary';
      label = '진행 중';
      break;
    case 'Completed':
      variant = 'outline';
      label = '완료';
      break;
  }

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {label}
    </Badge>
  );
}

// Comment component
function Comment({ comment, isReply = false }: { comment: any; isReply?: boolean }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
    <div className={`${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{comment.author.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">{comment.author.role}</span>
            </div>
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4 pt-1">
            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs">{comment.likes}</span>
            </Button>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 px-2"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <Reply className="h-4 w-4" />
                <span className="text-xs">답글</span>
              </Button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-2 space-y-2">
              <Textarea
                placeholder="답글 작성..."
                className="min-h-[80px]"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // Here you would typically submit the reply
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                >
                  답글 등록
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render replies */}
      {comment.replies &&
        comment.replies.map((reply: any) => <Comment key={reply.id} comment={reply} isReply={true} />)}
    </div>
  );
}

export default function IdeaDetailPage() {
  const params = useParams();
  const ideaId = params.id;
  const [newComment, setNewComment] = useState('');

  // In a real app, you would fetch the idea data based on the ideaId
  // For now, we'll use the sample data

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {/* Main content */}
        <div className="pt-16 flex items-center px-96">
          {/* Mobile sidebar trigger */}
          <div className="mb-4 md:hidden">
            <SidebarTrigger className="mb-4" />
          </div>

          <div className="grid gap-6 ">
            {/* Main content area */}
            <div className="space-y-6">
              {/* Idea details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{ideaData.title}</h1>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={ideaData.author.avatar} alt={ideaData.author.name} />
                          <AvatarFallback>{ideaData.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium">{ideaData.author.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{ideaData.author.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{ideaData.postedDate}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={ideaData.status} />
                </div>

                <p className="text-muted-foreground">{ideaData.description}</p>

                <div className="flex flex-wrap gap-2">
                  {ideaData.tags.map((tag) => (
                    // 태그의 줄바꿈을 방지하기 위해 whitespace-nowrap 추가
                    <Badge key={tag} variant="secondary" className="font-normal whitespace-nowrap">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Comments section */}
              <div>
                <h2 className="mb-4 text-xl font-semibold">댓글</h2>

                {/* New comment form */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="댓글 추가..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Send className="h-4 w-4" />
                      댓글 달기
                    </Button>
                  </div>
                </div>

                {/* Comments list */}
                <div className="mt-6">
                  {ideaData.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>

            {/* Related ideas */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">관련 아이디어</h2>
              <Card>
                <CardContent className="space-y-4">
                  {relatedIdeas.map((idea) => (
                    <div key={idea.id} className="space-y-2">
                      <Link href={`/ideas/${idea.id}`} className="font-medium hover:text-primary">
                        {idea.title}
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-2">{idea.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {idea.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs font-normal whitespace-nowrap">
                            #{tag}
                          </Badge>
                        ))}
                        {idea.tags.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{idea.tags.length - 2} more</span>
                        )}
                      </div>
                      <Separator className="mt-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
