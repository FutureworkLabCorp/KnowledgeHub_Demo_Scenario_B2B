import { ShieldCheck, Lock, Server } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-14 border-b border-ink-200 bg-white/80 backdrop-blur flex items-center justify-between px-6">
      <div className="text-sm text-ink-600">
        제조 그룹 DW · 온톨로지 기반 지식허브
      </div>
      <div className="flex items-center gap-2">
        <Badge icon={<Server size={12} />} label="On-Prem" />
        <Badge icon={<Lock size={12} />} label="데이터 외부 반출 없음" />
        <Badge icon={<ShieldCheck size={12} />} label="AX Guard ON" />
      </div>
    </header>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded border border-ink-300 text-ink-700 bg-ink-50">
      {icon}
      {label}
    </span>
  );
}
