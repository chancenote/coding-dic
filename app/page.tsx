"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Grid3X3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import NotFoundCard from "@/components/NotFoundCard";
import RecentSearches from "@/components/RecentSearches";
import ToastContainer from "@/components/Toast";
import { DictionaryTerm, SearchHistoryItem, SearchResult } from "@/lib/types";

const tagClass: Record<string, string> = {
  "기본개념": "tag-기본개념",
  "웹개발": "tag-웹개발",
  "데이터AI": "tag-데이터AI",
};

function HomeContent() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [randomTerm, setRandomTerm] = useState<DictionaryTerm | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [showAllTerms, setShowAllTerms] = useState(false);
  const [allTerms, setAllTerms] = useState<DictionaryTerm[]>([]);
  const [allTermsCategory, setAllTermsCategory] = useState<string>("");

  const saveHistory = useCallback((item: SearchHistoryItem) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.term !== item.term);
      const updated = [item, ...filtered].slice(0, 50);
      localStorage.setItem("search-history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logToNotion = useCallback((term: DictionaryTerm | null, searchQuery: string, found: boolean) => {
    const payload = found && term
      ? {
          term: term.term,
          definition: term.definition,
          analogy: term.analogy,
          example: term.example,
          source: "내장사전" as const,
        }
      : {
          term: searchQuery,
          source: "AI검색" as const,
        };

    fetch("/api/notion-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setResult(null);
    setShowAllTerms(false);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data: SearchResult = await res.json();
      setResult(data);

      saveHistory({
        term: searchQuery,
        category: data.found && data.term ? data.term.category : "AI검색",
        timestamp: new Date().toISOString(),
        found: data.found,
      });

      logToNotion(data.term || null, searchQuery, data.found);
    } catch {
      setResult({ found: false });
    } finally {
      setLoading(false);
    }
  }, [saveHistory, logToNotion]);

  useEffect(() => {
    const stored = localStorage.getItem("search-history");
    if (stored) {
      try { setHistory(JSON.parse(stored)); } catch { /* skip */ }
    }
  }, []);

  useEffect(() => {
    fetch("/api/search?mode=random")
      .then((res) => res.json())
      .then((data) => { if (data.term) setRandomTerm(data.term); })
      .catch(() => {});
  }, []);

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  const handleRelatedClick = (term: string) => {
    setQuery(term);
    handleSearch(term);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadAllTerms = async (category?: string) => {
    setShowAllTerms(true);
    setResult(null);
    const url = category
      ? `/api/search?mode=all&category=${encodeURIComponent(category)}`
      : "/api/search?mode=all";
    try {
      const res = await fetch(url);
      const data = await res.json();
      setAllTerms(data.terms || []);
      setAllTermsCategory(category || "");
    } catch {
      setAllTerms([]);
    }
  };

  return (
    <>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Search */}
        <section>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            loading={loading}
            history={history}
          />
        </section>

        {/* Recent searches (when no result shown) */}
        {!result && !showAllTerms && (
          <RecentSearches history={history} onItemClick={handleRelatedClick} />
        )}

        {/* Skeleton */}
        {loading && (
          <div className="space-y-4 animate-fade-in" aria-busy="true" aria-label="검색 중">
            <div className="card p-6">
              <div className="skeleton h-7 w-32 mb-4" />
              <div className="skeleton h-4 w-full mb-2" />
              <div className="skeleton h-4 w-3/4 mb-6" />
              <div className="skeleton h-24 w-full mb-4" />
              <div className="skeleton h-36 w-full" />
            </div>
          </div>
        )}

        {/* Search result */}
        {!loading && result && (
          result.found && result.term ? (
            <ResultCard
              term={result.term}
              suggestions={result.suggestions}
              onRelatedClick={handleRelatedClick}
            />
          ) : (
            <NotFoundCard query={query} />
          )
        )}

        {/* All terms view */}
        {showAllTerms && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="카테고리 필터">
              {[
                { label: "전체", value: "" },
                { label: "기본개념", value: "기본개념" },
                { label: "웹개발", value: "웹개발" },
                { label: "데이터AI", value: "데이터AI" },
              ].map((cat) => (
                <button
                  key={cat.label}
                  role="tab"
                  aria-selected={allTermsCategory === cat.value}
                  onClick={() => loadAllTerms(cat.value || undefined)}
                  className={`focus-ring tag transition-colors ${
                    allTermsCategory === cat.value
                      ? "bg-accent text-white"
                      : "bg-surface-secondary text-text-secondary hover:bg-accent-soft hover:text-accent"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {allTerms.map((t) => (
                <button
                  key={t.id}
                  role="listitem"
                  onClick={() => handleRelatedClick(t.term)}
                  className="card-interactive text-left p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`tag ${tagClass[t.category] || ""}`}>{t.category}</span>
                    <span className="font-semibold text-body">{t.term}</span>
                  </div>
                  <p className="text-caption text-text-secondary line-clamp-2">{t.definition}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty state: Random term + browse all */}
        {!loading && !result && !showAllTerms && (
          <div className="space-y-6 animate-slide-up">
            {/* Browse all link */}
            <div className="text-center">
              <button
                onClick={() => loadAllTerms()}
                className="focus-ring inline-flex items-center gap-2 text-caption text-accent hover:underline underline-offset-4"
              >
                <Grid3X3 size={14} />
                전체 용어 보기 (60개)
              </button>
            </div>

            {/* Term of the day */}
            {randomTerm && (
              <button
                onClick={() => handleRelatedClick(randomTerm.term)}
                className="w-full text-left card-interactive p-6 bg-gradient-to-br from-accent-soft to-surface-secondary"
              >
                <p className="flex items-center gap-2 text-micro font-semibold text-accent mb-3">
                  <Sparkles size={14} />
                  오늘의 용어
                </p>
                <h3 className="text-heading mb-2">{randomTerm.term}</h3>
                <p className="text-caption text-text-secondary leading-relaxed line-clamp-3">
                  {randomTerm.analogy}
                </p>
              </button>
            )}
          </div>
        )}
      </main>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
          <div className="skeleton h-14 w-full rounded-2xl" />
        </main>
      }>
        <HomeContent />
      </Suspense>
    </div>
  );
}
