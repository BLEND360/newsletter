import type { ReactNode } from 'react';
import type { NewsletterImage } from '../../content/newsletter';

export function NewsletterHeader({
  icon,
  logo,
  brand,
  editionLabel,
  gradientClassName,
}: {
  icon?: ReactNode;
  logo: NewsletterImage;
  brand: string;
  editionLabel: string;
  gradientClassName: string;
}) {
  return (
    <header className={`newsletter-header ${gradientClassName} border-b-4 border-[#1df4f4] p-5 text-white sm:p-7`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          {icon ? (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1df4f4] text-[#053057]">{icon}</div>
          ) : null}
          <div className="min-w-0">
            <h1 className="break-words text-2xl leading-tight sm:text-3xl">{brand}</h1>
            <p className="mt-1 text-sm text-white/80">{editionLabel}</p>
          </div>
        </div>
        <img
          src={logo.src}
          alt={logo.alt}
          className="h-8 w-auto max-w-[11rem] shrink-0 object-contain"
          decoding="async"
          loading="eager"
        />
      </div>
    </header>
  );
}
