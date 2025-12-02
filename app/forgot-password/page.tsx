"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to send the reset link
    // For now, we'll just show the confirmation message
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/SsalmukdanLogo.png"
              alt="PLZ Logo"
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            비밀번호 찾기
          </CardTitle>
          <CardDescription>
            이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <Alert className="bg-primary/10 border-primary/20">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-center py-2">
                {email} 계정이 존재한다면, 곧 이메일로 비밀번호 재설정 링크를
                받으실 수 있습니다.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                재설정 링크 전송
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/login"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            로그인으로 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
