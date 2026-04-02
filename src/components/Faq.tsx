import { useState } from 'react'
import Card from './Card'
import CardContent from './CardContent'
import CardHeader from './CardHeader'
import './Faq.scss'

const faqEntries = [
    {
        question: 'Wo kann ich parken?',
        answer: 'In der Nähe der Kirche gibt es das Parkhaus Hornschuch-Center und den Parkplatz Kleine Freiheit. ' +
            'Beim Redoutensaal könnt ihr direkt gegenüber am Parkplatz Theaterplatz parken.',
    },
    {
        question: 'Was soll ich euch schenken?',
        answer: 'Bei Fragen rund um Geschenke und Überraschungen dürft ihr euch gerne direkt an unsere Trauzeugen Melanie (+4917656702109) und Arthur (+4917632245374) wenden',
    },
    {
        question: 'Wo kann ich übernachten?',
        answer: 'Im Zentrum von Erlangen gibt es einige Hotels. Wir empfehlen, frühzeitig zu buchen, da an diesem Wochenende ' +
            'neben unserer Hochzeit auch andere Veranstaltungen in Erlangen stattfinden.',
    },
] as const

function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index))
    }

    return (
        <Card>
            <CardHeader title="Häufige Fragen" />
            <CardContent>
                <ul className="faq-list" aria-label="Häufig gestellte Fragen">
                    {faqEntries.map((entry, index) => {
                        const isOpen = openIndex === index
                        return (
                            <li key={entry.question} className="faq-item">
                                <button
                                    className={`faq-item__trigger${isOpen ? ' faq-item__trigger--open' : ''}`}
                                    aria-expanded={isOpen}
                                    onClick={() => toggle(index)}
                                >
                                    <span className="faq-item__question">{entry.question}</span>
                                    <span className="faq-item__icon" aria-hidden="true" />
                                </button>
                                <div
                                    className={`faq-item__body${isOpen ? ' faq-item__body--open' : ''}`}
                                    hidden={!isOpen}
                                >
                                    <p className="faq-item__answer">{entry.answer}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>
    )
}

export default Faq
