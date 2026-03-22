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

function MemoriesSection() {
    return (
        <section className="memories" aria-label="Bildbereich">
            {memoryCards.map((card) => (
                <figure className="photo-card" key={card.placeholderLabel}>
                    <div
                        className={`photo-placeholder${card.variant === 'alt' ? ' alt' : ''}`}
                        role="img"
                        aria-label={card.placeholderLabel}
                    >
                        <span>{card.placeholderText}</span>
                    </div>
                    <figcaption>{card.caption}</figcaption>
                </figure>
            ))}
        </section>
    )
}

export default MemoriesSection