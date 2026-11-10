export default function CartFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-xl shadow-[0_-1px_12px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1600px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-gutter">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
            AURELIA
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Grand Cuvée Reserve &amp; Salon Management Suite. Strict discretion
            observed.
          </p>
        </div>
        <div className="flex items-center gap-space-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              Michelin Protocol Enabled
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-outline">•</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            Cellar Reserve Tier I
          </span>
        </div>
        <div className="font-label-sm text-label-sm tracking-widest text-on-surface-variant uppercase">
          © MMXXIV Aurelia Haute Hospitality. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
