"use client";

import { useState } from "react";
import { BookOpen, Target, Code2, Link2, Copy, Check, ChevronDown } from "lucide-react";
import { DictionaryTerm } from "@/lib/types";
import { showToast } from "./Toast";

interface ResultCardProps {
  term: DictionaryTerm;
  suggestions?: DictionaryTerm[];
  onRelatedClick: (term: string) => void;
}

const tagClass: Record<string, string> = {
  "기본개념": "tag-기본개념",
  "웹개발": "tag-웹개발",
  "데이터AI": "tag-데이터AI",
};

export default function ResultCard({ term, suggestions, onRelatedClick }: ResultCardProps) {
  const [codeCopied, setCodeCopied] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(term.example);
      setCodeCopied(true);
      showToast("코드가 복사되었어요!", "copy");
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      showToast("복사에 실패했어요", "error");
    }
  };

  const toggleMobileSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Desktop: bento card sections. Mobile: accordion.
  return (
    <div className="animate-fade-in space-y-4">
      {/* Title bar */}
      <div className="card px-6 py-5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`tag ${tagClass[term.category] || ""}`}>
            {term.category}
          </span>
          <h2 className="text-heading">{term.term}</h2>
        </div>
      </div>

      {/* Bento grid — desktop: 2-col, mobile: stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Definition card */}
        <section className="card p-5 md:p-6" aria-labelledby="def-heading">
          <button
            className="md:pointer-events-none w-full flex items-center justify-between md:mb-3"
            onClick={() => toggleMobileSection("def")}
            aria-expanded={openSection === "def"}
          >
            <h3 id="def-heading" className="flex items-center gap-2 text-subheading">
              <BookOpen size={18} className="text-accent flex-shrink-0" />
              정의
            </h3>
            <ChevronDown size={16} className={`md:hidden text-text-tertiary transition-transform ${openSection === "def" ? "rotate-180" : ""}`} />
          </button>
          <div className={`mt-2 md:mt-0 md:block ${openSection === "def" || openSection === null ? "block" : "hidden"}`}>
            <p className="text-body text-text-secondary leading-relaxed">{term.definition}</p>
          </div>
        </section>

        {/* Analogy card — highlighted */}
        <section className="card p-5 md:p-6 bg-accent-soft border-accent/20" aria-labelledby="analogy-heading">
          <button
            className="md:pointer-events-none w-full flex items-center justify-between md:mb-3"
            onClick={() => toggleMobileSection("analogy")}
            aria-expanded={openSection === "analogy"}
          >
            <h3 id="analogy-heading" className="flex items-center gap-2 text-subheading">
              <Target size={18} className="text-accent flex-shrink-0" />
              쉬운 비유
            </h3>
            <ChevronDown size={16} className={`md:hidden text-text-tertiary transition-transform ${openSection === "analogy" ? "rotate-180" : ""}`} />
          </button>
          <div className={`mt-2 md:mt-0 md:block ${openSection === "analogy" || openSection === null ? "block" : "hidden"}`}>
            <p className="text-body text-text-secondary leading-relaxed">{term.analogy}</p>
          </div>
        </section>

        {/* Code example card — full width */}
        <section className="card p-5 md:p-6 md:col-span-2" aria-labelledby="code-heading">
          <button
            className="md:pointer-events-none w-full flex items-center justify-between md:mb-3"
            onClick={() => toggleMobileSection("code")}
            aria-expanded={openSection === "code"}
          >
            <h3 id="code-heading" className="flex items-center gap-2 text-subheading">
              <Code2 size={18} className="text-accent flex-shrink-0" />
              코드 예시
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); copyCode(); }}
                className="focus-ring flex items-center gap-1.5 px-3 py-1.5 text-micro rounded-lg bg-surface-secondary hover:bg-border transition-colors"
                aria-label="코드 복사"
              >
                {codeCopied ? <Check size={13} /> : <Copy size={13} />}
                <span className="hidden sm:inline">{codeCopied ? "복사됨" : "복사"}</span>
              </button>
              <ChevronDown size={16} className={`md:hidden text-text-tertiary transition-transform ${openSection === "code" ? "rotate-180" : ""}`} />
            </div>
          </button>
          <div className={`mt-2 md:mt-0 md:block ${openSection === "code" || openSection === null ? "block" : "hidden"}`}>
            <pre className="p-4 overflow-x-auto">
              <code className="font-mono">{term.example}</code>
            </pre>
          </div>
        </section>
      </div>

      {/* Related terms */}
      <section className="card p-5 md:p-6" aria-labelledby="related-heading">
        <h3 id="related-heading" className="flex items-center gap-2 text-subheading mb-3">
          <Link2 size={18} className="text-accent flex-shrink-0" />
          관련 용어
        </h3>
        <div className="flex flex-wrap gap-2">
          {term.related.map((r) => (
            <button
              key={r}
              onClick={() => onRelatedClick(r)}
              className="focus-ring tag bg-surface-secondary text-text-secondary hover:bg-accent-soft hover:text-accent transition-colors cursor-pointer"
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      {/* Suggestion cards */}
      {suggestions && suggestions.length > 0 && (
        <div className="p-4 bg-surface-secondary rounded-2xl animate-fade-in">
          <p className="text-micro text-text-tertiary mb-2">이런 용어도 찾으셨나요?</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => onRelatedClick(s.term)}
                className="focus-ring tag bg-surface-elevated border border-border hover:border-accent transition-colors"
              >
                {s.term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
