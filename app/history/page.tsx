"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Search, ArrowLeft, Calendar, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SearchHistoryItem } from "@/lib/types";

const TABS = [
  { label: "전체", value: "전체" },
  { label: "최근 7일", value: "7days" },
  { label: "기본개념", value: "기본개념" },
  { label: "웹개발", value: "웹개발" },
  { label: "데이터AI", value: "데이터AI" },
  { label: "AI검색", value: "AI검색" },
] as const;

const SUGGESTED = ["변수", "함수", "클래스", "비동기", "배열"];

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "방금 전";
  if (mins < 60) return `${mins}분 전`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}시간 전`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}일 전`;
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("전체");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("search-history");
    if (stored) {
      try { setHistory(JSON.parse(stored)); } catch { /* skip */ }
    }
  }, []);

  const filtered = (() => {
    if (activeTab === "전체") return history;
    if (activeTab === "7days") {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return history.filter((h) => new Date(h.timestamp).getTime() > weekAgo);
    }
    return history.filter((h) => h.category === activeTab);
  })();

  const clearHistory = () => {
    localStorage.removeItem("search-history");
    setHistory([]);
    setShowDeleteModal(false);
  };

  const handleItemClick = (term: string) => {
    router.push(`/?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Title bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="focus-ring w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-secondary transition-colors"
              aria-label="홈으로"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-heading">검색 기록</h1>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="focus-ring flex items-center gap-1.5 px-3 py-2 text-micro text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 size={14} />
              전체 삭제
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" role="tablist" aria-label="카테고리 필터">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`focus-ring tag whitespace-nowrap transition-colors ${
                activeTab === tab.value
                  ? "bg-accent text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-accent-soft hover:text-accent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* History list */}
        {filtered.length === 0 ? (
          <div className="card p-12 text-center animate-fade-in">
            <Calendar size={40} className="mx-auto mb-4 text-text-tertiary" />
            <p className="text-body text-text-secondary mb-2">
              {activeTab === "전체" ? "검색 기록이 없어요" : `${activeTab === "7days" ? "최근 7일" : activeTab} 기록이 없어요`}
            </p>
            <p className="text-caption text-text-tertiary mb-6">
              아래 추천 검색어로 시작해보세요
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => handleItemClick(s)}
                  className="focus-ring tag bg-surface-secondary text-text-secondary hover:bg-accent-soft hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2" role="list" aria-label="검색 기록 목록">
            {filtered.map((item, idx) => (
              <button
                key={`${item.term}-${idx}`}
                role="listitem"
                onClick={() => handleItemClick(item.term)}
                className="card-interactive w-full text-left p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Search size={15} className="text-text-tertiary flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-body truncate">{item.term}</span>
                      <span className={`tag flex-shrink-0 tag-${item.category === "AI검색" ? "AI검색" : item.category}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-micro text-text-tertiary whitespace-nowrap flex-shrink-0">
                  {relativeTime(item.timestamp)}
                </span>
              </button>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="기록 삭제 확인">
          <div className="card p-6 w-full max-w-sm shadow-elevated animate-scale-in text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <h2 className="text-subheading mb-2">검색 기록을 모두 삭제할까요?</h2>
            <p className="text-caption text-text-secondary mb-6">삭제된 기록은 복구할 수 없어요.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="focus-ring flex-1 py-2.5 rounded-xl bg-surface-secondary text-text-secondary hover:bg-border transition-colors font-medium text-caption"
              >
                취소
              </button>
              <button
                onClick={clearHistory}
                className="focus-ring flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors font-medium text-caption"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
