import { Card } from './Card'
import { CardContent } from './CardContent'
import './HeroSection.scss'

/**
 * HeroSection: Main invitation header
 *
 * Displays couple names, date, and invitation message.
 * Uses Card wrapper with botanical minimalist styling.
 *
 * German text: "Wir heiraten" (We're getting married)
 */
function HeroSection() {
  return (
    <Card variant="hero" className="hero" aria-label="Einladung zur Hochzeit">
      <CardContent>
        <p className="hero__kicker">Wir heiraten</p>
        <h1 className="hero__title">Kathrin &amp; Richard</h1>

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
  )
}

export default HeroSection