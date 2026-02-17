import { NextRequest, NextResponse } from "next/server";
import { searchTerm, getRandomTerm, getAllTerms, getTermsByCategory } from "@/lib/search";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const mode = searchParams.get("mode");

  // 랜덤 용어
  if (mode === "random") {
    const term = getRandomTerm();
    return NextResponse.json({ found: true, term, matchType: "exact" });
  }

  // 전체 용어 목록
  if (mode === "all") {
    const category = searchParams.get("category");
    const terms = category ? getTermsByCategory(category) : getAllTerms();
    return NextResponse.json({ terms });
  }

  if (!query) {
    return NextResponse.json(
      { error: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  const result = searchTerm(query);
  return NextResponse.json(result);
}
