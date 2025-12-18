import { NextRequest, NextResponse } from "next/server";
import { extractToken, verifyToken } from "./auth";

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

// 인증 미들웨어 - 로그인 필요한 API에서 사용
export function requireAuth(request: NextRequest): AuthUser | NextResponse {
  const authHeader = request.headers.get("authorization");
  const token = extractToken(authHeader);

  if (!token) {
    return NextResponse.json(
      { error: "인증이 필요합니다. 로그인 해주세요." },
      { status: 401 }
    );
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json(
      { error: "유효하지 않은 토큰입니다." },
      { status: 401 }
    );
  }

  return user;
}

// 에러 응답 생성
export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

// 성공 응답 생성
export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status });
}
