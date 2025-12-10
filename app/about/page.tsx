import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';
import Navbar from '@/components/navbar';

interface Contributor {
  name: string;
  role: string;
  githubUsername: string;
  avatarUrl: string;
}

const contributors: Contributor[] = [
  {
    name: '이세민',
    role: 'Backend Developer',
    githubUsername: 'wwwcomcomcomcom',
    avatarUrl: 'https://github.com/wwwcomcomcomcom.png',
  },
  {
    name: '정효주',
    role: 'Frontend Developer',
    githubUsername: 'h-0y28',
    avatarUrl: 'https://github.com/h-0y28.png',
  },
  {
    name: '서정민',
    role: 'QA Engineer',
    githubUsername: '',
    avatarUrl: '',
  },
  {
    name: '김담율',
    role: '',
    githubUsername: 'DAMNyul',
    avatarUrl: 'https://github.com/DAMNyul.png',
  },
  {
    name: '임한솔',
    role: '',
    githubUsername: 'h-x0-i1',
    avatarUrl: 'https://github.com/h-x0-i1.png',
  },
  {
    name: '문승덕',
    role: '',
    githubUsername: '',
    avatarUrl: '',
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">쌀먹단</h1>
            <p className="text-lg text-muted-foreground">PLZ 프로젝트에 기여한 개발자들을 소개합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributors.map((contributor, index) => (
              <Link
                key={index}
                href={`https://github.com/${contributor.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-card p-6 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={contributor.avatarUrl}
                      alt={`${contributor.name}의 GitHub 프로필`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{contributor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{contributor.role}</p>
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Github className="h-4 w-4" />
                    <span className="text-sm">@{contributor.githubUsername}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
