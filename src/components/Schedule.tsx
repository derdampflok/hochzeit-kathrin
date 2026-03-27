import Card from './Card'
import CardContent from './CardContent'
import CardHeader from './CardHeader'
import './Schedule.scss'

const timelineEntries = [
    'Beginn der Trauung 12:00 Uhr',
    'Sektempfang an der Kirche',
    'Abfahrt zum Redoutensaal 14:00 Uhr',
    'Kaffee & Kuchen 15:30',
    'Abendessen & Party 18:30',
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