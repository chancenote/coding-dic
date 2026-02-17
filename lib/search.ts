import { DictionaryTerm, SearchResult, Dictionary } from "./types";
import dictionaryData from "@/data/dictionary.json";

const dictionary: Dictionary = dictionaryData as Dictionary;

export function searchTerm(query: string): SearchResult {
  const q = query.trim().toLowerCase();

  if (!q) {
    return { found: false };
  }

  // 1) term 정확 매칭 (대소문자 무시)
  const exactMatch = dictionary.terms.find(
    (t) => t.term.toLowerCase() === q
  );
  if (exactMatch) {
    return { found: true, term: exactMatch, matchType: "exact" };
  }

  // 2) aliases 매칭
  const aliasMatch = dictionary.terms.find((t) =>
    t.aliases.some((a) => a.toLowerCase() === q)
  );
  if (aliasMatch) {
    return { found: true, term: aliasMatch, matchType: "alias" };
  }

  // 3) term 또는 aliases 부분 매칭
  const partialMatches = dictionary.terms.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.aliases.some((a) => a.toLowerCase().includes(q))
  );
  if (partialMatches.length === 1) {
    return { found: true, term: partialMatches[0], matchType: "partial" };
  }
  if (partialMatches.length > 1) {
    return { found: true, term: partialMatches[0], matchType: "partial", suggestions: partialMatches.slice(1, 6) };
  }

  // 4) definition에서 키워드 검색
  const defMatches = dictionary.terms.filter((t) =>
    t.definition.toLowerCase().includes(q)
  );
  if (defMatches.length >= 1) {
    return { found: true, term: defMatches[0], matchType: "definition", suggestions: defMatches.slice(1, 6) };
  }

  return { found: false };
}

export function getRandomTerm(): DictionaryTerm {
  const idx = Math.floor(Math.random() * dictionary.terms.length);
  return dictionary.terms[idx];
}

export function getAllTerms(): DictionaryTerm[] {
  return dictionary.terms;
}

export function getTermsByCategory(category: string): DictionaryTerm[] {
  return dictionary.terms.filter((t) => t.category === category);
}

export function findTermByName(name: string): DictionaryTerm | undefined {
  const q = name.trim().toLowerCase();
  return dictionary.terms.find(
    (t) =>
      t.term.toLowerCase() === q ||
      t.aliases.some((a) => a.toLowerCase() === q)
  );
}
