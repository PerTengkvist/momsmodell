import type { VatAmounts, VatBreakdown } from '../../lib/vat'
import { formatSek } from '../../lib/vat'
import { ActorCard } from '../ActorCard'
import { FlowArrow } from '../FlowArrow'

interface SaleDStepProps {
  amounts: VatAmounts
  breakdown: VatBreakdown
}

export function SaleDStep({ amounts, breakdown }: SaleDStepProps) {
  return (
    <div className="step-panel">
      <p className="step-kicker">Steg 5 · Försäljning till D.com</p>
      <h2 className="step-title">D.com betalar ingen moms till C.se</h2>
      <p className="step-lead">
        När C.se säljer till utländska D.com faktureras normalt utan svensk moms
        (export / omsättning utanför Sverige). D betalar bara nettopriset.
        C får därmed <strong>ingen utgående moms</strong> från den här försäljningen.
      </p>

      <div className="flow-stage">
        <ActorCard name="C.se" subtitle="Svensk säljare" kind="highlight" active />
        <FlowArrow
          label="Export · 0 % moms"
          amount={formatSek(breakdown.payFromD)}
          note="D betalar ingen moms"
          variant="excl"
        />
        <ActorCard name="D.com" subtitle="Utländsk köpare" kind="com" active />
      </div>

      <div className="figure-box">
        <div className="figure-box__row">
          <span>Försäljningspris</span>
          <strong>{formatSek(amounts.saleDExcl)}</strong>
        </div>
        <div className="figure-box__row">
          <span>Utgående moms</span>
          <strong className="is-zero">{formatSek(breakdown.outgoingVatSale)}</strong>
        </div>
        <div className="figure-box__row figure-box__row--total">
          <span>D betalar till C</span>
          <strong>{formatSek(breakdown.payFromD)}</strong>
        </div>
      </div>

      <aside className="obs-note">
        <strong>Nyckelpoäng.</strong> C har redan betalat (eller redovisat) moms på
        sina inköp, men får ingen moms in från D. Differensen behöver hanteras mot
        Skatteverket — det ser vi i nästa steg.
      </aside>
    </div>
  )
}
