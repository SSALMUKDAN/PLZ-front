import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

// 프로필 조회
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;

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
    console.error("Get profile error:", error);
    return errorResponse("프로필 조회 중 오류가 발생했습니다.", 500);
  }
}

// 프로필 수정
export async function PUT(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;
    const body = await request.json();
    const { name, major, skills, bio, workPlace } = body;

    // 업데이트할 데이터 준비
    const updateData: any = {};
    if (name) updateData.name = name;
    if (major !== undefined) updateData.major = major;
    if (skills !== undefined) updateData.skills = skills;
    if (bio !== undefined) updateData.bio = bio;
    if (workPlace !== undefined) updateData.workPlace = workPlace;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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
      },
    });

    return successResponse({
      message: "프로필이 업데이트되었습니다.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return errorResponse("프로필 업데이트 중 오류가 발생했습니다.", 500);
  }
}
