'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className="text-sm font-medium hover:text-primary relative pb-1">
        {children}
        {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3D87C7]" />}
      </Link>
    );
  };

  // 로그인 상태 판단 (간단히 localStorage의 'token' 존재 여부로 확인)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Image src="/PLZBlackLogo.png" alt="PLZ 로고" width={40} height={40} className="object-contain" />
        </Link>
        <nav className="hidden md:flex gap-6">
          <NavLink href="/">홈</NavLink>
          <NavLink href="/ideas/teachers">선생님 아이디어</NavLink>
          <NavLink href="/ideas/students">학생 아이디어</NavLink>
          <NavLink href="/ideas/new">아이디어 추가</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link href="/profile" aria-label="프로필으로 이동" className="flex items-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21v-1c0-2.761-4.03-5-8-5s-8 2.239-8 5v1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>프로필</span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                로그인
              </Link>
              <Button asChild size="sm">
                <Link href="/signup">회원가입</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
