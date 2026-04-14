# AX Flow Knowledge Hub — Ontology Demo

제조 그룹사 DW 온톨로지 지식허브 데모 UI.

## 실행

```bash
cd /Users/ma_l/Downloads/claude/ecopro-demo
npm install
npm run dev
# → http://localhost:3100
```

## 5 Steps

1. `/sources` — 데이터 커넥션 & 업로드 (OCR 파이프라인 연출)
2. `/chunking` — Chunking Studio (청크 편집, bge-small ONNX 어필)
3. `/graph` — Knowledge Graph (force-graph 인터랙티브)
4. `/ask` — Ask ax flow (스트리밍 답변 + 근거 드로어 + ⚡Performance)
5. `/audit` — AX Guard (감사로그 + 권한 매트릭스)

## 스택
- Next.js 16.2.1 App Router / React 19
- Tailwind + framer-motion
- react-force-graph-2d
- 데이터: `lib/mockData.ts` (모두 mock)

## 브랜드
AX Flow 가이드 v3: Blue #3B82F6 + Neon Green #00FF85 + Outfit/Pretendard.
