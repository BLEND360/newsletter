import { ArrowUpRight, CheckCircle2, Clock, Lightbulb, Sparkles, Target } from 'lucide-react';
import type { ReactNode } from 'react';
import type {
  NewsletterCard,
  NewsletterIcon,
  NewsletterImage,
  NewsletterPage as NewsletterPageContent,
  NewsletterSection,
  NewsletterStat,
} from '../../content/newsletter';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import { AccentCard } from './AccentCard';
import { BadgePill } from './BadgePill';
import { NewsletterFooter } from './NewsletterFooter';
import { NewsletterHeader } from './NewsletterHeader';
import { NewsletterShell } from './NewsletterShell';
import { toneClasses } from './Tone';

const iconClassName = 'h-6 w-6';

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

const icons: Record<NewsletterIcon, ReactNode> = {
  sparkles: <Sparkles className={iconClassName} />,
  target: <Target className={iconClassName} />,
  clock: <Clock className={`${iconClassName} text-amber-700`} />,
  lightbulb: <Lightbulb className={`${iconClassName} text-red-700`} />,
  check: <CheckCircle2 className={`${iconClassName} text-emerald-700`} />,
  none: null,
};

export function NewsletterPage({
  page,
  logo,
  preparedBy,
  mode = 'screen',
}: {
  page: NewsletterPageContent;
  logo: NewsletterImage;
  preparedBy: string;
  mode?: 'screen' | 'print';
}) {
  return (
    <NewsletterShell mode={mode}>
      <NewsletterHeader
        icon={icons[page.icon]}
        logo={logo}
        brand={page.brand}
        editionLabel={page.editionLabel}
        gradientClassName={page.headerGradient}
      />

      <main className={`newsletter-main space-y-8 p-5 sm:p-7 lg:p-8 ${mode === 'print' ? 'print-page-content' : ''}`}>
        <HeroSection page={page} mode={mode} />

        {page.columns ? (
          <div className={`grid gap-7 ${mode === 'print' ? 'print-two-column' : ''} lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]`}>
            <SectionList sections={page.columns.left} mode={mode} pageId={page.id} column="left" />
            <SectionList sections={page.columns.right} mode={mode} pageId={page.id} column="right" />
          </div>
        ) : null}

        {page.sections?.length ? <SectionList sections={page.sections} mode={mode} pageId={page.id} /> : null}
      </main>

      <NewsletterFooter preparedBy={preparedBy} rightText={page.footerRight} />
    </NewsletterShell>
  );
}

function HeroSection({ page, mode }: { page: NewsletterPageContent; mode: 'screen' | 'print' }) {
  const isAiReport = page.id === 'ai-world-report';

  return (
    <section className="newsletter-hero avoid-page-break">
      <BadgePill tone={page.hero.badge.tone} label={page.hero.badge.label} />
      <h2
        className={`mt-4 mb-4 text-2xl leading-tight text-slate-950 sm:text-3xl ${
          mode === 'screen' ? (isAiReport ? 'max-w-[24ch]' : 'lg:whitespace-nowrap') : ''
        }`}
      >
        {page.hero.title}
      </h2>
      <p
        className={`text-base leading-7 text-slate-600 ${
          mode === 'screen' ? (isAiReport ? 'max-w-[90ch]' : 'lg:whitespace-nowrap') : ''
        }`}
      >
        {page.hero.subtitle}
      </p>
    </section>
  );
}

function SectionList({
  sections,
  mode,
  pageId,
  column,
}: {
  sections: NewsletterSection[];
  mode: 'screen' | 'print';
  pageId: string;
  column?: 'left' | 'right';
}) {
  return (
    <div className="space-y-5">
      {sections.map((section, index) => (
        <NewsletterSectionView key={`${section.type}-${index}`} section={section} mode={mode} pageId={pageId} column={column} />
      ))}
    </div>
  );
}

