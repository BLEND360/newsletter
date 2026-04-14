export type Tone = 'indigo' | 'blue' | 'emerald' | 'amber' | 'purple' | 'red' | 'cyan' | 'slate';

export function toneClasses(tone: Tone) {
  switch (tone) {
    case 'indigo':
      return { bg: 'bg-violet-50', border: 'border-violet-500', text: 'text-violet-700', solid: 'bg-violet-600' };
    case 'blue':
      return { bg: 'bg-sky-50', border: 'border-sky-500', text: 'text-sky-700', solid: 'bg-sky-600' };
    case 'cyan':
      return { bg: 'bg-teal-50', border: 'border-teal-500', text: 'text-teal-700', solid: 'bg-teal-600' };
    case 'emerald':
      return { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-700', solid: 'bg-emerald-600' };
    case 'amber':
      return { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', solid: 'bg-amber-600' };
    case 'purple':
      return { bg: 'bg-fuchsia-50', border: 'border-fuchsia-500', text: 'text-fuchsia-700', solid: 'bg-fuchsia-600' };
    case 'red':
      return { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-700', solid: 'bg-rose-600' };
    case 'slate':
    default:
      return { bg: 'bg-zinc-50', border: 'border-zinc-300', text: 'text-zinc-700', solid: 'bg-zinc-700' };
  }
}
