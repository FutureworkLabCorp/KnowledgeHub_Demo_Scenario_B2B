export type DocKind = "pdf" | "excel" | "image" | "scan" | "dwg";

export interface MockDoc {
  id: string;
  name: string;
  kind: DocKind;
  source: string;
  pages?: number;
  page?: number;
  updated: string;
  snippet: string;
}

export const docs: MockDoc[] = [
  { id: "d1", name: "품질성적서_라인3_2025Q4.pdf", kind: "pdf", source: "QMS", pages: 12, page: 4, updated: "2025-12-27",
    snippet: "라인3 양극재 LCO-532 로트 L25-1117 입도분포 D50 규격 초과(관리상한 +7%). 재발방지 조치: 소성로 #3 가열 프로파일 재설정, SOP-Q-118 개정." },
  { id: "d2", name: "라인3_점검일지_수기.jpg", kind: "scan", source: "공유폴더(SMB)", page: 1, updated: "2025-11-29",
    snippet: "(OCR) 야간조 김○○ — 17:40 소성로#3 온도편차 ±8℃ 감지, 게이지 재보정. 상부 지시 없이 자체판단으로 보정 로그 미기재." },
  { id: "d3", name: "출하실적_2025Q4.xlsx", kind: "excel", source: "ERP(SAP)", updated: "2026-01-05",
    snippet: "L25-1117 로트 재작업 판정 — 출하 보류 142건, 내수재투입 38건, 폐기 6건." },
  { id: "d4", name: "MSDS_전구체_A사.pdf", kind: "pdf", source: "SharePoint", pages: 8, page: 3, updated: "2025-09-12",
    snippet: "공급사 A사 전구체 NCM-811 Ni 함량 스펙 80.5±0.3%. 2025-10-22 출고분 로트 LA-2210 측정값 80.9% — 상한선 초과 근접." },
  { id: "d5", name: "성적서_A사_LA2210.pdf", kind: "pdf", source: "공유폴더(SMB)", pages: 3, page: 1, updated: "2025-10-23",
    snippet: "LA-2210 수분율 0.08%, Ni 80.9%, 외관 이상 없음. 서명: A사 QC 박○○." },
  { id: "d6", name: "ERP_입고내역_LA2210.xlsx", kind: "excel", source: "ERP(SAP)", updated: "2025-10-24",
    snippet: "LA-2210 수량 12,400kg, 단가 62,300/kg, 검수 PASS(담당 임○○). 주의 플래그 없음." },
  { id: "d7", name: "EU_Battery_Regulation_2023_1542.pdf", kind: "pdf", source: "SharePoint", pages: 84, page: 42, updated: "2024-03-18",
    snippet: "Article 7 — Carbon footprint declaration: manufacturers shall disclose cradle-to-gate GHG emissions per functional unit (kWh) for each battery model." },
  { id: "d8", name: "소성공정_SOP_v4.pdf", kind: "pdf", source: "SharePoint", pages: 18, page: 9, updated: "2025-07-02",
    snippet: "소성(calcination) 단계: 850℃ 4h N2 atmosphere. 로트별 GHG emission 로그 자동 수집, ISO 14067 준거." },
  { id: "d9", name: "연구노트_NCM622_실험.pdf", kind: "pdf", source: "공유폴더(SMB)", pages: 6, page: 2, updated: "2026-02-11",
    snippet: "실험 #2026-014. NCM622 양극재 합성 조건 비교, 담당자 오○○." },
  { id: "d10", name: "CoA_전구체_B사.pdf", kind: "pdf", source: "SharePoint", pages: 2, page: 1, updated: "2025-12-18",
    snippet: "B사 NCM-622 CoA, 수분 0.04%, Tap density 2.14 g/cc." },
];

export interface MockChunk {
  id: string;
  docId: string;
  section: string;
  tokens: number;
  tags: string[];
  text: string;
}

