import type { Clause } from "@/data/legal";

export type AgreementFill = {
  beatTitle?: string;
  productId?: string;
  licenseeName?: string;
  licenseeEmail?: string;
  purchaseDate?: string;
  orderId?: string;
  signature?: string;
};

export function ClauseList({ clauses }: { clauses: Clause[] }) {
  return (
    <div className="mt-10 space-y-9">
      {clauses.map((clause) => (
        <article key={clause.heading}>
          <h2 className="font-display text-xl text-foreground md:text-2xl">{clause.heading}</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {clause.listIntro ? <p>{clause.listIntro}</p> : null}
            {clause.bullets ? (
              <ul className="space-y-2 pl-1">
                {clause.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="platinum-text mt-[0.15rem] text-xs">◆</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {clause.paras?.map((p) => <p key={p}>{p}</p>)}
          </div>
        </article>
      ))}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="border-b border-border pb-3">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-sm text-foreground">
        {value && value.trim() ? value : <span className="text-muted-foreground">—</span>}
      </p>
    </div>
  );
}

/** Beat and purchaser details, auto-filled from the order in progress. */
export function AgreementDetails({ fill }: { fill: AgreementFill }) {
  return (
    <div className="velvet-panel rounded-lg p-6">
      <p className="eyebrow">Beat and purchaser details</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Beat title" value={fill.beatTitle} />
        <Field label="Beat / product ID" value={fill.productId} />
        <Field label="Licensee legal name" value={fill.licenseeName} />
        <Field label="Licensee email" value={fill.licenseeEmail} />
        <Field label="Purchase date" value={fill.purchaseDate} />
        <Field label="Order reference" value={fill.orderId} />
      </div>
    </div>
  );
}

export function SignatureBlock({ fill }: { fill: AgreementFill }) {
  return (
    <div className="velvet-panel mt-8 grid gap-6 rounded-lg p-6 sm:grid-cols-2">
      <div>
        <p className="eyebrow">LifeOfLuv / Producer</p>
        <p className="mt-3 font-display text-2xl platinum-text">LifeOfLuv</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Accepted on payment · {fill.purchaseDate ?? "—"}
        </p>
      </div>
      <div>
        <p className="eyebrow">Licensee</p>
        <p className="mt-3 font-display text-2xl">
          {fill.signature && fill.signature.trim() ? (
            <span className="italic">{fill.signature}</span>
          ) : (
            <span className="text-muted-foreground">Signature pending</span>
          )}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Electronic signature · {fill.purchaseDate ?? "—"}
        </p>
      </div>
    </div>
  );
}
