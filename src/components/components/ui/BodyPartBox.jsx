import '../../../styles/BodyPartBox.css'

function BodyPartBox({ image, name }) {
    return (
        <div className = "body-part-box-container">
            <img src = {image} alt = {name} className = "body-part-image"></img>
        </div>
    )
}

export { BodyPartBox }