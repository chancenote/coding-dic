"use client";

import { Clock } from "lucide-react";
import { SearchHistoryItem } from "@/lib/types";

interface RecentSearchesProps {
  history: SearchHistoryItem[];
  onItemClick: (term: string) => void;
}

export default function RecentSearches({ history, onItemClick }: RecentSearchesProps) {
  if (history.length === 0) return null;

  const recent = history.slice(0, 8);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
      <h3 className="flex items-center gap-1.5 text-micro text-text-tertiary mb-3">
        <Clock size={12} />
        최근 검색
      </h3>
      <div className="flex flex-wrap gap-2" role="list" aria-label="최근 검색 기록">
        {recent.map((item, idx) => (
          <button
            key={`${item.term}-${idx}`}
            role="listitem"
            onClick={() => onItemClick(item.term)}
            className="focus-ring flex items-center gap-1.5 px-3 py-1.5 text-caption rounded-xl bg-surface-secondary border border-border hover:border-accent hover:text-accent transition-colors"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.found ? "bg-emerald-400" : "bg-tag-orange"}`}
              aria-label={item.found ? "사전에 있는 용어" : "AI 검색 용어"}
            />
            {item.term}
          </button>
        ))}
      </div>
    </div>
  );
}
