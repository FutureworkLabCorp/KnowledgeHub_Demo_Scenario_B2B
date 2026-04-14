"use client";
import { useState, useEffect, useRef } from "react";
import { scenarios, docs } from "@/lib/mockData";
import StepHeader from "@/components/StepHeader";
import { Send, Zap, FileText, X, ExternalLink, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AskPage() {
  const [current, setCurrent] = useState<typeof scenarios[number] | null>(null);
  const [typedCount, setTypedCount] = useState(0);
  const [drawerDoc, setDrawerDoc] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const flatAnswer = current?.answer.flatMap((a) => [...a.text.split(""), ...(a.cites.length ? [`[${a.cites.join("][")}]`] : []), " "]) ?? [];

  useEffect(() => {
    if (!current) return;
    setTypedCount(0);
    const id = setInterval(() => {
      setTypedCount((c) => {
        if (c >= flatAnswer.length) {
          clearInterval(id);
          return c;
        }
        return c + 2;
      });
    }, 18);
    return () => clearInterval(id);
  }, [current]);

  const renderAnswer = () => {
    if (!current) return null;
    let consumed = 0;
    return current.answer.map((para, pi) => {
      const bodyLen = para.text.length;
      const visibleBody = Math.max(0, Math.min(bodyLen, typedCount - consumed));
      consumed += bodyLen;
      const citeLen = para.cites.length ? `[${para.cites.join("][")}]`.length : 0;
      const visibleCite = para.cites.length && typedCount >= consumed ? Math.min(citeLen, typedCount - consumed) : 0;
      consumed += citeLen + 1;

      return (
        <p key={pi} className="mb-3 leading-relaxed">
          {para.text.slice(0, visibleBody)}
          {visibleCite > 0 && (
            <span className="inline-flex gap-0.5 ml-1">
              {para.cites.map((n) => (
                <button
                  key={n}
                  onClick={() => setDrawerDoc(current.citations[n - 1].docId)}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ax-blue/15 border border-ax-blue/40 text-ax-blue hover:bg-ax-blue/30"
                >
                  {n}
                </button>
              ))}
            </span>
          )}
        </p>
      );
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div>
        <div className="text-xs font-mono text-ink-600">STEP 04</div>
        <div className="flex items-end gap-3 mt-1">
          <h1 className="font-display text-3xl font-bold">Ask</h1>
          <Image src="/axflow-bi.png" alt="ax flow" width={96} height={30} className="mb-1" priority />
        </div>
        <div className="text-ink-600 mt-1">답변 옆 근거, 근거 클릭 한 번으로 원문까지.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <div className="bg-ink-50 border border-ink-200 rounded-xl min-h-[480px] flex flex-col">
            <div className="flex-1 p-6 overflow-auto">
              {!current && (
                <div className="text-center py-16">
                  <Sparkles size={28} className="mx-auto text-ax-blue" />
                  <div className="mt-3 font-display text-lg font-semibold">예시 질문으로 시작</div>
                  <div className="text-sm text-ink-600 mt-1">그룹 DW에 연결된 온톨로지 기반으로 답변합니다.</div>
                  <div className="mt-6 flex flex-col gap-2 max-w-2xl mx-auto">
                    {scenarios.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setCurrent(s)}
                        className="text-left p-3 bg-white border border-ink-200 hover:border-ax-blue rounded-lg text-sm"
                      >
                        💬 {s.q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {current && (
                <div>
                  <div className="mb-4 pb-4 border-b border-ink-200">
                    <div className="text-[11px] font-mono text-ink-500">USER</div>
                    <div className="mt-1 text-sm">{current.q}</div>
                  </div>
                  <div className="text-[11px] font-mono text-ink-500 mb-2">ASSISTANT</div>
                  <div className={`text-sm text-ink-900 ${typedCount < flatAnswer.length ? "caret" : ""}`}>{renderAnswer()}</div>

                  <AnimatePresence>
                    {typedCount >= flatAnswer.length && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 pt-4 border-t border-ink-200"
                      >
                        <div className="text-[11px] font-mono text-ink-500 mb-2">근거 카드</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {current.citations.map((c, i) => {
                            const d = docs.find((x) => x.id === c.docId)!;
                            return (
                              <button
                                key={i}
                                onClick={() => setDrawerDoc(c.docId)}
                                className="text-left p-3 bg-white border border-ink-200 hover:border-ax-blue rounded-lg flex gap-3"
                              >
                                <div className="w-10 h-12 bg-ink-100 border border-ink-200 rounded flex items-center justify-center text-ink-500">
                                  <FileText size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[11px] font-mono text-ax-blue">[{i + 1}]</div>
                                  <div className="text-xs truncate">{d.name}</div>
                                  <div className="flex items-center gap-2 mt-1">
                                    {c.page && <span className="text-[10px] text-ink-500">p.{c.page}</span>}
                                    <span className="flex-1 h-1 bg-ink-100 rounded overflow-hidden">
                                      <span className="block h-full bg-ax-neon" style={{ width: `${c.confidence}%` }} />
                                    </span>
                                    <span className="text-[10px] text-ax-neon font-mono">{c.confidence}%</span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="border-t border-ink-200 p-4 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요 (데모는 예시 질문만 응답)"
                className="flex-1 bg-white border border-ink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-ax-blue"
              />
              <button
                className="px-4 py-2.5 bg-ink-900 hover:bg-black text-white rounded-lg flex items-center gap-2 text-sm font-semibold"
                onClick={() => current && setCurrent({ ...current })}
              >
                <Send size={14} /> 전송
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-b from-ink-50 to-white border border-ink-300 rounded-xl p-5">
            <div className="flex items-center gap-2 text-ink-900 font-mono text-xs">
              <Zap size={14} /> Performance
            </div>
            {current ? (
              <div className="mt-4 space-y-3 text-sm">
                <Row k="응답시간" v={current.perf.latency} highlight />
                <Row k="토큰사용" v={current.perf.tokens} />
                <Row k="검색전략" v={current.perf.strategy} />
                <Row k="라우팅" v={current.perf.route} />
                <Row k="LLM" v={current.perf.llm} />
                <Row k="비용절감" v={current.perf.saving} highlight />
              </div>
            ) : (
              <div className="mt-4 text-xs text-ink-500">질문을 선택하면 실시간 메트릭이 표시됩니다.</div>
            )}
          </div>

          <div className="mt-4 p-4 bg-ink-50 border border-ink-200 rounded-xl text-xs text-ink-600 leading-relaxed">
            <div className="text-ax-blue font-semibold mb-1">매 질문마다 풀스캔? NO.</div>
            단순 FAQ는 LightRAG 경량 경로, 다중홉 추론은 MS GraphRAG로 라우팅. 4B 온프렘 모델이 80% 처리, 20%만 외부 LLM 에스컬레이션.
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerDoc && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed right-0 top-0 bottom-0 w-[520px] bg-white border-l border-ink-200 z-50 flex flex-col"
          >
            <DocViewer docId={drawerDoc} onClose={() => setDrawerDoc(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-xs text-ink-500 font-mono">{k}</span>
      <span className={`text-xs font-mono text-right ${highlight ? "text-ink-900 font-semibold" : "text-ink-700"}`}>{v}</span>
    </div>
  );
}

function DocViewer({ docId, onClose }: { docId: string; onClose: () => void }) {
  const d = docs.find((x) => x.id === docId);
  if (!d) return null;
  return (
    <>
      <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono text-ink-500">원문 뷰어 · {d.source}</div>
          <div className="text-sm font-semibold mt-0.5">{d.name}</div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-ink-100 rounded">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6 bg-ink-100">
        <div className="bg-white text-ink-900 rounded-lg p-8 shadow-2xl min-h-full">
          <div className="text-xs text-ink-500 mb-4">Page {d.page ?? 1}</div>
          <div className="text-xs leading-relaxed space-y-2">
            <p>본 문서는 그룹 품질관리 시스템(QMS)에서 자동 생성된 성적서입니다.</p>
            <p>적용 범위: 라인3 양극재 LCO-532 / 생산일자 2025-12-18</p>
            <p className="bg-yellow-200 px-1">
              {d.snippet}
            </p>
            <p>재검사 결과: 출하 보류 판정. 소성로 #3 공정 파라미터 재설정 후 재생산 계획.</p>
            <p>검토자: 품질팀 임○○ / 승인: 품질팀장 조○○</p>
            <div className="mt-6 pt-4 border-t border-ink-200 text-[10px] text-ink-500">
              [하이라이트된 문장이 AI 답변의 근거로 인용되었습니다]
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-ink-200 flex justify-end">
        <button className="text-xs flex items-center gap-1 text-ax-blue hover:underline">
          원본 파일 열기 <ExternalLink size={12} />
        </button>
      </div>
    </>
  );
}
