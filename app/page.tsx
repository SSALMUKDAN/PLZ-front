import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  MessageSquare,
  ChevronRight,
  Lightbulb,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
                    PLZ<br></br>프로젝트 아이디어 공유 플랫폼
                  </h1>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    선생님의 아이디어 보기 <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    학생들의 아이디어 보기
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Collaboration illustration"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  PLZ에 대해서
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  선생님들이 학교에 있으면 좋겠는 서비스 아이디어를 제안하고,
                  <br />
                  학생들이 그 아이디어를 실제로 구현하는 프로젝트를 진행할 수
                  있도록 돕는 서비스 입니다.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">선생님의 생각</h3>
                <p className="text-center text-muted-foreground">
                  선생님이 학교에서 필요하다고 생각하는 서비스 아이디어를
                  제안하고, 학생들은 그 아이디어에 맞추어 학교 시스템에 통합되는
                  서비스를 제작합니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">학생들의 생각</h3>
                <p className="text-center text-muted-foreground">
                  학생들이 학교에서 만들고 싶은 서비스를 제안하고, 관심있는
                  선생님들이 해당 서비스를 실제로 학교 시스템에서 사용할 수
                  있도록 돕습니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">지속적인 소통</h3>
                <p className="text-center text-muted-foreground">
                  아이디어 내에서 지속적인 소통을 통해 서비스의 필요성을
                  가늠하고, 서비스의 지속적인 개발과 유지보수, 아이디어의 확장을
                  돕습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  아이디어를 낼 준비가 되셨나요?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  지금 PLZ에 참여하여 선생님 및 학생들과 연결하여 아이디어를
                  실현해보세요.
                </p>
              </div>
              <Link href="/signup">
                <Button size="lg" className="mt-4 gap-1">
                  시작하기 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">PLZ</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PLZ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
