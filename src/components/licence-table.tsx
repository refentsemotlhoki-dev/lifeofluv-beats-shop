const rows = [
  {
    label: "Price",
    lease: "$199 CAD",
    exclusive: "$599 CAD",
  },
  {
    label: "Future licences",
    lease: "LifeOfLuv may continue licensing the beat.",
    exclusive: "LifeOfLuv stops new licences after your purchase.",
  },
  {
    label: "Earlier licences",
    lease: "Other valid licences may exist.",
    exclusive: "Earlier valid licences remain in effect.",
  },
  {
    label: "Best for",
    lease: "Artists who want a straightforward non-exclusive licence.",
    exclusive: "Artists who want future licensing to stop.",
  },
  {
    label: "Before you buy",
    lease: "Read the applicable licence agreement.",
    exclusive: "Read the applicable licence agreement.",
  },
];

export function LicenceTable() {
  return (
    <div className="velvet-panel overflow-hidden rounded-lg">
      <div className="grid grid-cols-3 gap-4 border-b border-border px-6 py-5">
        <span className="eyebrow">Compare</span>
        <span className="text-sm uppercase tracking-[0.16em]">Unlimited Lease</span>
        <span className="text-sm uppercase tracking-[0.16em] platinum-text">Exclusive</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-3 gap-4 border-b border-border px-6 py-5 last:border-0"
        >
          <span className="eyebrow pt-1">{row.label}</span>
          <span className="text-sm text-muted-foreground">{row.lease}</span>
          <span className="text-sm text-muted-foreground">{row.exclusive}</span>
        </div>
      ))}
    </div>
  );
}
