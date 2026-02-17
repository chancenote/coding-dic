export interface DictionaryTerm {
  id: string;
  term: string;
  aliases: string[];
  category: Category;
  definition: string;
  analogy: string;
  example: string;
  related: string[];
}

export type Category = "기본개념" | "웹개발" | "데이터AI";

export interface Dictionary {
  terms: DictionaryTerm[];
}

export interface SearchResult {
  found: boolean;
  term?: DictionaryTerm;
  matchType?: "exact" | "alias" | "partial" | "definition";
  suggestions?: DictionaryTerm[];
}

export interface SearchHistoryItem {
  term: string;
  category: Category | "AI검색";
  timestamp: string;
  found: boolean;
}

export interface NotionLogPayload {
  term: string;
  definition?: string;
  analogy?: string;
  example?: string;
  source: "내장사전" | "AI검색";
}
