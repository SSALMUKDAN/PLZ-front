"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Eye, EyeOff, GraduationCap, Users } from "lucide-react";
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

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <Button
                className="bg-transparent text-slate-400 hover:bg-slate-100 rounded-full absolute top-6 left-6"
                onClick={() => window.history.back()}
              >
                &lt;
              </Button>
              <img
                src="/SsalmukdanLogo.png"
                alt="PLZ Logo"
                className="h-16 w-16"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              회원가입
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-2">
              역할을 선택하세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-8 pb-8">
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="/signup/teacher"
                className="group relative overflow-hidden rounded-2xl p-6 bg-white border-2 border-gray-200 text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-black/10 rounded-xl backdrop-blur-sm">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">선생님으로 가입</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      필요한 프로젝트를 학생들에게 제안해보세요
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/5 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>

              <Link
                href="/signup/student"
                className="group relative overflow-hidden rounded-2xl p-6 bg-black text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">학생으로 가입</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      다양한 프로젝트에 참여해보세요
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                이미 계정이 있으신가요?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  로그인하기
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
