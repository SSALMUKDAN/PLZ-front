import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

// 댓글 목록 조회 (아이디어 상세에 포함되어 있으므로 선택적)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const comments = await prisma.comment.findMany({
      where: {
        ideaId: id,
        parentId: null, // 최상위 댓글만
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse({ comments });
  } catch (error) {
    console.error("Get comments error:", error);
    return errorResponse("댓글을 불러오는 중 오류가 발생했습니다.", 500);
  }
}

// 댓글 생성
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
    const { id: ideaId } = await params;
    const body = await request.json();
    const { content, parentId } = body;

    // 필수 필드 검증
    if (!content) {
      return errorResponse("댓글 내용을 입력해주세요.");
    }

    // 아이디어 존재 확인
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      return errorResponse("아이디어를 찾을 수 없습니다.", 404);
    }

    // 대댓글인 경우 부모 댓글 확인
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        return errorResponse("부모 댓글을 찾을 수 없습니다.", 404);
      }

      // 대댓글의 대댓글 방지
      if (parentComment.parentId) {
        return errorResponse("대댓글에는 답글을 달 수 없습니다.", 400);
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        ideaId,
        parentId: parentId || null,
      },
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

    return successResponse(
      {
        message: "댓글이 작성되었습니다.",
        comment,
      },
      201
    );
  } catch (error) {
    console.error("Create comment error:", error);
    return errorResponse("댓글 작성 중 오류가 발생했습니다.", 500);
  }
}
