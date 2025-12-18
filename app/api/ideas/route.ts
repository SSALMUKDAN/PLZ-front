import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, errorResponse, successResponse } from "@/lib/api-utils";

// 아이디어 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role"); // TEACHER or STUDENT
    const status = searchParams.get("status"); // OPEN, IN_PROGRESS, COMPLETED
    const sort = searchParams.get("sort") || "최신순"; // 최신순 or 인기순
    const tag = searchParams.get("tag"); // 특정 태그 검색

    // 필터 조건 구성
    const where: any = {};
    if (role) where.authorRole = role;
    if (status) where.status = status;
    if (tag) where.tags = { has: tag };

    // 정렬 조건
    let orderBy: any = { createdAt: "desc" }; // 기본: 최신순
    if (sort === "인기순") {
      // 인기순은 댓글 수로 정렬 (Prisma에서는 별도 로직 필요)
      orderBy = { comments: { _count: "desc" } };
    }

    const ideas = await prisma.idea.findMany({
      where,
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
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy,
    });

    // 응답 데이터 포맷팅
    const formattedIdeas = ideas.map((idea) => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      category: idea.category,
      tags: idea.tags,
      status: idea.status,
      author: {
        id: idea.author.id,
        name: idea.author.name,
        role: idea.author.role,
      },
      comments: idea._count.comments,
      createdAt: idea.createdAt,
      updatedAt: idea.updatedAt,
    }));

    return successResponse({ ideas: formattedIdeas });
  } catch (error) {
    console.error("Get ideas error:", error);
    return errorResponse(
      "아이디어 목록을 불러오는 중 오류가 발생했습니다.",
      500
    );
  }
}

// 아이디어 생성
export async function POST(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId, role } = authResult;
    const body = await request.json();
    const { title, description, category, tags, lookingForCollaborators } =
      body;

    // 필수 필드 검증
    if (!title || !description || !category || !tags || tags.length === 0) {
      return errorResponse("필수 정보를 모두 입력해주세요.");
    }

    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        category,
        tags,
        authorId: userId,
        authorRole: role as "TEACHER" | "STUDENT",
        lookingForCollaborators:
          lookingForCollaborators !== undefined
            ? lookingForCollaborators
            : true,
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
        message: "아이디어가 생성되었습니다.",
        idea,
      },
      201
    );
  } catch (error) {
    console.error("Create idea error:", error);
    return errorResponse("아이디어 생성 중 오류가 발생했습니다.", 500);
  }
}
