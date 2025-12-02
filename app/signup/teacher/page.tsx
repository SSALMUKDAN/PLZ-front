"use client";

import Link from "next/link";
import { FormEventHandler, useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    const data = {
      name: formData.get("fullName"),
      workPlace: formData.get("workPlace"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: "TEACHER",
    };
    axios.post("/api/user/signup", data).then((res) => {
      if (res.status === 200) {
        alert("회원가입이 완료되었습니다.");
        router.push("/login");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="absolute mt-2 ml-2">
          <Button
            className="bg-transparent text-slate-400 hover:bg-slate-100 rounded-full"
            onClick={() => window.history.back()}
          >
            &lt;
          </Button>
        </div>
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/SsalmukdanLogo.png"
              alt="PLZ Logo"
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            선생님으로 회원가입
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="fullName">이름</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="홍길동"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workPlace">담당부서</Label>
              <Input
                id="workPlace"
                name="workPlace"
                placeholder="선택사항입니다"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                  aria-label={
                    showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={
                    showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              회원가입
            </Button>

            <div className="text-center text-sm">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                로그인
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
