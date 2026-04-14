export default function StepHeader({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div>
      <div className="text-xs font-mono text-ax-neon">STEP {num}</div>
      <h1 className="font-display text-3xl font-bold mt-1">{title}</h1>
      <div className="text-ink-600 mt-1">{sub}</div>
    </div>
  );
}
