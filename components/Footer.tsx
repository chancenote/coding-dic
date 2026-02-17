"use client";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border" role="contentinfo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center space-y-3">
        <blockquote className="text-caption text-text-secondary italic leading-relaxed">
          <p>&ldquo;Any sufficiently advanced technology is indistinguishable from magic.</p>
          <p>충분히 발달한 기술은 마법과 구별할 수 없다.&rdquo;</p>
        </blockquote>
        <p className="text-micro text-text-tertiary">
          찬스노트-코딩용어사전
        </p>
      </div>
    </footer>
  );
}
