import './HeroSection.scss'

function HeroSection() {
    return (
        <section className="hero" aria-label="Einladung zur Hochzeit">
            <p className="kicker">Wir heiraten</p>
            <h1>Kathrin &amp; Richard</h1>

            <div className="hero-divider" aria-hidden="true">
                <span className="line" />
                <span className="ornament">❦</span>
                <span className="line" />
            </div>

            <p className="date">Samstag, 1. August 2026</p>
            <p className="intro">
                Von Herzen laden wir dich ein, mit uns Liebe, Freude und einen
                unvergesslichen Tag zu feiern.
            </p>

            <div className="swan-seal" role="img" aria-label="Schwan Symbol">
                <span className="swan-symbol" aria-hidden="true" />
            </div>
        </section>
    )
}

export default HeroSection