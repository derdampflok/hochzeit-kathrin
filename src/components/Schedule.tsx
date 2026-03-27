import Card from './Card'
import CardContent from './CardContent'
import CardHeader from './CardHeader'
import './Schedule.scss'

const timelineEntries = [
    '12:00 Uhr | Beginn der Trauung',
    'Sektempfang an der Kirche',
    '14:00 Uhr | Abfahrt zum Redoutensaal',
    '15:30 Uhr | Kaffee & Kuchen',
    '18:30 Uhr | Abendessen & Party',
] as const

function Schedule() {
    return (
        <Card>
            <CardHeader title="Ablauf" />
            <CardContent>
                <ol className="schedule-timeline" aria-label="Zeitlicher Ablauf der Hochzeit">
                    {timelineEntries.map((entry) => (
                        <li className="schedule-timeline__item" key={entry}>
                            <span className="schedule-timeline__dot" aria-hidden="true" />
                            <p className="schedule-timeline__entry">{entry}</p>
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    )
}

export default Schedule