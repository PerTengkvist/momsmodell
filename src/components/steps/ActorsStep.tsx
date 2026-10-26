import { ActorCard } from '../ActorCard'

export function ActorsStep() {
  return (
    <div className="step-panel">
      <p className="step-kicker">Steg 2 · Aktörer</p>
      <h2 className="step-title">Fem aktörer i exemplet</h2>
      <p className="step-lead">
        .se betyder svenskt företag. .com betyder utländskt företag i den här modellen.
        Skatteverket är knutpunkten för momsredovisning och eventuell kompensation.
      </p>

      <div className="actors-stage">
        <div className="actors-row" style={{ animationDelay: '0.05s' }}>
          <ActorCard name="A.se" subtitle="Svensk leverantör" kind="se" active />
          <ActorCard name="B.com" subtitle="Utländsk leverantör" kind="com" active />
        </div>
        <div className="actors-row actors-row--center" style={{ animationDelay: '0.12s' }}>
          <ActorCard
            name="C.se"
            subtitle="Vårt fokusföretag — köper och säljer"
            kind="highlight"
            active
          />
        </div>
        <div className="actors-row" style={{ animationDelay: '0.19s' }}>
          <ActorCard name="D.com" subtitle="Utländsk kund" kind="com" active />
          <ActorCard
            name="Skatteverket"
            subtitle="Moms redovisas hit / kompensation härifrån"
            kind="agency"
            active
          />
        </div>
      </div>
    </div>
  )
}
