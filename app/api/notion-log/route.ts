import { NextRequest, NextResponse } from "next/server";
import { logToNotion } from "@/lib/notion";
import { NotionLogPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: NotionLogPayload = await request.json();

    if (!body.term) {
      return NextResponse.json(
        { error: "용어가 필요합니다." },
        { status: 400 }
      );
    }

    // 비동기로 Notion에 기록 (결과를 기다리지 않음)
    logToNotion(body).catch((err) => {
      console.error("[Notion] 비동기 로깅 실패:", err);
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
