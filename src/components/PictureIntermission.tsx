import Card from "./Card"
import "./PictureIntermission.scss"
import Picture from "../assets/kathrin-richard-2.jpg"

function PictureIntermission() {
    return (
        <Card className="no-padding picture-intermission-card">
            <img src={Picture} className="picture-intermission" />
        </Card>
    )
}

export default PictureIntermission