function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

function normalizeHash(hash: string) {
  if (!hash) return '/';

  const withoutPrefix = hash.replace(/^#/, '');
  const normalized = withoutPrefix.startsWith('/') ? withoutPrefix : `/${withoutPrefix}`;
  return normalizePathname(normalized);
}

function toScreenPath(pathname: string) {
  if (!pathname.endsWith('/print')) return pathname;

  const screenPath = pathname.slice(0, -'/print'.length);
  return screenPath || '/';
}

function toHref(pathname: string, searchParams: URLSearchParams) {
  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function resolveAppView(href: string) {
  const url = new URL(href);
  const pathname = normalizePathname(url.pathname);
  const hashPath = normalizeHash(url.hash);
  const searchParams = new URLSearchParams(url.search);
  const screenPath = toScreenPath(pathname);

  const isPrintView = pathname.endsWith('/print') || hashPath === '/print' || searchParams.get('view') === 'print';

  const screenParams = new URLSearchParams(searchParams);
  screenParams.delete('view');

  const printParams = new URLSearchParams(screenParams);
  printParams.set('view', 'print');

  return {
    isPrintView,
    screenHref: toHref(screenPath, screenParams),
    printHref: toHref(screenPath, printParams),
  };
}
