"use client";

import Link from "next/link";
import { History, BookOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-surface/80 border-b border-border" role="banner">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between" aria-label="메인 내비게이션">
        <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-lg -ml-1 px-1 py-0.5">
          <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
            <BookOpen size={16} className="text-white" />
          </div>
          <span className="font-bold text-body tracking-tight">
            <span className="text-accent">찬스노트</span>
            <span className="text-text-secondary">-코딩용어사전</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/history"
            className="focus-ring flex items-center gap-1.5 px-3 py-2 text-caption text-text-secondary rounded-xl hover:bg-surface-secondary transition-colors"
          >
            <History size={15} />
            <span className="hidden sm:inline">검색기록</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
