import Link from "next/link";
import { ArrowRight, Database, Scissors, Network, MessageSquare, ShieldCheck } from "lucide-react";

const steps = [
  { href: "/sources", num: "01", title: "데이터 소스", desc: "ERP·DW·공유폴더·수기문서를 한 파이프라인으로", icon: Database },
  { href: "/chunking", num: "02", title: "Chunking Studio", desc: "청크 단위까지 열어보고 직접 수정", icon: Scissors },
  { href: "/graph", num: "03", title: "Knowledge Graph", desc: "엔티티·관계 자동 추출, 실무자가 직접 편집", icon: Network },
  { href: "/ask", num: "04", title: "Ask ax flow", desc: "근거 기반 답변 · 원문 점프 · ⚡Performance", icon: MessageSquare },
  { href: "/audit", num: "05", title: "AX Guard", desc: "감사로그 · 권한 매트릭스 · 접근 차단 증적", icon: ShieldCheck },
];

export default function HomePage() {
  return (
    <div className="dot-grid min-h-[calc(100vh-3.5rem)]">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="text-xs font-mono text-ink-600 mb-4">DEMO · Manufacturing DW · Ontology Edition</div>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight">
          흩어진 제조 데이터,<br />
          <span className="text-ink-900 underline decoration-ink-600 underline-offset-8">온톨로지</span>로 다시 태어나다.
        </h1>
        <p className="mt-5 text-ink-600 text-lg max-w-2xl">
          중구난방 폴더 → 지식그래프 → 근거 기반 답변까지.<br />
          한 화면에서 5분 안에 납득시키는 온프레미스 지식허브.
        </p>

        <Link
          href="/sources"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3.5 bg-ink-900 hover:bg-black text-white transition rounded-lg font-semibold"
        >
          데모 시작하기 <ArrowRight size={18} />
        </Link>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-ink-50 hover:bg-ink-100 border border-ink-200 hover:border-ax-blue rounded-xl p-6 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-ink-200 flex items-center justify-center">
                      <Icon size={18} className="text-ax-blue" />
                    </div>
                    <div className="font-mono text-xs text-ink-500">STEP {s.num}</div>
                  </div>
                  <ArrowRight size={16} className="text-ink-500 group-hover:text-ax-blue transition" />
                </div>
                <div className="mt-4 font-display text-xl font-semibold">{s.title}</div>
                <div className="text-sm text-ink-600 mt-1">{s.desc}</div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 border-t border-ink-200 pt-8 grid grid-cols-3 gap-8 text-sm">
          <Stat label="응답속도" value="1.8초" sub="MS GraphRAG 대비 2.4× 빠름" />
          <Stat label="비용절감" value="-78%" sub="클라우드 LLM 대비" />
          <Stat label="자산잔존" value="100%" sub="모델 교체와 무관한 온톨로지" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="text-xs text-ink-500 font-mono">{label}</div>
      <div className="font-display text-3xl font-bold text-ink-900 mt-1">{value}</div>
      <div className="text-xs text-ink-600 mt-1">{sub}</div>
    </div>
  );
}
