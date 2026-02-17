"use client";

import { useRef, useEffect, useState } from "react";
import { Search, Loader2, Command } from "lucide-react";
import { SearchHistoryItem } from "@/lib/types";

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  loading: boolean;
  history: SearchHistoryItem[];
}

const SUGGESTED_TAGS = ["API", "변수", "Git", "React", "함수", "데이터베이스", "프론트엔드", "JSON"];

export default function SearchBar({ query, setQuery, onSearch, loading, history }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-focus + global keyboard shortcut
  useEffect(() => {
    inputRef.current?.focus();

    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName))) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    if (history.length > 0 && !query) {
      setShowDropdown(true);
    }
  };

  const handleChange = (val: string) => {
    setQuery(val);
    setShowGuide(val.length > 0 && val.length < 2);
    if (!val && history.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const recentItems = history.slice(0, 5);

  return (
    <div className="w-full max-w-2xl mx-auto" ref={wrapperRef} role="search">
      <label htmlFor="search-input" className="sr-only">코딩 용어 검색</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
          {loading ? (
            <Loader2 size={20} className="text-text-tertiary animate-spin" />
          ) : (
            <Search size={20} className="text-text-tertiary" />
          )}
        </div>
        <input
          id="search-input"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="궁금한 코딩 용어를 검색하세요..."
          autoComplete="off"
          className="focus-ring w-full pl-12 pr-28 py-4 text-body rounded-2xl border-2 border-border bg-surface-elevated placeholder:text-text-tertiary focus:border-accent transition-all duration-200 shadow-card"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <kbd className="kbd hidden sm:flex" aria-label="Ctrl+K로 검색창 포커스">
            <Command size={10} />K
          </kbd>
          <button
            onClick={() => { if (query.trim()) { onSearch(query.trim()); setShowDropdown(false); } }}
            disabled={!query.trim() || loading}
            className="focus-ring px-4 py-2 bg-accent text-white rounded-xl text-caption font-semibold hover:bg-accent-hover disabled:opacity-40 transition-all duration-150"
            aria-label="검색"
          >
            검색
          </button>
        </div>

        {/* Recent searches dropdown */}
        {showDropdown && recentItems.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 card p-2 shadow-elevated z-30 animate-scale-in" role="listbox" aria-label="최근 검색어">
            <p className="px-3 py-1.5 text-micro text-text-tertiary">최근 검색</p>
            {recentItems.map((item, idx) => (
              <button
                key={`${item.term}-${idx}`}
                role="option"
                aria-selected={false}
                onClick={() => {
                  setQuery(item.term);
                  onSearch(item.term);
                  setShowDropdown(false);
                }}
                className="focus-ring w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-secondary transition-colors text-caption"
              >
                <Search size={14} className="text-text-tertiary flex-shrink-0" />
                <span className="truncate">{item.term}</span>
                <span className={`tag ml-auto flex-shrink-0 tag-${item.category === "AI검색" ? "AI검색" : item.category}`}>
                  {item.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Micro-copy guide */}
      {showGuide && (
        <p className="text-center text-micro text-text-tertiary mt-2 animate-fade-in" role="status">
          2글자 이상 입력하면 더 정확한 결과를 찾을 수 있어요
        </p>
      )}

      {/* Suggested tags */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center" role="group" aria-label="추천 검색어">
        {SUGGESTED_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag);
              onSearch(tag);
              setShowDropdown(false);
            }}
            className="focus-ring tag bg-surface-secondary text-text-secondary hover:bg-accent-soft hover:text-accent transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
