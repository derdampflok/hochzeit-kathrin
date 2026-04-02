import Card from './Card'
import CardContent from './CardContent'
import CardHeader from './CardHeader'
import './Schedule.scss'

const timelineEntries = [
    { time: '12:00 Uhr', label: 'Beginn der Trauung' },
    { time: null, label: 'Sektempfang an der Kirche' },
    { time: '14:00 Uhr', label: 'Abfahrt zum Redoutensaal' },
    { time: '15:30 Uhr', label: 'Kaffee & Kuchen' },
    { time: '18:30 Uhr', label: 'Abendessen & Party' },
] as const

function Schedule() {
    return (
        <Card>
            <CardHeader title="Ablauf" />
            <CardContent>
                <ol className="schedule-timeline" aria-label="Zeitlicher Ablauf der Hochzeit">
                    {timelineEntries.map((entry) => (
                        <li className="schedule-timeline__item" key={entry.label}>
                            <span className="schedule-timeline__dot" aria-hidden="true" />
                            <p className="schedule-timeline__entry">
                                {entry.time && <><strong>{entry.time}</strong><br /></>}
                                {entry.label}
                            </p>
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    )
}

export default Schedule