export const chunks: MockChunk[] = [
  { id: "c1", docId: "d1", section: "3.2 이상 원인", tokens: 184, tags: ["제품=양극재", "공정=소성", "결함=입도초과"],
    text: "2025-12-18 라인3 양극재 LCO-532 로트 L25-1117 입도분포 D50 측정치 14.2µm(관리상한 13.2µm 초과)." },
  { id: "c2", docId: "d1", section: "4. 재발방지", tokens: 212, tags: ["조치=SOP개정", "설비=소성로3"],
    text: "소성로 #3 가열 프로파일을 기존 850℃ → 중간 830℃ 단계 추가. SOP-Q-118 개정, 운영표준 교육 2026-01-09 완료." },
  { id: "c3", docId: "d2", section: "야간조 수기", tokens: 96, tags: ["작성자=김○○", "설비=소성로3"],
    text: "17:40 온도편차 ±8℃ 감지 — 게이지 재보정 자체판단. 보정 로그 미기재. 근무자: 김○○(야간조)." },
  { id: "c4", docId: "d4", section: "2. Ni spec", tokens: 140, tags: ["공급사=A사", "원료=NCM811"],
    text: "NCM-811 Ni 함량 스펙 80.5±0.3%. 상한 80.8%." },
  { id: "c5", docId: "d5", section: "측정 결과", tokens: 88, tags: ["로트=LA2210", "공급사=A사"],
    text: "LA-2210 Ni 80.9% — 상한 초과. 수분 0.08%, 외관 이상 없음." },
];

export interface GraphNode {
  id: string;
  label: string;
  type: "제품" | "원료" | "공정" | "설비" | "규격" | "결함" | "작성자" | "거래처" | "규제";
  color: string;
}
export interface GraphEdge { source: string; target: string; label: string }

export const graph: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    { id: "양극재", label: "양극재 LCO-532", type: "제품", color: "#09090B" },
    { id: "NCM811", label: "전구체 NCM-811", type: "원료", color: "#27272A" },
    { id: "소성", label: "소성 공정", type: "공정", color: "#52525B" },
    { id: "소성로3", label: "소성로 #3", type: "설비", color: "#71717A" },
    { id: "라인3", label: "라인3", type: "설비", color: "#71717A" },
    { id: "입도초과", label: "입도 초과", type: "결함", color: "#18181B" },
    { id: "A사", label: "공급사 A사", type: "거래처", color: "#3F3F46" },
    { id: "김○○", label: "김○○ (야간조)", type: "작성자", color: "#71717A" },
    { id: "EU1542", label: "EU 2023/1542", type: "규제", color: "#18181B" },
    { id: "SOP118", label: "SOP-Q-118", type: "규격", color: "#52525B" },
  ],
  edges: [
    { source: "양극재", target: "NCM811", label: "is_made_of" },
    { source: "양극재", target: "소성", label: "processed_by" },
    { source: "소성", target: "소성로3", label: "uses" },
    { source: "소성로3", target: "라인3", label: "located_in" },
    { source: "양극재", target: "입도초과", label: "had_defect" },
    { source: "NCM811", target: "A사", label: "supplied_by" },
    { source: "김○○", target: "소성로3", label: "inspected" },
    { source: "소성", target: "EU1542", label: "complies_with" },
    { source: "소성", target: "SOP118", label: "governed_by" },
    { source: "입도초과", target: "SOP118", label: "addressed_by" },
  ],
};

export interface Scenario {
  id: string;
  q: string;
  answer: { text: string; cites: number[] }[];
  citations: { docId: string; page?: number; confidence: number }[];
  perf: { latency: string; tokens: string; strategy: string; route: string; llm: string; saving: string };
}

