export function IntroStep() {
  return (
    <div className="step-panel">
      <p className="step-kicker">Steg 1 · Introduktion</p>
      <h2 className="step-title">Hur moms rör sig mellan svenska och utländska företag</h2>
      <p className="step-lead">
        Moms är en skatt på konsumtion. Företag samlar in och redovisar den till
        Skatteverket — men reglerna skiljer sig beroende på om motparten är svensk
        eller utländsk.
      </p>

      <div className="insight-grid">
        <article className="insight-card" style={{ animationDelay: '0.05s' }}>
          <h3>Inköp i Sverige</h3>
          <p>
            När C.se handlar från A.se betalas beloppet <strong>inklusive moms</strong>.
            Leverantören sköter momsen mot Skatteverket.
          </p>
        </article>
        <article className="insight-card" style={{ animationDelay: '0.12s' }}>
          <h3>Inköp från utlandet</h3>
          <p>
            Från B.com betalar C ofta <strong>exklusive moms</strong>, men redovisar
            momsen själv till Skatteverket (omvänd skattskyldighet).
          </p>
        </article>
        <article className="insight-card" style={{ animationDelay: '0.19s' }}>
          <h3>Exportförsäljning</h3>
          <p>
            När C.se säljer till D.com faktureras normalt <strong>utan moms</strong>.
            Då kan C behöva kompensation för momsen på sina inköp.
          </p>
        </article>
      </div>

      <aside className="obs-note">
        <strong>Obs.</strong> Detta är en förenklad pedagogisk modell — inte en
        komplett momshandbok. Fokus ligger på flödet av belopp och moms mellan aktörerna.
      </aside>
    </div>
  )
}
