import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

// 아이디어 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const idea = await prisma.idea.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          },
        },
        comments: {
          where: { parentId: null }, // 최상위 댓글만
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
        },
      },
    });

    if (!idea) {
      return errorResponse("아이디어를 찾을 수 없습니다.", 404);
    }

    // 관련 아이디어 추천 (같은 태그 기준)
    const relatedIdeas = await prisma.idea.findMany({
      where: {
        id: { not: id },
        OR: idea.tags.map((tag) => ({ tags: { has: tag } })),
      },
      take: 3,
      include: {
        author: {
          select: {
            name: true,
            role: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return successResponse({
      idea,
      relatedIdeas: relatedIdeas.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        tags: r.tags,
        status: r.status,
        author: r.author.name,
        comments: r._count.comments,
      })),
    });
  } catch (error) {
    console.error("Get idea error:", error);
    return errorResponse("아이디어를 불러오는 중 오류가 발생했습니다.", 500);
  }
}

// 아이디어 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      category,
      tags,
      status,
      lookingForCollaborators,
    } = body;

    // 아이디어 조회 및 권한 확인
    const idea = await prisma.idea.findUnique({
      where: { id },
    });

    if (!idea) {
      return errorResponse("아이디어를 찾을 수 없습니다.", 404);
    }

    if (idea.authorId !== userId) {
      return errorResponse("수정 권한이 없습니다.", 403);
    }

    // 업데이트
    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    if (status) updateData.status = status;
    if (lookingForCollaborators !== undefined)
      updateData.lookingForCollaborators = lookingForCollaborators;

    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: updateData,
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
      message: "아이디어가 수정되었습니다.",
      idea: updatedIdea,
    });
  } catch (error) {
    console.error("Update idea error:", error);
    return errorResponse("아이디어 수정 중 오류가 발생했습니다.", 500);
  }
}

// 아이디어 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId } = authResult;
    const { id } = await params;

    // 아이디어 조회 및 권한 확인
    const idea = await prisma.idea.findUnique({
      where: { id },
    });

    if (!idea) {
      return errorResponse("아이디어를 찾을 수 없습니다.", 404);
    }

    if (idea.authorId !== userId) {
      return errorResponse("삭제 권한이 없습니다.", 403);
    }

    // 삭제 (Cascade로 댓글도 함께 삭제됨)
    await prisma.idea.delete({
      where: { id },
    });

    return successResponse({ message: "아이디어가 삭제되었습니다." });
  } catch (error) {
    console.error("Delete idea error:", error);
    return errorResponse("아이디어 삭제 중 오류가 발생했습니다.", 500);
  }
}