function NewsletterSectionView({
  section,
  mode,
  pageId,
  column,
}: {
  section: NewsletterSection;
  mode: 'screen' | 'print';
  pageId: string;
  column?: 'left' | 'right';
}) {
  const isAiReportCards = pageId === 'ai-world-report' && mode === 'screen' && section.type === 'cards';
  const isAiReportRightCards = isAiReportCards && column === 'right';

  switch (section.type) {
    case 'image':
      return (
        <figure className="avoid-page-break overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
          <ImageWithFallback
            src={section.image.src}
            alt={section.image.alt}
            className="aspect-[16/9] w-full object-cover"
            decoding="async"
            loading="eager"
          />
        </figure>
      );
    case 'cards':
      return (
        <div className="space-y-4">
          {section.cards.map((card, index) => {
            const cardToneVariantClass = isAiReportCards ? `ai-report-card ai-report-card--${index % 4}` : '';
            const cardClassName = [isAiReportRightCards ? 'ai-report-right-card' : '', cardToneVariantClass].filter(Boolean).join(' ');

            return (
            <NewsletterCardView
              key={card.title}
              card={card}
              cardClassName={cardClassName || undefined}
              contentClassName={isAiReportRightCards ? 'flex min-h-[11.5rem] flex-col' : undefined}
              linkClassName={isAiReportRightCards ? 'mt-auto pt-4' : 'mt-4'}
            />
            );
          })}
        </div>
      );
    case 'stats':
      return (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-5 text-xl text-slate-950">{section.title}</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {section.items.map((item) => (
              <StatView key={item.label} item={item} />
            ))}
          </div>
        </section>
      );
    case 'comparison':
      return (
        <AccentCard tone={section.tone} title={section.title} className={mode === 'print' ? 'print-tight-card' : undefined}>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="w-[52%] px-4 py-3 text-left">{section.columns?.label ?? 'Metric'}</th>
                  <th className="w-[24%] px-3 py-3 text-center">{section.columns?.before ?? 'Before'}</th>
                  <th className="w-[24%] px-3 py-3 text-right">{section.columns?.after ?? 'After'}</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item) => (
                  <tr key={item.label} className="border-t border-slate-200 align-top">
                    <th scope="row" className="break-words px-4 py-3 text-left font-medium leading-5 text-slate-800">
                      {item.label}
                    </th>
                    <td className="px-3 py-3 text-center text-slate-500 whitespace-nowrap">{item.before}</td>
                    <td className="px-3 py-3 text-right font-semibold text-emerald-700 whitespace-nowrap">{item.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccentCard>
      );
    case 'steps': {
      const tone = toneClasses(section.tone);

      return (
        <AccentCard tone={section.tone} title={section.title}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            {section.lead ? <p className="max-w-2xl text-sm leading-6 text-slate-600">{section.lead}</p> : null}
            <span className={`w-fit rounded-md bg-white px-3 py-1.5 text-xs font-semibold ${tone.text}`}>
              {section.steps.length}-step rollout
            </span>
          </div>

          <div className="relative mt-7">
            <div className="absolute bottom-3 left-[1.125rem] top-3 w-px bg-emerald-200 md:hidden" />
            <div className="absolute left-6 right-6 top-5 hidden h-px bg-emerald-200 md:block" />

            <ol className="grid gap-5 md:auto-cols-fr md:grid-flow-col md:gap-4" aria-label={section.title}>
              {section.steps.map((step, index) => (
                <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] gap-3 md:block md:text-center">
                  <span
                    className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-lg ${tone.solid} text-sm font-semibold text-white shadow-sm md:mx-auto md:h-10 md:w-10`}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 md:mt-3 md:block">
                    {step.label ? (
                      <span className={`mb-1 block text-xs font-semibold uppercase tracking-wider ${tone.text}`}>
                        {step.label}
                      </span>
                    ) : null}
                    <span className="block text-sm font-semibold leading-snug text-slate-900 sm:text-base">{step.title}</span>
                    <span className="mt-1.5 block text-sm leading-6 text-slate-600">{step.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </AccentCard>
      );
    }
    case 'metrics':
      return (
        <AccentCard tone={section.tone} title={section.title}>
          <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-5">
            {section.items.map((item) => (
              <MetricView key={item.label} item={item} />
            ))}
          </div>
        </AccentCard>
      );
  }
}

function NewsletterCardView({
  card,
  cardClassName,
  contentClassName,
  linkClassName = 'mt-4',
}: {
  card: NewsletterCard;
  cardClassName?: string;
  contentClassName?: string;
  linkClassName?: string;
}) {
  const external = card.link ? isExternalHref(card.link.href) : false;

  return (
    <AccentCard
      tone={card.tone}
      title={card.title}
      icon={card.icon ? icons[card.icon] : undefined}
      className={cardClassName}
      contentClassName={contentClassName}
    >
      {card.body ? <p className={card.link || card.bullets ? 'mb-4 max-w-prose leading-7' : 'max-w-prose leading-7'}>{card.body}</p> : null}
      {card.bullets ? (
        <ul className="space-y-3">
          {card.bullets.map((bullet) => (
            <li key={bullet} className="grid grid-cols-[0.75rem_1fr] gap-2.5 leading-6">
              <span className={`${toneClasses(card.tone).solid} mt-2 h-1.5 w-1.5 rounded-full`} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {card.link ? (
        <a
          href={card.link.href}
          className={`${linkClassName} inline-flex items-center gap-2 font-medium text-slate-900 hover:underline`}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
        >
          {card.link.label} <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : null}
    </AccentCard>
  );
}

function StatView({ item }: { item: NewsletterStat }) {
  const tone = toneClasses(item.tone);

  return (
    <div className="min-w-0 text-center">
      <div className={`${tone.text} mb-2 break-words text-3xl font-semibold leading-tight`}>{item.value}</div>
      <p className="text-sm leading-6 text-slate-600">{item.label}</p>
      {item.sub ? <p className="mt-1 text-xs leading-5 text-slate-400">{item.sub}</p> : null}
    </div>
  );
}

function MetricView({ item }: { item: NewsletterStat }) {
  const tone = toneClasses(item.tone);

  return (
    <div className="min-h-32 min-w-0 bg-white p-4 text-center">
      <div className={`${tone.text} break-words text-xl font-bold leading-tight`}>{item.value}</div>
      <div className="mt-2 text-sm font-medium leading-5 text-slate-700">{item.label}</div>
      {item.sub ? <div className="mt-1 text-xs leading-5 text-slate-500">{item.sub}</div> : null}
    </div>
  );
}
