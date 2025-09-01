import { useEffect, useState, useRef } from "react"
import axios from "axios"
import '../../../styles/AddExercise.css'

function AddExercise({user, bodyPart, setWindowState}){

    const [exercises, setExercises] = useState([]);
    const [UserDup, setUserDup] = useState(false);
    const [dbDup, setdbDup] = useState(false);
    const exerciseInput = useRef(null);
    
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

    const isUserDup = async () => {
        const dup = user.data.exercises.some( (exercise) => {
            return exercise.name.toLowerCase().trim() === exerciseInput.current.value.toLowerCase().trim();
        });
        setUserDup(dup);
        if(dup){
            const newUserData = axios.await("http://localhost:5000/api/users/editExercise", {})
        }
    }

    const isdbDup = () => {

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
                <input type = "number" placeholder = "number of reps" className = "add-exercise-page-number-input"></input>
                <input type = "number" placeholder = "number of sets" className = "add-exercise-page-number-input"></input>
            </div>
            <div className = "add-exercise-button-group">
                <button className = "add-exercise-button" onClick = { () => setWindowState(["Home"])}>Cancel</button>
                <button className = "add-exercise-button" onClick = { () => isDup()}>Save</button>
            </div>
        </div>
    )
}

export { AddExercise }