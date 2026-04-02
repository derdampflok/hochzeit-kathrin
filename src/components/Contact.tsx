import Card from './Card'
import CardContent from './CardContent'
import CardHeader from './CardHeader'
import './Contact.scss'

function Contact() {
    return (
        <Card>
            <CardHeader
                title="Kontakt zu den Trauzeugen"
                subtitle="Für Geschenke, Überraschungen und organisatorische Fragen"
            />
            <CardContent>
                <p className="contact__intro">
                    Wenn ihr etwas planen möchtet oder eine Frage habt, meldet euch gerne direkt bei unseren Trauzeugen.
                </p>

                <ul className="contact__list" aria-label="Kontakt zu den Trauzeugen">
                    <li className="contact__item">
                        <h3>Melanie Arndt</h3>
                        <p>
                            +4917656702109
                        </p>
                    </li>
                    <li className="contact__item">
                        <h3>Arthur Schneider</h3>
                        <p>
                            +4917632245374
                        </p>
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}

export default Contact