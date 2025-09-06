import '../../../styles/BodyPartGrid.css'
import { useExercise } from "../../wrappers/ExerciseSelector"




function BodyPartGrid(){

    const { bodyPart } = useExercise();

    const path = "/assets/chest.png";
    console.log("Image path:", path);
    return (
        <div className = "body-part-grid-container">
            <BodyPartBox image="https://via.placeholder.com/500" name="Chest" key="Chest" selected={bodyPart === "Chest"} />
            <BodyPartBox image="/assets/back.png" name="Back" key="Back" selected={bodyPart === "Back"} />
            <BodyPartBox image="/assets/biceps.png" name="Biceps" key="Biceps" selected={bodyPart === "Biceps"} />
            <BodyPartBox image="/assets/triceps.png" name="Triceps" key="Triceps" selected={bodyPart === "Triceps"} />
            <BodyPartBox image="/assets/shoulders.png" name="Shoulders" key="Shoulders" selected={bodyPart === "Shoulders"} />
            <BodyPartBox image="/assets/legs.png" name="Legs" key="Legs" selected={bodyPart === "Legs"} />
            <BodyPartBox image="/assets/forearms.png" name="Forearms" key="Forearms" selected={bodyPart === "Forearms"} />
            <BodyPartBox image="/assets/all.png" name="All" key="All" selected={bodyPart === "All"} />
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