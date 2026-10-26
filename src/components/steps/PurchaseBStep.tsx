import type { VatAmounts, VatBreakdown } from '../../lib/vat'
import { formatPercent, formatSek } from '../../lib/vat'
import { ActorCard } from '../ActorCard'
import { FlowArrow } from '../FlowArrow'

interface PurchaseBStepProps {
  amounts: VatAmounts
  breakdown: VatBreakdown
}

export function PurchaseBStep({ amounts, breakdown }: PurchaseBStepProps) {
  return (
    <div className="step-panel">
      <p className="step-kicker">Steg 4 · Inköp från B.com</p>
      <h2 className="step-title">C.se betalar exklusive moms — men redovisar till Skatteverket</h2>
      <p className="step-lead">
        Från utländska B.com betalar C ofta bara beloppet utan moms. Momsen redovisas
        i stället av C till Skatteverket genom <em>omvänd skattskyldighet</em>
        (reverse charge): C redovisar både utgående och ingående moms för köpet.
      </p>

      <div className="flow-stage flow-stage--stack">
        <div className="flow-stage__main">
          <ActorCard name="B.com" subtitle="Utländsk säljare" kind="com" active />
          <FlowArrow
            label="Exkl. moms"
            amount={formatSek(breakdown.payToB)}
            note="Ingen moms till B"
            variant="excl"
          />
          <ActorCard name="C.se" subtitle="Köpare" kind="highlight" active />
        </div>
        <div className="flow-stage__side">
          <FlowArrow
            label="Moms redovisas"
            amount={formatSek(breakdown.vatFromB)}
            note="Omvänd skattskyldighet"
            variant="vat"
            direction="down"
          />
          <ActorCard
            name="Skatteverket"
            subtitle="C redovisar momsen hit"
            kind="agency"
            active
            compact
          />
        </div>
      </div>

      <div className="figure-box">
        <div className="figure-box__row">
          <span>Belopp till B.com</span>
          <strong>{formatSek(breakdown.payToB)}</strong>
        </div>
        <div className="figure-box__row">
          <span>Moms att redovisa ({formatPercent(amounts.vatRate)})</span>
          <strong className="is-vat">{formatSek(breakdown.vatFromB)}</strong>
        </div>
        <div className="figure-box__row figure-box__row--total">
          <span>C:s totala kostnad (exkl. avdragsrätt)</span>
          <strong>{formatSek(breakdown.payToB + breakdown.vatFromB)}</strong>
        </div>
      </div>

      <aside className="obs-note">
        <strong>Obs · Omvänd skattskyldighet.</strong> C betalar inte moms till B,
        men redovisar momsen till Skatteverket. När C har avdragsrätt för ingående
        moms blir nettot ofta noll för just den momsen — men den syns i redovisningen.
      </aside>
    </div>
  )
}
