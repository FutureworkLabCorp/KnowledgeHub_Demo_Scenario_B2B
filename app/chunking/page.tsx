"use client";
import { useState } from "react";
import { chunks, docs } from "@/lib/mockData";
import StepHeader from "@/components/StepHeader";
import { Cpu, Layers, Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ChunkingPage() {
  const [activeChunk, setActiveChunk] = useState(chunks[0].id);
  const chunk = chunks.find((c) => c.id === activeChunk)!;
  const doc = docs.find((d) => d.id === chunk.docId)!;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <StepHeader num="02" title="Chunking Studio" sub="청크 단위까지 열어 보고 직접 수정합니다." />

      <div className="mt-4 p-3 bg-ink-100 border border-ink-300 rounded-lg flex items-center gap-3">
        <Zap size={16} className="text-ink-900" />
        <div className="text-sm">
          <span className="font-semibold text-ink-900">GPU 없는 온프레미스 환경도 OK — </span>
          <span className="text-ink-600">bge-small-en-v1.5 ONNX 런타임으로 CPU 임베딩 · 초당 1,200 청크 처리</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-ink-50 border border-ink-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-ink-200 flex items-center justify-between">
            <div className="text-sm font-semibold">{doc.name}</div>
            <div className="text-xs text-ink-500 font-mono">p.{doc.page}</div>
          </div>
          <div className="p-5 space-y-3 text-sm leading-relaxed">
            {chunks
              .filter((c) => c.docId === doc.id)
              .map((c) => (
                <motion.div
                  key={c.id}
                  onClick={() => setActiveChunk(c.id)}
                  whileHover={{ scale: 1.01 }}
                  className={`p-3 rounded-lg cursor-pointer border-l-2 ${
                    c.id === activeChunk
                      ? "bg-ax-blue/10 border-ax-blue text-ink-900"
                      : "border-ink-200 text-ink-600 hover:bg-ink-100"
                  }`}
                >
                  <div className="text-[10px] font-mono text-ink-500 mb-1">{c.section}</div>
                  {c.text}
                </motion.div>
              ))}
          </div>
        </div>

        <div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-ink-200 flex items-center gap-2">
              <Layers size={14} className="text-ax-blue" />
              <div className="text-sm font-semibold">청크 리스트</div>
              <span className="text-xs text-ink-500 font-mono ml-auto">12,847 청크 / 4.2초 / 메모리 1.3GB</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-white text-[11px] text-ink-500 font-mono uppercase">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">섹션</th>
                  <th className="text-right p-3">토큰</th>
                  <th className="text-left p-3">임베딩</th>
                </tr>
              </thead>
              <tbody>
                {chunks.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setActiveChunk(c.id)}
                    className={`border-t border-ink-200 cursor-pointer ${
                      c.id === activeChunk ? "bg-ax-blue/5" : "hover:bg-ink-50"
                    }`}
                  >
                    <td className="p-3 font-mono text-xs text-ink-600">{c.id}</td>
                    <td className="p-3">{c.section}</td>
                    <td className="p-3 text-right font-mono text-ink-600">{c.tokens}</td>
                    <td className="p-3">
                      <span className="text-ax-neon text-xs inline-flex items-center gap-1">
                        <Check size={12} /> 완료
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-ink-50 border border-ink-200 rounded-xl p-5">
            <div className="text-xs font-mono text-ink-500 mb-2">선택 청크 — 태그 편집</div>
            <div className="text-sm text-ink-800 mb-3">{chunk.text}</div>
            <div className="flex flex-wrap gap-1.5">
              {chunk.tags.map((t) => (
                <span key={t} className="text-[11px] font-mono px-2 py-1 rounded bg-ax-blue/10 border border-ax-blue/40 text-ax-blue">
                  {t}
                </span>
              ))}
              <button className="text-[11px] font-mono px-2 py-1 rounded border border-dashed border-ink-300 text-ink-500 hover:text-ink-700">
                + 태그 추가
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="text-xs px-3 py-1.5 border border-ink-300 rounded hover:bg-ink-200">경계 조정</button>
              <button className="text-xs px-3 py-1.5 border border-ink-300 rounded hover:bg-ink-200">분할</button>
              <button className="text-xs px-3 py-1.5 border border-ink-300 rounded hover:bg-ink-200">병합</button>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white border border-ink-200 rounded-xl font-mono text-[11px] text-ink-600 leading-relaxed">
            <div className="flex items-center gap-2 text-ink-700 mb-2">
              <Cpu size={12} /> Pipeline
            </div>
            문서 → 레이아웃 분석 → semantic split → <span className="text-ax-blue">bge-small ONNX</span> 임베딩 → <span className="text-ax-neon">pgvector</span> 적재
          </div>

          <div className="mt-6 text-right">
            <Link href="/graph" className="text-sm text-ax-blue hover:underline">
              Knowledge Graph Builder로 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
