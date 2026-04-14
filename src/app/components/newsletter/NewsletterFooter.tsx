export function NewsletterFooter({ preparedBy, rightText }: { preparedBy: string; rightText: string }) {
  return (
    <footer className="newsletter-footer bg-slate-50 px-5 py-4 text-sm text-slate-600 sm:px-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div>
          <span>Prepared by: </span>
          <span className="text-slate-900">{preparedBy}</span>
        </div>
        <div className="text-slate-400">{rightText}</div>
      </div>
    </footer>
  );
}
