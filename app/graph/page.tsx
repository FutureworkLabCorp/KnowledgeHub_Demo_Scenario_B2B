"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, useRef, useEffect } from "react";
import { graph } from "@/lib/mockData";
import StepHeader from "@/components/StepHeader";
import Link from "next/link";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

export default function GraphPage() {
  const [selected, setSelected] = useState<string | null>("양극재");
  const [schema, setSchema] = useState<"auto" | "tpl">("tpl");
  const fgRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 560 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fit = () => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.zoomToFit?.(500, 60);
  };

  useEffect(() => {
    const timers = [300, 800, 1600, 2500].map((t) => setTimeout(fit, t));
    return () => timers.forEach(clearTimeout);
  }, [size.w, size.h]);

  const data = useMemo(
    () => ({
      nodes: graph.nodes.map((n) => ({ ...n })),
      links: graph.edges.map((e) => ({ ...e })),
    }),
    []
  );

  const sel = graph.nodes.find((n) => n.id === selected);
  const related = graph.edges.filter((e) => e.source === selected || e.target === selected);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between">
        <StepHeader num="03" title="Knowledge Graph Builder" sub="엔티티·관계 자동 추출 — 실무자가 직접 수정 가능." />
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setSchema("auto")}
            className={`px-3 py-1.5 rounded border ${schema === "auto" ? "bg-ink-900 text-white border-ink-900" : "border-ink-200 text-ink-600"}`}
          >
            자동 스키마 추론
          </button>
          <button
            onClick={() => setSchema("tpl")}
            className={`px-3 py-1.5 rounded border ${schema === "tpl" ? "bg-ink-900 text-white border-ink-900" : "border-ink-200 text-ink-600"}`}
          >
            배터리 소재 템플릿
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div ref={wrapRef} className="lg:col-span-2 bg-white border border-ink-200 rounded-xl overflow-hidden relative" style={{ height: 560 }}>
          <div className="absolute top-3 right-3 z-10 bg-ink-100/90 border border-ink-200 rounded-lg px-3 py-2 text-[11px] font-mono text-ink-700">
            엔티티 <span className="text-ax-blue">3,214</span> · 관계 <span className="text-ax-blue">8,902</span> · 클러스터 <span className="text-ax-blue">17</span>
          </div>
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
            nodeLabel={(n: any) => `${n.label} (${n.type})`}
            nodeColor={(n: any) => (n.id === selected ? "#09090B" : n.color)}
            nodeRelSize={7}
            linkColor={() => "rgba(0,0,0,0.2)"}
            linkDirectionalArrowLength={4}
            linkDirectionalArrowRelPos={1}
            linkLabel={(l: any) => l.label}
            backgroundColor="#FFFFFF"
            width={size.w}
            height={size.h}
            warmupTicks={60}
            cooldownTicks={100}
            onEngineStop={fit}
            onNodeClick={(n: any) => setSelected(n.id)}
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(n: any, ctx, scale) => {
              const fontSize = 11 / scale;
              ctx.font = `${fontSize}px Pretendard`;
              ctx.fillStyle = "#09090B";
              ctx.textAlign = "center";
              ctx.fillText(n.label, n.x, n.y + 12);
            }}
          />
        </div>

        <div className="bg-ink-50 border border-ink-200 rounded-xl p-5">
          {sel ? (
            <>
              <div className="text-xs font-mono text-ink-500">선택 노드</div>
              <div className="font-display text-xl font-semibold mt-1">{sel.label}</div>
              <span
                className="inline-block text-[11px] font-mono px-2 py-0.5 rounded mt-2"
                style={{ background: `${sel.color}22`, color: sel.color, border: `1px solid ${sel.color}55` }}
              >
                {sel.type}
              </span>

              <div className="mt-5">
                <div className="text-xs font-mono text-ink-500 mb-2">관계 ({related.length})</div>
                <div className="space-y-1.5">
                  {related.map((r, i) => (
                    <div key={i} className="text-xs p-2 bg-white rounded border border-ink-200 flex items-center gap-2">
                      <span className="text-ink-600">{r.source}</span>
                      <span className="text-ax-blue font-mono">{r.label}</span>
                      <span className="text-ink-600">{r.target}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-mono text-ink-500 mb-2">출처 문서</div>
                <div className="space-y-1 text-xs">
                  <div className="text-ink-700">· 품질성적서_라인3_2025Q4.pdf · p.4</div>
                  <div className="text-ink-700">· 소성공정_SOP_v4.pdf · p.9</div>
                  <div className="text-ink-700">· 연구노트_NCM622.pdf · p.2</div>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button className="text-xs px-3 py-1.5 border border-ink-300 rounded hover:bg-ink-200">속성 편집</button>
                <button className="text-xs px-3 py-1.5 border border-ink-300 rounded hover:bg-ink-200">관계 추가</button>
                <button className="text-xs px-3 py-1.5 border border-red-500/40 text-red-400 rounded hover:bg-red-500/10">삭제</button>
              </div>
            </>
          ) : (
            <div className="text-sm text-ink-600">노드를 클릭해 속성을 확인하세요.</div>
          )}

          <div className="mt-6 pt-5 border-t border-ink-200 text-right">
            <Link href="/ask" className="text-sm text-ink-900 hover:underline">Ask ax flow로 →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
