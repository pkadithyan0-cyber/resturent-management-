export default function MenuFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-lg">
      <div className="w-full px-space-md lg:px-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-primary tracking-widest uppercase">
            Aurelia
          </span>
          <span className="text-outline text-body-sm">•</span>
          <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
            High Gastronomy Operational Suite
          </span>
        </div>
        <div className="flex items-center gap-space-lg">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Cellar Integration v4.8
          </span>
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Michelin Protocol Enabled
          </span>
        </div>
        <div className="font-body-sm text-body-sm text-outline">
          © 2025 Aurelia Atelier. Quiet Luxury Service.
        </div>
      </div>
    </footer>
  );
}
