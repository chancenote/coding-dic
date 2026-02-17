import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://coding-dic.vercel.app"),
  title: "찬스노트-코딩용어사전",
  description: "코딩 초보자를 위한 프로그래밍 용어사전. 쉬운 비유와 예시 코드로 어려운 개발 용어를 설명합니다.",
  keywords: ["코딩", "프로그래밍", "용어사전", "초보자", "개발", "찬스노트"],
  openGraph: {
    title: "찬스노트-코딩용어사전",
    description: "쉬운 비유와 예시 코드로 배우는 코딩 용어사전. 60개 용어를 쉬운 비유와 코드 예시로 설명합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "찬스노트-코딩용어사전",
    url: "https://coding-dic.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "찬스노트-코딩용어사전",
    description: "쉬운 비유와 예시 코드로 배우는 코딩 용어사전",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
