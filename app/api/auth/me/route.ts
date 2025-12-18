import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    // 인증 실패 시 에러 응답 반환
    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;

    // 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        workPlace: true,
        studentId: true,
        major: true,
        skills: true,
        bio: true,
        createdAt: true,
      },
    });

    if (!user) {
      return errorResponse("사용자를 찾을 수 없습니다.", 404);
    }

    return successResponse({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return errorResponse("사용자 정보를 불러오는 중 오류가 발생했습니다.", 500);
  }
}
