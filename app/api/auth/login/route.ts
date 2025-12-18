import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 필수 필드 검증
    if (!email || !password) {
      return errorResponse("이메일과 비밀번호를 입력해주세요.");
    }

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("이메일 또는 비밀번호가 올바르지 않습니다.", 401);
    }

    // 비밀번호 검증
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return errorResponse("이메일 또는 비밀번호가 올바르지 않습니다.", 401);
    }

    // JWT 토큰 생성
    const token = generateToken(user.id, user.email, user.role);

    return successResponse({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        workPlace: user.workPlace,
        studentId: user.studentId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("로그인 중 오류가 발생했습니다.", 500);
  }
}
