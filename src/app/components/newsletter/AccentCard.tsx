import type { ReactNode } from 'react';
import type { Tone } from './Tone';
import { toneClasses } from './Tone';

export function AccentCard({
  tone,
  title,
  children,
  icon,
  right,
  className,
}: {
  tone: Tone;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  const t = toneClasses(tone);
  return (
    <section className={`${t.bg} avoid-page-break rounded-lg border border-slate-200 border-l-4 ${t.border} p-5 shadow-sm sm:p-6 ${className ?? ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            {icon ? <div className="mt-0.5 shrink-0">{icon}</div> : null}
            <div className="min-w-0 flex-1">
              <h3 className="mb-3 text-lg leading-tight text-slate-950 sm:text-xl">{title}</h3>
              <div className="text-sm leading-6 text-slate-700">{children}</div>
            </div>
          </div>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </section>
  );
}
