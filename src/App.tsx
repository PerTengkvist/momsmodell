import { useState } from 'react'
import { StepNav, type StepMeta } from './components/StepNav'
import { ActorsStep } from './components/steps/ActorsStep'
import { AgencyStep } from './components/steps/AgencyStep'
import { IntroStep } from './components/steps/IntroStep'
import { NettoStep } from './components/steps/NettoStep'
import { PurchaseAStep } from './components/steps/PurchaseAStep'
import { PurchaseBStep } from './components/steps/PurchaseBStep'
import { SaleDStep } from './components/steps/SaleDStep'
import {
  calculateVat,
  DEFAULT_AMOUNTS,
  type VatAmounts,
} from './lib/vat'

const STEPS: StepMeta[] = [
  { id: 1, title: 'Introduktion', short: 'Intro' },
  { id: 2, title: 'Aktörer', short: 'Aktörer' },
  { id: 3, title: 'Inköp A.se', short: 'A.se' },
  { id: 4, title: 'Inköp B.com', short: 'B.com' },
  { id: 5, title: 'Försäljning D.com', short: 'D.com' },
  { id: 6, title: 'Momsnetto', short: 'Netto' },
  { id: 7, title: 'Skatteverket', short: 'SKV' },
]

function App() {
  const [step, setStep] = useState(0)
  const [amounts, setAmounts] = useState<VatAmounts>(DEFAULT_AMOUNTS)
  const breakdown = calculateVat(amounts)

  return (
    <div className="app-shell">
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <header className="site-header">
        <p className="brand">Momsflöde</p>
        <p className="brand-tag">Pedagogisk modell · Sverige ↔ utlandet</p>
      </header>

      <main className="main">
        <StepNav
          steps={STEPS}
          current={step}
          onSelect={setStep}
          onPrev={() => setStep((s) => Math.max(0, s - 1))}
          onNext={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
        />

        <section className="step-stage" key={step}>
          {step === 0 && <IntroStep />}
          {step === 1 && <ActorsStep />}
          {step === 2 && (
            <PurchaseAStep amounts={amounts} breakdown={breakdown} />
          )}
          {step === 3 && (
            <PurchaseBStep amounts={amounts} breakdown={breakdown} />
          )}
          {step === 4 && (
            <SaleDStep amounts={amounts} breakdown={breakdown} />
          )}
          {step === 5 && (
            <NettoStep
              amounts={amounts}
              breakdown={breakdown}
              onChange={setAmounts}
              onReset={() => setAmounts(DEFAULT_AMOUNTS)}
            />
          )}
          {step === 6 && <AgencyStep breakdown={breakdown} />}
        </section>
      </main>

      <footer className="site-footer">
        <p>
          Förenklad illustration av moms vid inköp och export. Inte skatterådgivning.
        </p>
      </footer>
    </div>
  )
}

export default App
