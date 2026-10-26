import type { VatAmounts, VatBreakdown } from '../../lib/vat'
import { formatPercent, formatSek } from '../../lib/vat'
import { ActorCard } from '../ActorCard'
import { FlowArrow } from '../FlowArrow'

interface PurchaseAStepProps {
  amounts: VatAmounts
  breakdown: VatBreakdown
}

export function PurchaseAStep({ amounts, breakdown }: PurchaseAStepProps) {
  return (
    <div className="step-panel">
      <p className="step-kicker">Steg 3 · Inköp från A.se</p>
      <h2 className="step-title">C.se betalar belopp inklusive moms</h2>
      <p className="step-lead">
        När C.se köper från det svenska företaget A.se ingår momsen i fakturan.
        C betalar hela beloppet till A. A redovisar den utgående momsen till Skatteverket.
      </p>

      <div className="flow-stage">
        <ActorCard name="A.se" subtitle="Svensk säljare" kind="se" active />
        <FlowArrow
          label={`Inkl. moms (${formatPercent(amounts.vatRate)})`}
          amount={formatSek(breakdown.payToA)}
          note={`${formatSek(amounts.purchaseAExcl)} + ${formatSek(breakdown.vatFromA)} moms`}
          variant="incl"
        />
        <ActorCard name="C.se" subtitle="Köpare" kind="highlight" active />
      </div>

      <div className="figure-box">
        <div className="figure-box__row">
          <span>Exkl. moms</span>
          <strong>{formatSek(amounts.purchaseAExcl)}</strong>
        </div>
        <div className="figure-box__row">
          <span>Moms ({formatPercent(amounts.vatRate)})</span>
          <strong className="is-vat">{formatSek(breakdown.vatFromA)}</strong>
        </div>
        <div className="figure-box__row figure-box__row--total">
          <span>C betalar till A</span>
          <strong>{formatSek(breakdown.payToA)}</strong>
        </div>
      </div>

      <aside className="obs-note">
        <strong>Ingående moms.</strong> För C.se är momsen på inköpet från A en
        ingående moms som kan dras av — förutsatt att C är momsregistrerat och
        köpet gäller momspliktig verksamhet.
      </aside>
    </div>
  )
}
