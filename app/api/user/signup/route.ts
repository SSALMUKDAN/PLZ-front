import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, workPlace, studentId } = body;

    // 필수 필드 검증
    if (!name || !email || !password || !role) {
      return errorResponse("필수 정보를 모두 입력해주세요.");
    }

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("이미 사용 중인 이메일입니다.");
    }

    // 역할별 필수 필드 검증
    if (role === "STUDENT" && !studentId) {
      return errorResponse("학번을 입력해주세요.");
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as "TEACHER" | "STUDENT",
        workPlace: role === "TEACHER" ? workPlace : undefined,
        studentId: role === "STUDENT" ? studentId : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        workPlace: true,
        studentId: true,
        createdAt: true,
      },
    });

    return successResponse(
      {
        message: "회원가입이 완료되었습니다.",
        user,
      },
      201
    );
  } catch (error) {
    console.error("Signup error:", error);
    return errorResponse("회원가입 중 오류가 발생했습니다.", 500);
  }
}
