import { useEffect, useMemo } from 'react';
import { newsletter } from './content/newsletter';
import { NewsletterPage } from './components/newsletter/NewsletterPage';
import { resolveAppView } from './routing';

export default function App() {
  const { isPrintView, screenHref } = useMemo(
    () =>
      typeof window !== 'undefined'
        ? resolveAppView(window.location.href)
        : {
            isPrintView: false,
            screenHref: '/',
          },
    [],
  );

  useEffect(() => {
    document.title = isPrintView ? 'Blend Newsletter Print Preview' : 'Blend Newsletter';
  }, [isPrintView]);

  if (isPrintView) {
    return (
      <div className="print-route min-h-screen bg-white px-4 py-6 sm:px-6">
        <div className="print-toolbar mx-auto mb-5 flex max-w-6xl items-center justify-between gap-4 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
          <div>
            <div className="font-medium text-slate-900">Print newsletter</div>
            <div className="text-slate-500">Auto-fit mode: prints against your current paper size. Keep background graphics enabled.</div>
          </div>
          <div className="flex items-center gap-2">
            <a href={screenHref} className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-50">
              Back
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md bg-[#053057] px-3 py-2 font-medium text-white hover:bg-[#031114]"
            >
              Print / Save PDF
            </button>
          </div>
        </div>

        <div className="print-stack mx-auto flex max-w-6xl flex-col gap-6">
          {newsletter.pages.map((page) => (
            <div key={page.id} className="print-page">
              <NewsletterPage page={page} logo={newsletter.logo} preparedBy={newsletter.preparedBy} mode="print" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f3f0]">
      <div className="size-full overflow-auto px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          {newsletter.pages.map((page, index) => (
            <div key={page.id} className="space-y-10">
              {index > 0 ? (
                <div className="flex items-center gap-4 text-slate-500">
                  <div className="h-px flex-1 bg-slate-200" />
                  <div className="text-xs uppercase tracking-widest">Next story</div>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
              ) : null}
              <NewsletterPage page={page} logo={newsletter.logo} preparedBy={newsletter.preparedBy} mode="screen" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
