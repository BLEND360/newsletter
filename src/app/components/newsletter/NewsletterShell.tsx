import type { ReactNode } from 'react';

export function NewsletterShell({
  children,
  mode = 'screen',
}: {
  children: ReactNode;
  mode?: 'screen' | 'print';
}) {
  return (
    <article
      className={
        mode === 'print'
          ? 'newsletter-sheet overflow-hidden rounded-none border border-slate-300 bg-white shadow-none'
          : 'newsletter-sheet overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)]'
      }
    >
      {children}
    </article>
  );
}
