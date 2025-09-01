import { useEffect, useState, useRef } from "react"
import axios from "axios"
import '../../../styles/AddExercise.css'

function AddExercise({user, bodyPart, setWindowState}){

    const [exercises, setExercises] = useState([]);
    const exerciseInput = useRef(null);
    const setsInput = useRef(null);
    const repsInput = useRef(null);
    const weightInput = useRef(null);

    
    useEffect(() => {
        const fetchData = async () => {
            try{
                let response;
                if(bodyPart){
                    response = await axios.get(`http://localhost:5000/api/exercises/muscle/${bodyPart}`);
                }else{
                    response = await axios.get(`http://localhost:5000/api/exercises`);
                }
                setExercises(response.data);
            } catch (error){
                console.log("error fetching data", error);
            }

        }
        fetchData();
    }, [bodyPart]);

    const save = async () => {

        if(!exerciseInput.current.value || !repsInput.current.value || !setsInput.current.value || !weightInput.current.value){
            alert("please fill out all forms");
            return;
        }

        const isValid = exercises.find(
            (exercise) => exercise.name.toLowerCase() === exerciseInput.current.value.trim().toLowerCase()
        );

        if (!isValid) {
            alert("Please select a valid exercise from the list. or add a new one");
            return;
        }

        const dup = user.data.exercises.find( (exercise) => {
            return exercise.name.toLowerCase().trim() === exerciseInput.current.value.toLowerCase().trim();
        });

        if (dup) {
            await axios.put(
                "http://localhost:5000/api/users/editExercise",
                {
                    exerciseID: dup._id, 
                    weight: weightInput.current.value,
                    reps: repsInput.current.value,
                    sets: setsInput.current.value
                },
                { withCredentials: true }
            );
        } else {
            await axios.put(
                "http://localhost:5000/api/users/addExercise",
                {
                    exerciseID: isValid._id,
                    name: exerciseInput.current.value,
                    weight: weightInput.current.value,
                    reps: repsInput.current.value,
                    sets: setsInput.current.value
                },
                { withCredentials: true }
            );
        }
        setWindowState(["Home"]);
    }


    
    return (
        <div className = "add-exercise-main-container">
            <div className = "add-exercise-page-title">Add An Exercise</div>
            <div className = "add-exercise-page-discriptor">Select an exercise or add a new one and enter designated reps and sets</div>
            <div className = "add-exercise-page-form">
            <input
                className="add-exercise-page-exercise-name"
                list="exercise-list"
                placeholder="Type or pick…"
                ref = {exerciseInput}
            />
            <datalist id="exercise-list" className="add-exercise-page-data-list">
                {exercises.map((exercise) => (
                    <option key={exercise._id || exercise.name} value={exercise.name}></option>                
                ))}
            </datalist>
                <input type = "number" ref = { weightInput } placeholder = "Weight" className = "add-exercise-page-number-input"></input>
                <input type = "number" ref = { repsInput } placeholder = "number of reps" className = "add-exercise-page-number-input"></input>
                <input type = "number" ref = { setsInput } placeholder = "number of sets" className = "add-exercise-page-number-input"></input>
            </div>
            <div className = "add-exercise-button-group">
                <button className = "add-exercise-button" onClick = { () => setWindowState(["Home"])}>Cancel</button>
                <button className = "add-exercise-button" onClick = { () => save()}>Save</button>
                <button className = "add-exercise-button" onClick = { () => isDup()}>Add New Exercise</button>
            </div>
        </div>
    )
}

export { AddExercise }