type ActorKind = 'se' | 'com' | 'agency' | 'highlight'

interface ActorCardProps {
  name: string
  subtitle?: string
  kind?: ActorKind
  active?: boolean
  compact?: boolean
}

export function ActorCard({
  name,
  subtitle,
  kind = 'se',
  active = false,
  compact = false,
}: ActorCardProps) {
  return (
    <article
      className={`actor-card actor-card--${kind}${active ? ' is-active' : ''}${compact ? ' actor-card--compact' : ''}`}
    >
      <span className="actor-card__badge" aria-hidden="true">
        {kind === 'agency' ? 'SV' : kind === 'com' ? '.com' : '.se'}
      </span>
      <h3 className="actor-card__name">{name}</h3>
      {subtitle ? <p className="actor-card__subtitle">{subtitle}</p> : null}
    </article>
  )
}