export const scenarios: Scenario[] = [
  {
    id: "s1",
    q: "2025년 4분기 라인3 양극재 불량 원인과 재발방지 조치를 요약해줘. 수기 점검일지도 포함해서.",
    answer: [
      { text: "라인3 양극재 LCO-532 로트 L25-1117에서 입도분포 D50이 관리상한 대비 +7% 초과하는 이상이 발생했습니다", cites: [1] },
      { text: "야간조 수기 점검일지에 따르면 동일 시점 소성로 #3 온도편차 ±8℃가 감지되어 게이지 재보정이 이뤄졌으나, 보정 로그가 미기재된 것으로 확인됩니다", cites: [2] },
      { text: "재발방지 조치로 소성로 #3 가열 프로파일에 830℃ 중간 단계를 추가하고 SOP-Q-118을 개정, 2026-01-09 운영표준 교육을 완료했습니다", cites: [3] },
      { text: "ERP 출하 기록상 해당 로트는 출하 보류 142건·내수재투입 38건·폐기 6건으로 처리됐습니다", cites: [4] },
    ],
    citations: [
      { docId: "d1", page: 4, confidence: 96 },
      { docId: "d2", page: 1, confidence: 88 },
      { docId: "d1", page: 9, confidence: 94 },
      { docId: "d3", confidence: 91 },
    ],
    perf: { latency: "1.8초", tokens: "2,340", strategy: "Hybrid (BM25 + Vector + GraphRAG)", route: "복합질의 → MS GraphRAG", llm: "vLLM Qwen3-4B-AWQ", saving: "-78%" },
  },
  {
    id: "s2",
    q: "공급사 A사의 전구체 로트 중 규격 이탈이 있었던 건을 MSDS·성적서·ERP 출하기록 교차 검증해서 알려줘.",
    answer: [
      { text: "A사 NCM-811 Ni 함량 스펙은 80.5±0.3%(상한 80.8%)로 정의되어 있습니다", cites: [1] },
      { text: "2025-10-23 성적서 기준 로트 LA-2210 측정값이 Ni 80.9%로 상한을 초과하여 규격 이탈에 해당합니다", cites: [2] },
      { text: "그러나 ERP 입고내역에는 수량 12,400kg, 검수 PASS로 기록되어 있어 QMS와 ERP 간 불일치가 존재합니다", cites: [3] },
    ],
    citations: [
      { docId: "d4", page: 3, confidence: 97 },
      { docId: "d5", page: 1, confidence: 95 },
      { docId: "d6", confidence: 92 },
    ],
    perf: { latency: "1.2초", tokens: "1,480", strategy: "Hybrid (BM25 + Vector)", route: "단순질의 → LightRAG", llm: "vLLM Qwen3-4B-AWQ", saving: "-82%" },
  },
  {
    id: "s3",
    q: "EU 배터리 규정 관련 문서에서 우리 소성 공정이 준수해야 할 기준만 뽑아서 정리해줘.",
    answer: [
      { text: "EU 2023/1542 Article 7은 제품별 cradle-to-gate GHG 배출량을 kWh 단위 기능 단위로 공시하도록 요구합니다", cites: [1] },
      { text: "당사 소성공정 SOP v4는 850℃·4h·N2 조건에서 로트별 GHG 배출 로그를 자동 수집하며 ISO 14067 준거로 운영 중입니다", cites: [2] },
      { text: "따라서 소성 공정은 EU 규정 Article 7에 대응하는 데이터 수집 체계를 이미 갖춘 상태이며, 공시 포맷 변환만 추가로 요구됩니다", cites: [] },
    ],
    citations: [
      { docId: "d7", page: 42, confidence: 98 },
      { docId: "d8", page: 9, confidence: 95 },
    ],
    perf: { latency: "2.1초", tokens: "2,890", strategy: "GraphRAG 서브그래프 + Vector", route: "다중홉 → MS GraphRAG", llm: "vLLM Qwen3-4B-AWQ", saving: "-74%" },
  },
];

export interface AuditEvent { time: string; user: string; agent: string; action: string; target: string; status: "OK" | "DENY" }
export const auditLog: AuditEvent[] = [
  { time: "2026-04-14 09:12:04", user: "박은규", agent: "Ask-Agent", action: "Query", target: "라인3 Q4 불량 요약", status: "OK" },
  { time: "2026-04-14 09:13:41", user: "박은규", agent: "Ask-Agent", action: "DocOpen", target: "품질성적서_라인3_2025Q4.pdf p.4", status: "OK" },
  { time: "2026-04-14 09:15:22", user: "이영우", agent: "GraphEditor", action: "Update", target: "소성로3 → 라인3 (located_in)", status: "OK" },
  { time: "2026-04-14 09:17:08", user: "system", agent: "Ask-Agent", action: "Query", target: "경영보고_2급_임원동향.pdf", status: "DENY" },
  { time: "2026-04-14 09:17:08", user: "system", agent: "AX Guard", action: "Block", target: "2급 보안 문서 — 에이전트 접근 거부", status: "DENY" },
  { time: "2026-04-14 09:20:45", user: "오현지", agent: "ChunkEditor", action: "Merge", target: "c2+c3 청크 병합 (SOP-Q-118)", status: "OK" },
];
