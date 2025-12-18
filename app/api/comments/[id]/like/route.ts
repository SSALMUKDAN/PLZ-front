import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

// 댓글 좋아요
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { id } = params;

    // 댓글 존재 확인
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return errorResponse("댓글을 찾을 수 없습니다.", 404);
    }

    // 좋아요 수 증가
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return successResponse({
      message: "좋아요가 추가되었습니다.",
      likes: updatedComment.likes,
    });
  } catch (error) {
    console.error("Like comment error:", error);
    return errorResponse("좋아요 처리 중 오류가 발생했습니다.", 500);
  }
}
