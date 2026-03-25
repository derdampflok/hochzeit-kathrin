import { Card } from './Card'
import { CardContent } from './CardContent'
import './HeroSection.scss'

function HeroSection() {
  return (
    <>
      <Card className="hero rings-background" aria-label="Kathrin & Richard">
        <CardContent>
          <h1 className="hero__title">Kathrin &amp; Richard</h1>
        </CardContent>
      </Card>

      <Card className="hero" aria-label="Einladung">
        <CardContent>
          <div className="hero__divider" aria-hidden="true">
            <span className="hero__divider-line" />
            <span className="hero__divider-ornament">✦</span>
            <span className="hero__divider-line" />
          </div>

          <p className="hero__date">Samstag, 1. August 2026</p>
          <p className="hero__intro">
            Von Herzen laden wir dich ein, mit uns Liebe, Freude und einen
            unvergesslichen Tag zu feiern.
          </p>

          <div className="hero__swan-seal" role="img" aria-label="Schwan Symbol">
            <span className="hero__swan-symbol" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default HeroSection