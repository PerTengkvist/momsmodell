export interface StepMeta {
  id: number
  title: string
  short: string
}

interface StepNavProps {
  steps: StepMeta[]
  current: number
  onSelect: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

export function StepNav({ steps, current, onSelect, onPrev, onNext }: StepNavProps) {
  const isFirst = current === 0
  const isLast = current === steps.length - 1

  return (
    <nav className="step-nav" aria-label="Pedagogiska steg">
      <ol className="step-nav__list">
        {steps.map((step, index) => {
          const state =
            index === current ? 'current' : index < current ? 'done' : 'todo'
          return (
            <li key={step.id} className={`step-nav__item is-${state}`}>
              <button
                type="button"
                className="step-nav__btn"
                onClick={() => onSelect(index)}
                aria-current={index === current ? 'step' : undefined}
              >
                <span className="step-nav__num">{index + 1}</span>
                <span className="step-nav__short">{step.short}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="step-nav__controls">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={onPrev}
          disabled={isFirst}
        >
          Föregående
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onNext}
          disabled={isLast}
        >
          {isLast ? 'Klart' : 'Nästa'}
        </button>
      </div>
    </nav>
  )
}
