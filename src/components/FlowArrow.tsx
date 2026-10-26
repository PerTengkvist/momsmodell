interface FlowArrowProps {
  label: string
  amount?: string
  note?: string
  variant?: 'incl' | 'excl' | 'vat' | 'refund' | 'neutral'
  direction?: 'right' | 'down'
}

export function FlowArrow({
  label,
  amount,
  note,
  variant = 'neutral',
  direction = 'right',
}: FlowArrowProps) {
  return (
    <div
      className={`flow-arrow flow-arrow--${direction} flow-arrow--${variant}`}
      role="img"
      aria-label={`${label}${amount ? `: ${amount}` : ''}`}
    >
      <div className="flow-arrow__label">
        <span className="flow-arrow__tag">{label}</span>
        {amount ? <strong className="flow-arrow__amount">{amount}</strong> : null}
        {note ? <span className="flow-arrow__note">{note}</span> : null}
      </div>
      <div className="flow-arrow__line" aria-hidden="true">
        <span className="flow-arrow__shaft" />
        <span className="flow-arrow__head" />
      </div>
    </div>
  )
}
