import type { VatBreakdown } from '../../lib/vat'
import { formatSek } from '../../lib/vat'
import { ActorCard } from '../ActorCard'

interface AgencyStepProps {
  breakdown: VatBreakdown
}

export function AgencyStep({ breakdown }: AgencyStepProps) {
  const { taxAgency: books } = breakdown
  const netLabel =
    books.net === 0
      ? 'Noll — momsen stannar inte i Sverige'
      : books.net > 0
        ? 'Överskott till staten'
        : 'Underskott (staten betalar mer än den får in)'

  return (
    <div className="step-panel">
      <p className="step-kicker">Steg 7 · Skatteverkets böcker</p>
      <h2 className="step-title">Vad får Skatteverket in — och vad betalar de ut?</h2>
      <p className="step-lead">
        Här samlar vi hela exemplet ur Skatteverkets perspektiv: vilka
        momsbelopp som redovisas som inkomster, vilka avdrag som blir utgifter,
        och vad nettot blir för staten i just det här flödet.
      </p>

      <div className="agency-hero">
        <ActorCard
          name="Skatteverket"
          subtitle="Summering av hela exemplet"
          kind="agency"
          active
        />
        <div className="agency-hero__net">
          <span className="agency-hero__label">Netto i exemplet</span>
          <strong className={books.net === 0 ? 'is-zero' : books.net > 0 ? 'is-vat' : 'is-refund'}>
            {formatSek(books.net)}
          </strong>
          <span className="agency-hero__hint">{netLabel}</span>
        </div>
      </div>

      <div className="ledger-grid">
        <section className="ledger ledger--income" aria-labelledby="income-heading">
          <h3 id="income-heading" className="ledger__title">
            Inkomster
          </h3>
          <p className="ledger__intro">Moms som redovisas in till Skatteverket</p>
          <ul className="ledger__list">
            <li>
              <div>
                <strong>Från A.se</strong>
                <span>Utgående moms på försäljningen till C.se</span>
              </div>
              <em>+{formatSek(books.incomeFromA)}</em>
            </li>
            <li>
              <div>
                <strong>Från C.se (omvänd skattskyldighet)</strong>
                <span>Moms på inköpet från B.com som C själv redovisar</span>
              </div>
              <em>+{formatSek(books.incomeFromReverseCharge)}</em>
            </li>
            <li>
              <div>
                <strong>Från C.se (försäljning till D.com)</strong>
                <span>Export — ingen utgående moms</span>
              </div>
              <em>+{formatSek(books.incomeFromSaleD)}</em>
            </li>
          </ul>
          <div className="ledger__total">
            <span>Summa inkomster</span>
            <strong>{formatSek(books.totalIncome)}</strong>
          </div>
        </section>

        <section className="ledger ledger--expense" aria-labelledby="expense-heading">
          <h3 id="expense-heading" className="ledger__title">
            Utgifter
          </h3>
          <p className="ledger__intro">Avdrag / kompensation som Skatteverket medger</p>
          <ul className="ledger__list">
            <li>
              <div>
                <strong>Avdrag till C.se · inköp A.se</strong>
                <span>Ingående moms som C får dra av</span>
              </div>
              <em>−{formatSek(books.expenseDeductionA)}</em>
            </li>
            <li>
              <div>
                <strong>Avdrag till C.se · inköp B.com</strong>
                <span>Ingående moms vid omvänd skattskyldighet</span>
              </div>
              <em>−{formatSek(books.expenseDeductionB)}</em>
            </li>
          </ul>
          <div className="ledger__total">
            <span>Summa utgifter</span>
            <strong>{formatSek(books.totalExpense)}</strong>
          </div>
        </section>
      </div>

      <div className="figure-box agency-balance">
        <h3 className="figure-box__heading">Balansräkning för exemplet</h3>
        <div className="figure-box__row">
          <span>Inkomster</span>
          <strong>{formatSek(books.totalIncome)}</strong>
        </div>
        <div className="figure-box__row">
          <span>Utgifter</span>
          <strong>−{formatSek(books.totalExpense)}</strong>
        </div>
        <div className="figure-box__row figure-box__row--total">
          <span>Netto för Skatteverket</span>
          <strong className={books.net === 0 ? 'is-zero' : undefined}>
            {formatSek(books.net)}
          </strong>
        </div>
        <p className="figure-box__hint">
          Kassaflöde i korthet: A betalar in {formatSek(books.incomeFromA)}.
          C:s deklaration nettar omvänd skattskyldighet (
          {formatSek(books.incomeFromReverseCharge)} in och{' '}
          {formatSek(books.expenseDeductionB)} ut) och C får tillbaka{' '}
          {formatSek(breakdown.netWithTaxAgency)} (främst momsen från A).
          Resultat: {formatSek(books.net)}.
        </p>
      </div>

      <aside className="obs-note">
        <strong>Pedagogisk poäng.</strong> När varorna till slut säljs utomlands
        (till D.com) blir svensk moms normalt inte en nettoinkomst för staten i
        kedjan — inkomster och avdrag tar ut varandra. Momsen är tänkt att belasta
        slutkonsumenten i konsumtionslandet, inte exportören.
      </aside>
    </div>
  )
}
