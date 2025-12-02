"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
  const router = useRouter();

  // 임시 데이터 - 실제로는 API에서 가져와야 함
  const userInfo = {
    name: "김철수",
    email: "kimcs@example.com",
    role: "학생",
    university: "서울대학교",
    major: "컴퓨터공학과",
    skills: ["React", "Node.js", "Python", "Java"],
    bio: "새로운 기술을 배우고 실제 프로젝트에 적용하는 것을 좋아합니다.",
  };

  const proposedProjects = [
    {
      id: 1,
      title: "웹 기반 할일 관리 앱",
      description: "React와 Node.js를 사용한 협업 툴",
      status: "모집중",
      applicants: 3,
    },
    {
      id: 2,
      title: "AI 챗봇 서비스",
      description: "OpenAI API를 활용한 고객 서비스 봇",
      status: "진행중",
      applicants: 2,
    },
  ];

  const acceptedProjects = [
    {
      id: 3,
      title: "E-commerce 플랫폼",
      description: "Next.js 기반 온라인 쇼핑몰",
      role: "프론트엔드 개발자",
      status: "진행중",
    },
  ];

  const handleProposeProject = () => {
    router.push("/ideas/new");
  };

  const handleLogout = () => {
    if (!confirm("정말로 로그아웃하시겠습니까?")) return;
    try {
      localStorage.removeItem("token");
    } catch {
      // 무시
    }
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* 프로필 헤더 */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">{userInfo.name}</h1>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleProposeProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  새 프로젝트 제안
                </button>
                {/* 새로 추가된 로그아웃 버튼 */}
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium border"
                >
                  로그아웃
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    역할
                  </h3>
                  <p>{userInfo.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    학교
                  </h3>
                  <p>{userInfo.university}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    전공
                  </h3>
                  <p>{userInfo.major}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">기술</h3>
                <div className="flex flex-wrap gap-2">
                  {userInfo.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">소개</h3>
                <p className="text-gray-700">{userInfo.bio}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 제안한 프로젝트 */}
            <div>
              <h2 className="text-lg font-medium mb-4">제안한 프로젝트</h2>
              <div className="space-y-4">
                {proposedProjects.length > 0 ? (
                  proposedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{project.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            project.status === "모집중"
                              ? "bg-green-50 text-green-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {project.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        지원자 {project.applicants}명
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-500 text-sm">
                      제안한 프로젝트가 없습니다
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 참여중인 프로젝트 */}
            {userInfo.role === "학생" && (
              <div>
                <h2 className="text-lg font-medium mb-4">참여중인 프로젝트</h2>
                <div className="space-y-4">
                  {acceptedProjects.length > 0 ? (
                    acceptedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{project.title}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                            {project.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {project.description}
                        </p>
                        <p className="text-xs text-gray-500">{project.role}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                      <p className="text-gray-500 text-sm">
                        참여중인 프로젝트가 없습니다
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
