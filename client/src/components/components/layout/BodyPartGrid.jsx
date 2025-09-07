import '../../../styles/BodyPartGrid.css'
import { useExercise } from "../../wrappers/ExerciseSelector"


function BodyPartGrid(){

    const { bodyPart } = useExercise();

    const path = "/images/chest.png";
    console.log("Image path:", path);
    return (
        <div className = "body-part-grid-container">
            <BodyPartBox image="/images/chest.png" name="Chest" key="Chest" selected={bodyPart === "Chest"} />
            <BodyPartBox image="/images/back.png" name="Back" key="Back" selected={bodyPart === "Back"} />
            <BodyPartBox image="/images/bicep.png" name="Biceps" key="Biceps" selected={bodyPart === "Biceps"} />
            <BodyPartBox image="/images/tricep.png" name="Triceps" key="Triceps" selected={bodyPart === "Triceps"} />
            <BodyPartBox image="/images/shoulder.png" name="Shoulders" key="Shoulders" selected={bodyPart === "Shoulders"} />
            <BodyPartBox image="/images/leg.png" name="Legs" key="Legs" selected={bodyPart === "Legs"} />
            <BodyPartBox image="/images/forearm.png" name="Forearms" key="Forearms" selected={bodyPart === "Forearms"} />
            <BodyPartBox image="/images/all.png" name="All" key="All" selected={bodyPart === "All"} />
        </div>
    )

}


function BodyPartBox({ image, name, selected }) {
    console.log(image);
    const { setSelectedBodyPart } = useExercise();
    return (
        <div
          className={`body-part-box-container${selected ? " selected" : ""}`}
          onClick = { () => setSelectedBodyPart(name)}>
            <img src = {image} alt = {name} className = "body-part-image"></img>
        </div>
    )
}




export { BodyPartGrid }