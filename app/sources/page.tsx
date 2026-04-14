"use client";
import { useState } from "react";
import { Database, FolderOpen, FileText, Factory, Cloud, HardDrive, UploadCloud, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const sources = [
  { key: "erp", name: "ERP (SAP)", icon: Factory, desc: "출하·재고·BOM" },
  { key: "dw", name: "그룹 DW", icon: Database, desc: "Snowflake / Oracle" },
  { key: "mes", name: "MES", icon: Factory, desc: "생산·품질 실시간" },
  { key: "qms", name: "QMS", icon: FileText, desc: "품질성적서·부적합" },
  { key: "sp", name: "SharePoint", icon: Cloud, desc: "규정·SOP·MSDS" },
  { key: "smb", name: "공유폴더 (SMB)", icon: HardDrive, desc: "수기문서·레거시" },
];

const droppedFiles = [
  { name: "품질성적서_라인3_2025Q4.pdf", size: "2.4 MB" },
  { name: "라인3_점검일지_수기.jpg", size: "1.1 MB" },
  { name: "출하실적_2025Q4.xlsx", size: "380 KB" },
];

const stages = ["커넥터 감지", "텍스트 추출 (OCR)", "메타데이터 파싱"];

export default function SourcesPage() {
  const [selected, setSelected] = useState<string[]>(["erp", "smb"]);
  const [dropped, setDropped] = useState(false);
  const [stage, setStage] = useState(-1);

  const toggle = (k: string) => setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const runUpload = () => {
    setDropped(true);
    setStage(0);
    [0, 1, 2].forEach((i) => setTimeout(() => setStage(i + 1), (i + 1) * 900));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Header num="01" title="데이터 소스 & 업로드" sub="ERP·MES·수기문서까지 한 파이프라인으로" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div>
          <SectionTitle>연결 가능한 데이터 소스</SectionTitle>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {sources.map((s) => {
              const active = selected.includes(s.key);
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => toggle(s.key)}
                  className={`text-left p-4 rounded-lg border transition ${
                    active ? "bg-ax-blue/10 border-ax-blue" : "bg-ink-50 border-ink-200 hover:border-ink-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={18} className={active ? "text-ax-blue" : "text-ink-600"} />
                    {active && <Check size={14} className="text-ax-neon" />}
                  </div>
                  <div className="mt-2 font-semibold text-sm">{s.name}</div>
                  <div className="text-xs text-ink-500 mt-0.5">{s.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-ink-50 border border-ink-200 rounded-lg">
            <div className="text-xs font-mono text-ink-600 mb-3">권한/스코프 (AX Guard)</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Toggle label="읽기전용" on />
              <Toggle label="특정 폴더만" on />
              <Toggle label="감사로그 ON" on />
              <Toggle label="PII 마스킹" on={false} />
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>문서 업로드</SectionTitle>
          <div
            className="mt-4 border-2 border-dashed border-ink-300 rounded-xl p-10 text-center bg-ink-50 hover:border-ax-blue transition cursor-pointer"
            onClick={runUpload}
          >
            <UploadCloud size={40} className="mx-auto text-ink-500" />
            <div className="mt-3 font-semibold">파일을 드래그하거나 클릭해서 업로드</div>
            <div className="text-xs text-ink-500 mt-1">PDF · Excel · 이미지(JPG/PNG) · 수기문서 스캔본 · DWG</div>
          </div>

          {dropped && (
            <div className="mt-4 space-y-2">
              {droppedFiles.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-3 bg-ink-100 border border-ink-200 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-ax-blue" />
                    {f.name}
                  </div>
                  <span className="text-xs text-ink-500 font-mono">{f.size}</span>
                </motion.div>
              ))}
            </div>
          )}

          {dropped && (
            <div className="mt-6 p-4 bg-white border border-ink-200 rounded-lg">
              <div className="text-xs font-mono text-ink-500 mb-3">처리 파이프라인</div>
              <div className="space-y-3">
                {stages.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        stage > i ? "bg-ax-neon border-ax-neon" : stage === i ? "border-ax-blue pulse-ring" : "border-ink-300"
                      }`}
                    >
                      {stage > i && <Check size={12} className="text-ink-900" />}
                    </div>
                    <div className={stage >= i ? "text-ink-900" : "text-ink-500"}>{s}</div>
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {stage >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 pt-4 border-t border-ink-200 flex items-center justify-between"
                  >
                    <span className="text-xs text-ax-neon font-mono">✓ 3개 문서 인제스트 완료</span>
                    <Link href="/chunking" className="text-xs text-ax-blue hover:underline">
                      Chunking Studio로 →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-lg font-semibold">{children}</h2>;
}
function Toggle({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full border text-[11px] font-mono ${
        on ? "bg-ax-neon/10 border-ax-neon/40 text-ax-neon" : "bg-ink-100 border-ink-200 text-ink-500"
      }`}
    >
      {on ? "● " : "○ "}
      {label}
    </span>
  );
}
export function Header({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div>
      <div className="text-xs font-mono text-ax-neon">STEP {num}</div>
      <h1 className="font-display text-3xl font-bold mt-1">{title}</h1>
      <div className="text-ink-600 mt-1">{sub}</div>
    </div>
  );
}
