"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import api from "@/lib/apiAxios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  major?: string;
  skills?: string[];
  bio?: string;
  workPlace?: string;
  studentId?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await api.get("/auth/me");
        setUserInfo(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    if (!confirm("정말로 로그아웃하시겠습니까?")) return;
    try {
      localStorage.removeItem("authToken");
    } catch {
      // 무시
    }
    window.location.href = "/";
  };

  // TODO: 실제 프로젝트 데이터는 API에서 가져와야 함
  const proposedProjects: any[] = [];
  const acceptedProjects: any[] = [];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

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

              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium border"
              >
                로그아웃
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    역할
                  </h3>
                  <p>{userInfo.role === "TEACHER" ? "선생님" : "학생"}</p>
                </div>
                {userInfo.role === "STUDENT" && userInfo.studentId && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      학번
                    </h3>
                    <p>{userInfo.studentId}</p>
                  </div>
                )}
                {userInfo.role === "TEACHER" && userInfo.workPlace && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      담당부서
                    </h3>
                    <p>{userInfo.workPlace}</p>
                  </div>
                )}
                {userInfo.major && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      전공
                    </h3>
                    <p>{userInfo.major}</p>
                  </div>
                )}
              </div>

              {userInfo.skills && userInfo.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    기술
                  </h3>
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
              )}

              {userInfo.bio && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    소개
                  </h3>
                  <p className="text-gray-700">{userInfo.bio}</p>
                </div>
              )}
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
                          STUDENT
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
      <Footer />
    </div>
  );
}
