import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BookOpen, MessageSquare, ChevronRight, Lightbulb, GraduationCap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 gap-8">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <img src="/PLZLogo.svg" alt="PLZ Logo" className="w-[6rem] pb-3" />
                    프로젝트 아이디어 공유 플랫폼
                  </h1>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/ideas/teachers">
                    <Button size="lg" className="gap-1">
                      선생님 아이디어 보기 <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/ideas/students">
                    <Button variant="outline" size="lg">
                      학생들 아이디어 보기
                    </Button>
                  </Link>
                </div>
              </div>
              <Link href="/smallJM">
                <Image
                  src="/SsalmukdanLogo.png?height=450&width=450"
                  width={450}
                  height={450}
                  alt="Collaboration illustration"
                  className="ml-24 mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-32 lg:py-40 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900">PLZ ?</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#3D87C7] to-blue-400 mx-auto rounded-full"></div>
                <p className="max-w-[900px] text-lg text-slate-600 md:text-xl/relaxed leading-relaxed">
                  선생님들이 학교에 필요한 서비스 아이디어를 제안하고,
                  <br />
                  학생들이 그 아이디어를 실제로 구현할 수 있도록 돕는 서비스입니다.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-4 lg:grid-cols-3 lg:gap-8">
              <div className="flex flex-col items-center space-y-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-md hover:shadow-xl hover:border-[#3D87C7] transition-all duration-300 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3D87C7]/20 to-blue-100 group-hover:from-[#3D87C7]/30 group-hover:to-blue-200 transition-all">
                  <Lightbulb className="h-7 w-7 text-[#3D87C7]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">선생님 아이디어</h3>
                <p className="text-center text-slate-600 leading-relaxed">
                  선생님이 학교에서 필요하다고 생각하는 서비스 아이디어를 제안하고, 학생들은 그 아이디어를 실제로
                  구현합니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-md hover:shadow-xl hover:border-[#3D87C7] transition-all duration-300 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3D87C7]/20 to-blue-100 group-hover:from-[#3D87C7]/30 group-hover:to-blue-200 transition-all">
                  <GraduationCap className="h-7 w-7 text-[#3D87C7]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">학생 아이디어</h3>
                <p className="text-center text-slate-600 leading-relaxed">
                  학생들이 학교에서 만들고 싶은 서비스를 제안하고, 선생님들이 실제 학교 시스템에서 활용할 수 있도록
                  지원합니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-md hover:shadow-xl hover:border-[#3D87C7] transition-all duration-300 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3D87C7]/20 to-blue-100 group-hover:from-[#3D87C7]/30 group-hover:to-blue-200 transition-all">
                  <MessageSquare className="h-7 w-7 text-[#3D87C7]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">지속적인 소통</h3>
                <p className="text-center text-slate-600 leading-relaxed">
                  아이디어 내에서 지속적인 소통을 통해 서비스 개발과 유지보수, 아이디어의 확장을 돕습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-32 lg:py-40 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter ">아이디어를 실현할 준비가 되셨나요?</h2>
                <p className="max-w-[900px] text-lg md:text-xl/relaxed leading-relaxed">
                  지금 PLZ에 참여하여 선생님과 학생들과 연결하고 아이디어를 현실로 만들어보세요.
                </p>
              </div>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="mt-6 gap-2 bg-white text-black hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  지금 시작하기 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
