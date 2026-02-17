import { Client } from "@notionhq/client";
import { NotionLogPayload } from "./types";

function getNotionClient(): Client | null {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey || apiKey === "여기에_노션_API_키") {
    return null;
  }
  return new Client({ auth: apiKey });
}

function getDatabaseId(): string | null {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id || id === "여기에_데이터베이스_ID") {
    return null;
  }
  return id;
}

export async function logToNotion(payload: NotionLogPayload): Promise<boolean> {
  try {
    const notion = getNotionClient();
    const databaseId = getDatabaseId();

    if (!notion || !databaseId) {
      console.log("[Notion] API 키 또는 데이터베이스 ID가 설정되지 않아 로깅을 건너뜁니다.");
      return false;
    }

    // 중복 검색: 같은 용어가 이미 있는지 확인
    const existing = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "용어",
        title: {
          equals: payload.term,
        },
      },
    });

    if (existing.results.length > 0) {
      // 이미 존재하면 검색일시만 업데이트
      const pageId = existing.results[0].id;
      await notion.pages.update({
        page_id: pageId,
        properties: {
          "검색일시": {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      });
      return true;
    }

    // 새 항목 생성
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "용어": {
          title: [
            {
              text: {
                content: payload.term,
              },
            },
          ],
        },
        "정의": {
          rich_text: [
            {
              text: {
                content: payload.definition || "",
              },
            },
          ],
        },
        "비유": {
          rich_text: [
            {
              text: {
                content: payload.analogy || "",
              },
            },
          ],
        },
        "코드예시": {
          rich_text: [
            {
              text: {
                content: (payload.example || "").slice(0, 2000),
              },
            },
          ],
        },
        "출처": {
          select: {
            name: payload.source,
          },
        },
        "검색일시": {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    return true;
  } catch (error) {
    console.error("[Notion] 로깅 실패:", error);
    return false;
  }
}
