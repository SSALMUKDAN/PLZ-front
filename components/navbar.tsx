import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">PLZ</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            프로젝트 소개
          </Link>
          <Link
            href="/ideas/teachers"
            className="text-sm font-medium hover:text-primary"
          >
            선생님의 생각
          </Link>
          <Link
            href="/ideas/students"
            className="text-sm font-medium hover:text-primary"
          >
            학생들의 생각
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            로그인
          </Link>
          <Button asChild size="sm">
            <Link href="/signup">회원가입</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
