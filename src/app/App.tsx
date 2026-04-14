import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { newsletter } from './content/newsletter';
import { NewsletterPage } from './components/newsletter/NewsletterPage';
import { resolveAppView } from './routing';

type PaperSize = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6';

const PAPER_DIMENSIONS: Record<PaperSize, { widthMm: number; heightMm: number }> = {
  A1: { widthMm: 594, heightMm: 841 },
  A2: { widthMm: 420, heightMm: 594 },
  A3: { widthMm: 297, heightMm: 420 },
  A4: { widthMm: 210, heightMm: 297 },
  A5: { widthMm: 148, heightMm: 210 },
  A6: { widthMm: 105, heightMm: 148 },
};

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
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');
  const pageScalerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [fitScales, setFitScales] = useState<Record<string, number>>({});

  useEffect(() => {
    document.title = isPrintView ? 'Blend Newsletter Print Preview' : 'Blend Newsletter';
  }, [isPrintView]);

  const paperStyle = useMemo(() => {
    const baseWidthMm = 210;
    const baseHeightMm = 297;
    const selected = PAPER_DIMENSIONS[paperSize];
    const rawScale = Math.min(selected.widthMm / baseWidthMm, selected.heightMm / baseHeightMm);
    const scale = Math.max(0.35, Math.min(rawScale, 2.8));

    return {
      '--sheet-width': `${selected.widthMm}mm`,
      '--sheet-height': `${selected.heightMm}mm`,
      '--base-sheet-width': `${baseWidthMm}mm`,
      '--base-sheet-height': `${baseHeightMm}mm`,
      '--sheet-scale': String(scale),
    } as CSSProperties;
  }, [paperSize]);

  useEffect(() => {
    if (!isPrintView) return;

    let rafId = 0;
    let timeoutId = 0;
    let resizeObserver: ResizeObserver | null = null;
    const imageLoadListeners: Array<{ img: HTMLImageElement; onLoad: () => void }> = [];

    const calculateFitScales = () => {
      const nextScales: Record<string, number> = {};

      for (const page of newsletter.pages) {
        const scaler = pageScalerRefs.current[page.id];
        const sheet = scaler?.querySelector<HTMLElement>('.newsletter-sheet');

        if (!scaler || !sheet) {
          nextScales[page.id] = 1;
          continue;
        }

        const availableHeight = scaler.clientHeight;
        const availableWidth = scaler.clientWidth;
        const contentHeight = sheet.scrollHeight;
        const contentWidth = sheet.scrollWidth;
        const heightScale = contentHeight > 0 ? availableHeight / contentHeight : 1;
        const widthScale = contentWidth > 0 ? availableWidth / contentWidth : 1;
        const scale = Math.min(1, heightScale, widthScale);
        nextScales[page.id] = Math.max(0.3, Number(scale.toFixed(4)));
      }

      setFitScales((previous) => {
        const previousKeys = Object.keys(previous);
        const nextKeys = Object.keys(nextScales);
        const sameLength = previousKeys.length === nextKeys.length;
        const unchanged = sameLength && nextKeys.every((key) => previous[key] === nextScales[key]);
        return unchanged ? previous : nextScales;
      });
    };

    const scheduleMeasure = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);

      rafId = requestAnimationFrame(() => {
        calculateFitScales();
      });

      timeoutId = window.setTimeout(calculateFitScales, 180);
    };

    scheduleMeasure();
    window.addEventListener('resize', scheduleMeasure);
    window.addEventListener('beforeprint', scheduleMeasure);

    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        scheduleMeasure();
      });
    }

    const sheets = Array.from(document.querySelectorAll<HTMLElement>('.print-page-scaler .newsletter-sheet'));
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        scheduleMeasure();
      });
      sheets.forEach((sheet) => resizeObserver?.observe(sheet));
    }

    const images = Array.from(document.querySelectorAll<HTMLImageElement>('.print-page-scaler img'));
    images.forEach((img) => {
      if (img.complete) return;
      const onLoad = () => scheduleMeasure();
      img.addEventListener('load', onLoad);
      imageLoadListeners.push({ img, onLoad });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver?.disconnect();
      imageLoadListeners.forEach(({ img, onLoad }) => {
        img.removeEventListener('load', onLoad);
      });
      window.removeEventListener('resize', scheduleMeasure);
      window.removeEventListener('beforeprint', scheduleMeasure);
    };
  }, [isPrintView, paperSize]);

  if (isPrintView) {
    return (
      <div className={`print-route print-size-${paperSize.toLowerCase()} min-h-screen bg-white px-4 py-6 sm:px-6`} style={paperStyle}>
        <div className="print-toolbar mx-auto mb-5 flex max-w-[var(--sheet-width)] items-center justify-between gap-4 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
          <div>
            <div className="font-medium text-slate-900">Print newsletter</div>
            <div className="text-slate-500">Select a paper size, then print or save PDF with background graphics turned on.</div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="paper-size" className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Paper
            </label>
            <select
              id="paper-size"
              value={paperSize}
              onChange={(event) => setPaperSize(event.target.value as PaperSize)}
              className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700"
            >
              {Object.keys(PAPER_DIMENSIONS).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
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

        <div className="print-stack mx-auto flex max-w-[var(--sheet-width)] flex-col gap-6">
          {newsletter.pages.map((page) => (
            <div key={page.id} className="print-page">
              <div
                className="print-page-scaler"
                ref={(node) => {
                  pageScalerRefs.current[page.id] = node;
                }}
                style={{ '--page-fit-scale': String(fitScales[page.id] ?? 1) } as CSSProperties}
              >
                <NewsletterPage page={page} logo={newsletter.logo} preparedBy={newsletter.preparedBy} mode="print" />
              </div>
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
