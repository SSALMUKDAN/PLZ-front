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

// Sample idea data
const ideaData = {
  id: '1',
  title: 'Renewable Energy Science Fair Project',
  description:
    'Looking for students interested in building small-scale renewable energy demonstrations for the upcoming science fair. This project will focus on creating working models of solar, wind, and hydroelectric power generation. Students will learn about energy conversion, efficiency, and the environmental impact of different energy sources. The final projects will be showcased at the district science fair in May, with potential for state-level competition for exceptional projects.',
  tags: ['Science', 'Environment', 'Engineering'],
  status: 'Open',
  author: {
    name: 'Dr. Sarah Johnson',
    role: 'Science Teacher',
    avatar: '/SsalmukdanLogo.png?height=40&width=40',
  },
  postedDate: '2 days ago',
  comments: [
    {
      id: 'c1',
      author: {
        name: 'Miguel Rodriguez',
        role: 'Student',
        avatar: '/SsalmukdanLogo.png?height=40&width=40',
      },
      content:
        "I'm very interested in this project! I've been researching solar panel efficiency and would love to build a demonstration model.",
      timestamp: '1 day ago',
      likes: 5,
      replies: [
        {
          id: 'r1',
          author: {
            name: 'Dr. Sarah Johnson',
            role: 'Science Teacher',
            avatar: '/SsalmukdanLogo.png?height=40&width=40',
          },
          content:
            "That sounds great, Miguel! I have some resources on solar panel efficiency that I can share with you. Let's set up a time to discuss your ideas in more detail.",
          timestamp: '1 day ago',
          likes: 2,
        },
        {
          id: 'r2',
          author: {
            name: 'Aisha Patel',
            role: 'Student',
            avatar: '/SsalmukdanLogo.png?height=40&width=40',
          },
          content:
            "Miguel, I'm also interested in solar energy. Maybe we could collaborate on different aspects of solar technology?",
          timestamp: '12 hours ago',
          likes: 1,
        },
      ],
    },
    {
      id: 'c2',
      author: {
        name: 'Emma Wilson',
        role: 'Student',
        avatar: '/SsalmukdanLogo.png?height=40&width=40',
      },
      content:
        "I'd like to work on the hydroelectric power model. I have some questions about the scale and materials we should use.",
      timestamp: '2 days ago',
      likes: 3,
      replies: [],
    },
  ],
};

// Sample related ideas
const relatedIdeas = [
  {
    id: '2',
    title: 'Biodiversity Mapping Project',
    description: 'Looking for students to help create a digital map of local biodiversity.',
    tags: ['Biology', 'Environment', 'Technology'],
    status: 'Open',
    author: 'Prof. James Wilson',
    postedDate: '3 days ago',
  },
  {
    id: '3',
    title: 'Sustainable Architecture Models',
    description: 'Seeking students interested in designing eco-friendly building models.',
    tags: ['Architecture', 'Environment', 'Design'],
    status: 'Open',
    author: 'Dr. Lisa Patel',
    postedDate: '1 week ago',
  },
  {
    id: '4',
    title: 'Climate Change Data Visualization',
    description: 'Looking for students to create interactive visualizations of climate data.',
    tags: ['Data Science', 'Environment', 'Visualization'],
    status: 'In Progress',
    author: 'Prof. Michael Chen',
    postedDate: '5 days ago',
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let variant: 'outline' | 'default' | 'secondary' | 'destructive' = 'outline';
  let label = status;

  switch (status) {
    case 'Open':
      variant = 'default';
      label = '열림';
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

  return <Badge variant={variant}>{label}</Badge>;
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
                    <Badge key={tag} variant="secondary" className="font-normal">
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
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
