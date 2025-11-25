'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Navbar from '@/components/navbar';

export default function NewIdeaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    lookingForCollaborators: true,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });

    // Clear error when user selects
    if (errors.category) {
      setErrors({
        ...errors,
        category: '',
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      lookingForCollaborators: checked,
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목은 필수 항목입니다';
    }

    if (!formData.description.trim()) {
      newErrors.description = '설명은 필수 항목입니다';
    }

    if (!formData.category) {
      newErrors.category = '카테고리는 필수 항목입니다';
    }

    if (tags.length === 0) {
      newErrors.tags = '하나 이상의 태그가 필요합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically submit the form data to your API
      console.log('Form submitted:', { ...formData, tags });

      // Show success message
      setIsSubmitted(true);

      // In a real app, you might redirect to the new idea page after submission
      // router.push(`/ideas/${newIdeaId}`)
    }
  };

  const handleCreateAnother = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      lookingForCollaborators: true,
    });
    setTags([]);
    setIsSubmitted(false);
  };

  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      {/* Main content */}
      <div className="flex-1 p-6 pt-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">아이디어 공유</h1>
            <p className="text-muted-foreground">프로젝트 아이디어를 공유해보세요</p>
          </div>

          {isSubmitted ? (
            <Card>
              <CardContent className="pt-6">
                <Alert className="bg-primary/10 border-primary/20 mb-6">
                  <Check className="h-4 w-4 text-primary" />
                  <AlertTitle>성공!</AlertTitle>
                  <AlertDescription>아이디어가 성공적으로 제출되었습니다.</AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{formData.title}</h3>
                  <p className="text-muted-foreground">{formData.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">카테고리:</span>
                    <span>{formData.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">협업자를 찾나요:</span>
                    <span>{formData.lookingForCollaborators ? '예' : '아니요'}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCreateAnother}>
                  다시 작성하기
                </Button>
                <Button onClick={() => router.push('/ideas/teachers')}>
                  모든 아이디어 보기 <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  제목 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="제목을 입력하세요"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  설명 <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="아이디어를 자세히 설명하세요"
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  아이디어 제출
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
