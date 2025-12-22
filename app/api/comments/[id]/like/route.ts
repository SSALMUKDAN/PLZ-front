import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

// 댓글 좋아요 토글 (On/Off)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;
    const { id: commentId } = await params;

    // 댓글 존재 확인
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return errorResponse("댓글을 찾을 수 없습니다.", 404);
    }

    // 이미 좋아요를 눌렀는지 확인
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (existingLike) {
      // 좋아요 취소
      await prisma.$transaction([
        prisma.commentLike.delete({
          where: { id: existingLike.id },
        }),
        prisma.comment.update({
          where: { id: commentId },
          data: {
            likes: {
              decrement: 1,
            },
          },
        }),
      ]);

      const updatedComment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      return successResponse({
        message: "좋아요가 취소되었습니다.",
        likes: updatedComment?.likes ?? 0,
        isLiked: false,
      });
    } else {
      // 좋아요 추가
      await prisma.$transaction([
        prisma.commentLike.create({
          data: {
            userId,
            commentId,
          },
        }),
        prisma.comment.update({
          where: { id: commentId },
          data: {
            likes: {
              increment: 1,
            },
          },
        }),
      ]);

      const updatedComment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      return successResponse({
        message: "좋아요가 추가되었습니다.",
        likes: updatedComment?.likes ?? 0,
        isLiked: true,
      });
    }
  } catch (error) {
    console.error("Like comment error:", error);
    return errorResponse("좋아요 처리 중 오류가 발생했습니다.", 500);
  }
}

// 좋아요 상태 확인
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;
    const { id: commentId } = await params;

    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    return successResponse({
      isLiked: !!existingLike,
    });
  } catch (error) {
    console.error("Check like error:", error);
    return errorResponse("좋아요 상태 확인 중 오류가 발생했습니다.", 500);
  }
}
