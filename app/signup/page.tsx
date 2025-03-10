"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <Link className="absolute mt-2 ml-2" href="/">
          <Button className="bg-transparent text-slate-400 hover:bg-slate-100 rounded-full">
            &lt;
          </Button>
        </Link>
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">PLZ</span>
            </div>
          </div>
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>시작하려면 정보를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between px-[5%]">
            <Link
              href="/signup/teacher"
              className="w-[40%] bg-slate-700 aspect-square rounded-xl shadow-lg text-white flex justify-center items-center"
            >
              <p>선생님으로 회원가입</p>
            </Link>
            <Link
              href="/signup/student"
              className="w-[40%] bg-slate-700 aspect-square rounded-xl shadow-lg text-white flex justify-center items-center"
            >
              <p>학생으로 회원가입</p>
            </Link>
          </div>
          <div className="text-center text-sm">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
