"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Database, Scissors, Network, MessageSquare, ShieldCheck, Home } from "lucide-react";

const items = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/sources", label: "1. 데이터 소스", icon: Database },
  { href: "/chunking", label: "2. Chunking Studio", icon: Scissors },
  { href: "/graph", label: "3. Knowledge Graph", icon: Network },
  { href: "/ask", label: "4. Ask ax flow", icon: MessageSquare },
  { href: "/audit", label: "5. AX Guard", icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r border-ink-200 flex flex-col">
      <div className="p-5 border-b border-ink-200">
        <div className="flex items-center gap-2">
          <Image src="/axflow-bi.png" alt="ax flow" width={72} height={22} className="" priority />
        </div>
        <div className="font-display text-base font-semibold tracking-tight mt-2 text-ink-900">Knowledge Hub</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => {
          const active = pathname === it.href;
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active ? "bg-ink-900 text-white font-semibold" : "text-ink-600 hover:bg-ink-100"
              }`}
            >
              <Icon size={16} />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-ink-200 text-[11px] text-ink-500 font-mono">
        <div>v0.1 · Demo Build</div>
        <div className="mt-1">Mock scenario · Apr 2026</div>
      </div>
    </aside>
  );
}
