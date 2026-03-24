import { Card } from './Card'
import { CardContent } from './CardContent'
import './MemoriesSection.scss'

type MemoryCard = {
  placeholderLabel: string
  placeholderText: string
  caption: string
  variant?: 'default' | 'alt'
}

const memoryCards: MemoryCard[] = [
  {
    placeholderLabel: 'Platzhalter für Paarfoto',
    placeholderText: 'Paarfoto einsetzen',
    caption: 'Lieblingsmoment von Kathrin & Richard',
  },
  {
    placeholderLabel: 'Platzhalter für Erinnerungsfoto',
    placeholderText: 'Weiteres Foto einsetzen',
    caption: 'Ein Augenblick voller Vorfreude',
    variant: 'alt',
  },
]

/**
 * MemoriesSection: Photo gallery card
 *
 * Displays a 2-column grid of memory photos with captions.
 * Uses Card wrapper with botanical minimalist styling.
 * Responsive: stacks to single column on mobile.
 *
 * German text: Photo captions and labels in German
 */
function MemoriesSection() {
  return (
    <Card variant="memories" className="memories" aria-label="Bildbereich">
      <CardContent>
        <div className="memories__grid">
          {memoryCards.map((card) => (
            <figure className="memories__photo-card" key={card.placeholderLabel}>
              <div
                className={`memories__placeholder${card.variant === 'alt' ? ' memories__placeholder--alt' : ''}`}
                role="img"
                aria-label={card.placeholderLabel}
              >
                <span>{card.placeholderText}</span>
              </div>
              <figcaption className="memories__caption">{card.caption}</figcaption>
            </figure>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default MemoriesSection