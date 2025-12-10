import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="w-full border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-6">
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Image src="/PLZBlackLogo.png" alt="PLZ 로고" width={40} height={40} className="object-contain" />
        </div>
        <nav className="flex gap-6 sm:gap-8">
          <Link href="/about" className="text-md font-medium text-slate-800 hover:text-black transition-colors ">
            쌀먹단
          </Link>
        </nav>
      </div>
    </footer>
  );
}
