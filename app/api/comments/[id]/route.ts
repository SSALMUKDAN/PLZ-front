import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

// 댓글 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;
    const { id } = params;
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return errorResponse("댓글 내용을 입력해주세요.");
    }

    // 댓글 조회 및 권한 확인
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return errorResponse("댓글을 찾을 수 없습니다.", 404);
    }

    if (comment.authorId !== userId) {
      return errorResponse("수정 권한이 없습니다.", 403);
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });

    return successResponse({
      message: "댓글이 수정되었습니다.",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Update comment error:", error);
    return errorResponse("댓글 수정 중 오류가 발생했습니다.", 500);
  }
}

// 댓글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;
    const { id } = params;

    // 댓글 조회 및 권한 확인
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        replies: true,
      },
    });

    if (!comment) {
      return errorResponse("댓글을 찾을 수 없습니다.", 404);
    }

    if (comment.authorId !== userId) {
      return errorResponse("삭제 권한이 없습니다.", 403);
    }

    // 삭제 (Cascade로 대댓글도 함께 삭제)
    await prisma.comment.delete({
      where: { id },
    });

    return successResponse({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    console.error("Delete comment error:", error);
    return errorResponse("댓글 삭제 중 오류가 발생했습니다.", 500);
  }
}
