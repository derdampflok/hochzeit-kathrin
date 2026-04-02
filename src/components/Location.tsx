import Card from "./Card"
import CardContent from "./CardContent"
import CardHeader from "./CardHeader"
import "./Location.scss"

function Location() {
    return (
        <Card>
            <CardHeader title="Location"></CardHeader>
            <CardContent className="location-maps">
                <div className="map-wrapper">
                    <p className="pre-heading">Trauung</p>
                    <h3>Auferstehungskirche Fürth</h3>
                    <address className="map-address">
                        <span>Nürnberger Str. 15</span>
                        <span>90762 Fürth</span>
                    </address>
                    <iframe
                        className="location-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2592.6676218273597!2d10.993122876389025!3d49.4718946573372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479f55fbd2d9e605%3A0xfc3605eb38bbbcc2!2sAuferstehungskirche!5e0!3m2!1sde!2sde!4v1774459785633!5m2!1sde!2sde"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <div className="map-wrapper">
                    <p className="pre-heading">Feier</p>
                    <h3>Redoutensaal Erlangen</h3>
                    <address className="map-address">
                        <span>Theaterpl. 1</span>
                        <span>91054 Erlangen</span>
                    </address>
                    <iframe
                        className="location-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5171.7983516775475!2d11.002909876395984!3d49.599650748257325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a1f8e72bf78a3f%3A0xd3b9eeffcb6ac807!2sRedoutensaal%20-%20Erlangen!5e0!3m2!1sde!2sde!4v1774459944431!5m2!1sde!2sde"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </CardContent>
        </Card>
    )
}

export default Location