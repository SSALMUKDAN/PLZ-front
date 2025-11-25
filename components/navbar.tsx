'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
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
