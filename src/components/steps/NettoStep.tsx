import type { VatAmounts, VatBreakdown } from '../../lib/vat'
import { DEFAULT_AMOUNTS, formatPercent, formatSek } from '../../lib/vat'
import { ActorCard } from '../ActorCard'
import { FlowArrow } from '../FlowArrow'

interface NettoStepProps {
  amounts: VatAmounts
  breakdown: VatBreakdown
  onChange: (next: VatAmounts) => void
  onReset: () => void
}

export function NettoStep({ amounts, breakdown, onChange, onReset }: NettoStepProps) {
  const update = (patch: Partial<VatAmounts>) => {
    onChange({ ...amounts, ...patch })
  }

  const parseNumber = (raw: string): number => {
    const n = Number(raw.replace(/\s/g, '').replace(',', '.'))
    return Number.isFinite(n) && n >= 0 ? n : 0
  }

  return (
    <div className="step-panel">
      <p className="step-kicker">Steg 6 · Momsnetto & experiment</p>
      <h2 className="step-title">C.se behöver kompensation från Skatteverket</h2>
      <p className="step-lead">
        C redovisar ingående moms från inköpen och utgående moms för den omvända
        skattskyldigheten (B.com), men <strong>ingen</strong> utgående moms från
        exporten till D. Differensen — i praktiken momsen från A.se — får C
        normalt tillbaka från Skatteverket.
      </p>

      <div className="flow-stage flow-stage--refund">
        <ActorCard name="Skatteverket" subtitle="Momsmyndighet" kind="agency" active />
        <FlowArrow
          label="Kompensation"
          amount={formatSek(breakdown.netWithTaxAgency)}
          note="Återbetalning / avräkning till C"
          variant="refund"
        />
        <ActorCard name="C.se" subtitle="Momsnetto" kind="highlight" active />
      </div>

      <div className="summary-grid">
        <div className="figure-box">
          <h3 className="figure-box__heading">Ingående moms</h3>
          <div className="figure-box__row">
            <span>Från A.se</span>
            <strong>{formatSek(breakdown.vatFromA)}</strong>
          </div>
          <div className="figure-box__row">
            <span>Från B.com (redovisad)</span>
            <strong>{formatSek(breakdown.vatFromB)}</strong>
          </div>
          <div className="figure-box__row figure-box__row--total">
            <span>Summa</span>
            <strong>{formatSek(breakdown.incomingVat)}</strong>
          </div>
        </div>

        <div className="figure-box">
          <h3 className="figure-box__heading">Utgående moms</h3>
          <div className="figure-box__row">
            <span>Försäljning till D.com</span>
            <strong className="is-zero">{formatSek(breakdown.outgoingVatSale)}</strong>
          </div>
          <div className="figure-box__row">
            <span>Omvänd skattskyldighet B.com</span>
            <strong className="is-vat">{formatSek(breakdown.outgoingVatReverse)}</strong>
          </div>
          <div className="figure-box__row">
            <span>Summa utgående</span>
            <strong>{formatSek(breakdown.outgoingVat)}</strong>
          </div>
          <div className="figure-box__row figure-box__row--total">
            <span>Netto mot Skatteverket</span>
            <strong className="is-refund">{formatSek(breakdown.netWithTaxAgency)}</strong>
          </div>
          <p className="figure-box__hint">
            Positivt belopp = C får tillbaka / kompenseras. Omvänd moms på B
            tar ut sig själv (samma belopp som ingående).
          </p>
        </div>
      </div>

      <section className="experiment" aria-labelledby="experiment-heading">
        <div className="experiment__header">
          <h3 id="experiment-heading">Experimentera med beloppen</h3>
          <button type="button" className="btn btn--ghost btn--small" onClick={onReset}>
            Återställ exempel
          </button>
        </div>
        <p className="experiment__lead">
          Ändra beloppen nedan — flödena och momsnettot uppdateras direkt.
          Default: A {formatSek(DEFAULT_AMOUNTS.purchaseAExcl)}, B{' '}
          {formatSek(DEFAULT_AMOUNTS.purchaseBExcl)}, D{' '}
          {formatSek(DEFAULT_AMOUNTS.saleDExcl)}, moms{' '}
          {formatPercent(DEFAULT_AMOUNTS.vatRate)}.
        </p>

        <div className="experiment__fields">
          <label className="field">
            <span>Inköp från A.se (exkl. moms)</span>
            <input
              type="number"
              min={0}
              step={100}
              value={amounts.purchaseAExcl}
              onChange={(e) => update({ purchaseAExcl: parseNumber(e.target.value) })}
            />
          </label>
          <label className="field">
            <span>Inköp från B.com (exkl. moms)</span>
            <input
              type="number"
              min={0}
              step={100}
              value={amounts.purchaseBExcl}
              onChange={(e) => update({ purchaseBExcl: parseNumber(e.target.value) })}
            />
          </label>
          <label className="field">
            <span>Försäljning till D.com (exkl. moms)</span>
            <input
              type="number"
              min={0}
              step={100}
              value={amounts.saleDExcl}
              onChange={(e) => update({ saleDExcl: parseNumber(e.target.value) })}
            />
          </label>
          <label className="field">
            <span>Momssats (%)</span>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={Math.round(amounts.vatRate * 100)}
              onChange={(e) =>
                update({ vatRate: parseNumber(e.target.value) / 100 })
              }
            />
          </label>
        </div>

        <div className="live-pills" aria-live="polite">
          <span className="pill">C → A: {formatSek(breakdown.payToA)}</span>
          <span className="pill">C → B: {formatSek(breakdown.payToB)}</span>
          <span className="pill">D → C: {formatSek(breakdown.payFromD)}</span>
          <span className="pill pill--accent">
            Kompensation: {formatSek(breakdown.netWithTaxAgency)}
          </span>
        </div>
      </section>

      <aside className="obs-note">
        <strong>Obs.</strong> I verkligheten beror redovisning och återbetalning på
        deklarationsperiod, avdragsrätt och vilken typ av gränsöverskridande handel
        det gäller (EU vs tredjeland). Här visar vi principen bakom flödet.
      </aside>
    </div>
  )
}
