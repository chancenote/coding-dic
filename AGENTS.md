# AGENTS.md — 찬스노트-코딩용어사전

## Git 커밋 컨벤션

### 형식

```
<gitmoji> <type>: <한국어 설명>

<본문 (선택)>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Type + Gitmoji 매핑

| Gitmoji | Type | 설명 |
|---------|------|------|
| ✨ | feat | 새로운 기능 추가 |
| 🐛 | fix | 버그 수정 |
| 💄 | style | UI/UX/스타일 변경 (기능 변화 없음) |
| ♻️ | refactor | 리팩토링 (기능 변화 없음) |
| 📝 | docs | 문서 추가/수정 |
| 🔧 | chore | 설정, 빌드, 패키지 등 잡일 |
| ✅ | test | 테스트 추가/수정 |
| 🚀 | deploy | 배포 관련 |
| 🔥 | remove | 코드/파일 삭제 |
| 🚑 | hotfix | 긴급 수정 |
| ➕ | deps | 의존성 추가 |
| ➖ | deps | 의존성 제거 |
| 🎨 | improve | 코드 구조/포맷 개선 |
| 🔒 | security | 보안 관련 |
| 🏷️ | types | 타입 정의 추가/수정 |
| ♿ | a11y | 접근성 개선 |
| 🌐 | i18n | 다국어/번역 |
| 🗃️ | db | 데이터베이스/스키마 변경 |

### 규칙

- 제목은 **50자 이내**, 한국어로 작성
- 제목에 마침표(.) 붙이지 않음
- 본문은 **왜(why)** 위주로, 필요할 때만 작성
- Claude가 작성한 커밋에는 항상 `Co-Authored-By` 포함

### 예시

```
✨ feat: 검색 결과에 관련 용어 추천 기능 추가
```

```
🐛 fix: 다크모드에서 코드 블록 배경색 안 보이는 문제 수정

코드 블록 bg가 surface와 동일해서 구분 불가.
code-bg 토큰을 별도 지정하여 해결.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

```
🔧 chore: Vercel 배포 설정 및 프레임워크 지정
```

```
💄 style: 모바일 검색창 여백 및 태그 크기 조정
```
