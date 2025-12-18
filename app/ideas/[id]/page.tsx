'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
import api from '@/lib/apiAxios';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
  comments: Comment[];
}

interface RelatedIdea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  author: string;
  comments: number;
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let variant: 'outline' | 'default' | 'secondary' | 'destructive' = 'outline';
  let label = status;

  switch (status) {
    case 'OPEN':
    case 'Open':
      variant = 'default';
      label = '모집중';
      break;
    case 'IN_PROGRESS':
    case 'In Progress':
      variant = 'secondary';
      label = '진행 중';
      break;
    case 'COMPLETED':
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
function CommentComponent({
  comment,
  isReply = false,
  onReply,
}: {
  comment: Comment;
  isReply?: boolean;
  onReply: (parentId: string, content: string) => Promise<void>;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    setSubmitting(true);
    try {
      await onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('Failed to submit reply:', error);
      alert('답글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      await api.post(`/comments/${comment.id}/like`);
      window.location.reload(); // 간단하게 페이지 새로고침
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return '방금 전';
  };

  return (
    <div className={`${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{comment.author.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                {comment.author.role === 'TEACHER' ? '선생님' : '학생'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4 pt-1">
            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2" onClick={handleLike}>
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
                disabled={submitting}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                  disabled={submitting}
                >
                  취소
                </Button>
                <Button size="sm" onClick={handleReplySubmit} disabled={submitting}>
                  {submitting ? '등록 중...' : '답글 등록'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render replies */}
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentComponent key={reply.id} comment={reply} isReply={true} onReply={onReply} />
        ))}
    </div>
  );
}

export default function IdeaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const ideaId = params.id as string;
  const [newComment, setNewComment] = useState('');
  const [idea, setIdea] = useState<Idea | null>(null);
  const [relatedIdeas, setRelatedIdeas] = useState<RelatedIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await api.get(`/ideas/${ideaId}`);
        setIdea(response.data.idea);
        setRelatedIdeas(response.data.relatedIdeas || []);
      } catch (error) {
        console.error('Failed to fetch idea:', error);
        alert('아이디어를 불러오는데 실패했습니다.');
        router.push('/ideas/teachers');
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [ideaId, router]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/ideas/${ideaId}/comments`, {
        content: newComment,
      });
      setNewComment('');
      window.location.reload(); // 간단하게 페이지 새로고침
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    await api.post(`/ideas/${ideaId}/comments`, {
      content,
      parentId,
    });
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}일 전`;
    return '최근';
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">로딩 중...</p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (!idea) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex w-full flex-col">
        <Navbar />
        {/* Main content */}
        <div className="pt-16  flex items-center px-96">
          {/* Mobile sidebar trigger */}
          <div className="mb-4 md:hidden">
            <SidebarTrigger className="mb-4" />
          </div>

          <div className="grid gap-6 w-full">
            {/* Main content area */}
            <div className="space-y-6">
              {/* Idea details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{idea.title}</h1>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{idea.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium">{idea.author.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {idea.author.role === 'TEACHER' ? '선생님' : '학생'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(idea.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={idea.status} />
                </div>

                <p className="text-muted-foreground">{idea.description}</p>

                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
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
                    disabled={submitting}
                  />
                  <div className="flex justify-end">
                    <Button className="gap-2" onClick={handleCommentSubmit} disabled={submitting}>
                      <Send className="h-4 w-4" />
                      {submitting ? '등록 중...' : '댓글 달기'}
                    </Button>
                  </div>
                </div>

                {/* Comments list */}
                <div className="mt-6">
                  {idea.comments.map((comment) => (
                    <CommentComponent key={comment.id} comment={comment} onReply={handleReply} />
                  ))}
                  {idea.comments.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">첫 번째 댓글을 작성해보세요!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Related ideas */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">관련 아이디어</h2>
              <Card>
                <CardContent className="space-y-4">
                  {relatedIdeas.map((relatedIdea) => (
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
