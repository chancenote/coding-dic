"use client";

import { ExternalLink, Copy, BookX } from "lucide-react";
import { showToast } from "./Toast";

interface NotFoundCardProps {
  query: string;
}

function buildPrompt(query: string): string {
  return `코딩 초보자인 제가 "${query}"라는 용어를 이해하고 싶어요. 아래 형식으로 설명해주세요:

📖 정의: 한국어로 2-3문장으로 핵심만 쉽게

🎯 쉬운 비유: 초등학생도 이해할 수 있는 일상생활 비유 ("마치 ~와 같아요" 형식)

💻 코드 예시: JavaScript로 간단한 예시 3-5줄

🔗 관련 용어: 함께 알면 좋은 용어 3개`;
}

export default function NotFoundCard({ query }: NotFoundCardProps) {
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt(query));
      showToast("프롬프트가 복사되었어요!", "copy");
    } catch {
      showToast("복사에 실패했어요. 직접 복사해주세요.", "error");
    }
  };

  const askClaude = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt(query));
      showToast("프롬프트가 복사되었어요! Claude 채팅창에 붙여넣기(Ctrl+V) 하세요", "success");
    } catch {
      // copy failed, still open tab
    }
    window.open("https://claude.ai/new", "_blank", "noopener");
  };

  return (
    <div className="animate-fade-in">
      <div className="card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-tag-orange-bg flex items-center justify-center">
          <BookX size={28} className="text-tag-orange" />
        </div>

        <h2 className="text-heading mb-2">
          &apos;{query}&apos;
        </h2>
        <p className="text-body text-text-secondary mb-1">
          아직 사전에 없는 용어예요
        </p>
        <p className="text-caption text-text-tertiary mb-8">
          Claude에게 직접 물어보세요! 프롬프트가 자동으로 복사됩니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={askClaude}
            className="focus-ring inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-2xl font-semibold hover:bg-accent-hover transition-colors shadow-card"
          >
            <ExternalLink size={16} />
            Claude에게 물어보기
          </button>
          <button
            onClick={copyPrompt}
            className="focus-ring inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-secondary rounded-2xl font-medium text-text-secondary hover:bg-border transition-colors"
          >
            <Copy size={16} />
            프롬프트 복사하기
          </button>
        </div>

        {/* Prompt preview */}
        <details className="mt-8 text-left">
          <summary className="text-micro text-text-tertiary cursor-pointer hover:text-text-secondary transition-colors">
            복사될 프롬프트 미리보기
          </summary>
          <pre className="mt-3 p-4 bg-surface-secondary rounded-2xl text-caption text-text-secondary whitespace-pre-wrap overflow-x-auto border border-border">
            {buildPrompt(query)}
          </pre>
        </details>
      </div>
    </div>
  );
}
