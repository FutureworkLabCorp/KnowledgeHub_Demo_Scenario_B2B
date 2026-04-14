"use client";
import { auditLog } from "@/lib/mockData";
import StepHeader from "@/components/StepHeader";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

const matrix = [
  { role: "C-Level", chat: true, lib: true, ontology: true, audit: true, guard2: true },
  { role: "품질팀", chat: true, lib: true, ontology: true, audit: false, guard2: false },
  { role: "생산팀", chat: true, lib: true, ontology: false, audit: false, guard2: false },
  { role: "외주 파트너", chat: true, lib: false, ontology: false, audit: false, guard2: false },
];

export default function AuditPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <StepHeader num="05" title="AX Guard" sub="감사로그 · 권한 매트릭스 · 프롬프트 버전 디프." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-ink-50 border border-ink-200 rounded-xl">
          <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-ax-neon" />
              <div className="font-semibold">감사로그 타임라인</div>
            </div>
            <span className="text-[11px] font-mono text-ink-500">최근 24시간</span>
          </div>
          <div className="divide-y divide-ink-200">
            {auditLog.map((e, i) => {
              const deny = e.status === "DENY";
              return (
                <div key={i} className={`flex gap-4 px-5 py-3 text-sm ${deny ? "bg-red-500/5" : ""}`}>
                  <div className="w-40 text-[11px] font-mono text-ink-500 shrink-0">{e.time}</div>
                  <div className="w-20 text-xs font-mono text-ink-700">{e.user}</div>
                  <div className="w-28 text-xs text-ax-blue">{e.agent}</div>
                  <div className="w-16 text-xs font-semibold">{e.action}</div>
                  <div className="flex-1 text-xs text-ink-700 truncate">{e.target}</div>
                  {deny ? (
                    <span className="text-xs text-red-400 font-mono flex items-center gap-1">
                      <XCircle size={12} /> DENY
                    </span>
                  ) : (
                    <span className="text-xs text-ax-neon font-mono flex items-center gap-1">
                      <CheckCircle2 size={12} /> OK
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="px-5 py-3 border-t border-ink-200 bg-red-500/5 flex items-center gap-2 text-xs text-red-400">
            <ShieldAlert size={14} /> AI 접근 차단 1건: 2급 보안 문서 — 에이전트 접근 거부됨
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-5">
            <div className="font-semibold mb-3">권한 매트릭스</div>
            <table className="w-full text-[11px] font-mono">
              <thead className="text-ink-500">
                <tr>
                  <th className="text-left pb-2">역할</th>
                  <th>Chat</th>
                  <th>Library</th>
                  <th>Ontology</th>
                  <th>Audit</th>
                  <th>2급</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((m) => (
                  <tr key={m.role} className="border-t border-ink-200">
                    <td className="py-2 text-ink-700">{m.role}</td>
                    {[m.chat, m.lib, m.ontology, m.audit, m.guard2].map((v, i) => (
                      <td key={i} className="text-center">
                        {v ? <span className="text-ax-neon">●</span> : <span className="text-ink-700">○</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-ink-50 border border-ink-200 rounded-xl p-5">
            <div className="font-semibold mb-3">프롬프트 버전 디프</div>
            <div className="font-mono text-[11px] space-y-1">
              <div className="text-ink-500">system_prompt.md @ v3 → v4</div>
              <div className="text-red-400">- 답변은 500자 이내로 요약</div>
              <div className="text-ax-neon">+ 답변은 항상 [n] 형식 인라인 시테이션 포함</div>
              <div className="text-ax-neon">+ 근거 없는 답변은 "해당 문서에서 근거를 찾지 못했습니다"로 응답</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-ax-neon/10 to-transparent border border-ax-neon/30 rounded-xl p-5 text-sm">
            <div className="font-display font-semibold text-ax-neon">온프레미스 · 감사대응 · 자산잔존</div>
            <div className="text-xs text-ink-700 mt-2 leading-relaxed">
              데이터는 외부로 반출되지 않고, 모든 AI 에이전트의 행동은 기록됩니다. 6개월마다 LLM을 교체해도 온톨로지·그래프·감사로그는 그대로 자산으로 잔존합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
