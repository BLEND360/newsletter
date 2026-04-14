import type { Tone } from './Tone';
import { toneClasses } from './Tone';

export function BadgePill({ tone, label }: { tone: Tone; label: string }) {
  const t = toneClasses(tone);
  return <div className={`inline-flex items-center rounded-md ${t.bg} ${t.text} px-3 py-1.5 text-sm font-medium`}>{label}</div>;
}
