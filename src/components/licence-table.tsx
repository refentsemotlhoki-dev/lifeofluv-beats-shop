const rows: { label: string; basic: string; lease: string; exclusive: string }[] = [
  { label: "Price (CAD)", basic: "$20", lease: "$99", exclusive: "$399" },
  { label: "File delivery", basic: "MP3 only", lease: "MP3 + WAV", exclusive: "MP3 + WAV + Trackouts" },
  { label: "Audio streams", basic: "50,000", lease: "Unlimited", exclusive: "Unlimited" },
  { label: "Monetized video views", basic: "10,000", lease: "Unlimited", exclusive: "Unlimited" },
  { label: "Paid downloads", basic: "1,000", lease: "Unlimited", exclusive: "Unlimited" },
  { label: "Commercial release", basic: "✓", lease: "✓", exclusive: "✓" },
  { label: "Paid performances", basic: "✓", lease: "✓", exclusive: "✓" },
  { label: "Radio airplay", basic: "—", lease: "✓", exclusive: "✓" },
  { label: "Film, TV & games", basic: "—", lease: "Separate permission", exclusive: "Included" },
  { label: "Composition split", basic: "50/50", lease: "50/50", exclusive: "50/50" },
  { label: "Perpetual licence", basic: "✓*", lease: "✓", exclusive: "✓" },
  { label: "Beat removed from store", basic: "—", lease: "—", exclusive: "✓" },
  { label: "Eligible for upgrade", basic: "✓", lease: "—", exclusive: "—" },
];

export function LicenceTable() {
  return (
    <div className="velvet-panel overflow-hidden rounded-lg">
      <div className="grid grid-cols-4 gap-4 border-b border-border px-6 py-5">
        <span className="eyebrow">Compare</span>
        <span className="text-sm uppercase tracking-[0.16em]">Basic</span>
        <span className="text-sm uppercase tracking-[0.16em]">Unlimited</span>
        <span className="text-sm uppercase tracking-[0.16em] platinum-text">Exclusive</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-4 gap-4 border-b border-border px-6 py-5 last:border-0"
        >
          <span className="eyebrow pt-1">{row.label}</span>
          <span className="text-sm text-muted-foreground">{row.basic}</span>
          <span className="text-sm text-muted-foreground">{row.lease}</span>
          <span className="text-sm text-muted-foreground">{row.exclusive}</span>
        </div>
      ))}
      <p className="px-6 pb-5 pt-2 text-xs text-muted-foreground">* Subject to usage limits.</p>
    </div>
  );
}
