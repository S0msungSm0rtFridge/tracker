import { useEffect, useState, useRef } from "react"
import axios from "axios"
import '../../../styles/AddExercise.css'
import { useParams, useNavigate } from "react-router-dom";
import { useAuth  } from '../../wrappers/AuthProvider'


function AddExercise({bodyPart}){

    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState([]);
    const exerciseInput = useRef(null);
    const setsInput = useRef(null);
    const repsInput = useRef(null);
    const weightInput = useRef(null);
    const dateInput = useRef(null);

    
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

        console.log(dateInput.current.value);
        const dateString = dateInput.current.value; 
        const selectedDate = new Date(dateString);

        if(!exerciseInput.current.value || !repsInput.current.value || !setsInput.current.value || !weightInput.current.value || !dateInput.current.value){
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

        const dup = user?.data?.exercises?.find( (exercise) => {
            return exercise.name.toLowerCase().trim() === exerciseInput.current.value.toLowerCase().trim();
        });

        if (dup) {
            await axios.put(
                "http://localhost:5000/api/users/editExercise",
                {
                    exerciseID: dup._id, 
                    weight: weightInput.current.value,
                    reps: repsInput.current.value,
                    sets: setsInput.current.value,
                    date: selectedDate
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
                    sets: setsInput.current.value,
                    date: selectedDate
                },
                { withCredentials: true }
            );
        }

            
        refreshUser();
        navigate("/home");
    }

    const isDup = () => {

        if(!exerciseInput.current.value || !repsInput.current.value || !setsInput.current.value || !weightInput.current.value || !dateInput.current.value){
            alert("please fill out all forms");
            return;
        }

        
        const dup = user?.data?.exercises?.find( (exercise) => {
            return exercise.name.toLowerCase().trim() === exerciseInput.current.value.toLowerCase().trim();
        });

        if(dup){
            console.log("runs");
            alert("that exercise already exist");
        } else{
            alert("HAVENT DECIDED IF I WANT TO ALLOW PEOPLE TO ADD EXERCISES AND IF YES HOW SHOUOLD I EVEN VALIDATE");
        }
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
                <input type="date" className="add-exercise-page-number-input" ref={dateInput} />
            </div>
            <div className = "add-exercise-button-group">
                <button className = "add-exercise-button" onClick = { () => navigate("/home")}>Cancel</button>
                <button className = "add-exercise-button" onClick = { () => save()}>Save</button>
                <button className = "add-exercise-button" onClick = { () => isDup()}>Add New Exercise</button>
            </div>
        </div>
    )
}

function EditExercise(){

    const dateInput = useRef(null);
    const setsInput = useRef(null);
    const repsInput = useRef(null);
    const weightInput = useRef(null);
    const navigate = useNavigate();

    const { exerciseId } = useParams();  
    const { user, refreshUser } = useAuth();
    const exercise = user?.data?.exercises?.find(e => e._id === exerciseId);

    const save = async () => {

        console.log(dateInput.current.value);
        const dateString = dateInput.current.value; 
        const selectedDate = new Date(dateString);

        if(!repsInput.current.value || !setsInput.current.value || !weightInput.current.value || !dateInput.current.value){
            alert("please fill out all forms");
            return;
        }


        await axios.put(
            "http://localhost:5000/api/users/editExercise",
            {
                exerciseID: exercise._id, 
                weight: weightInput.current.value,
                reps: repsInput.current.value,
                sets: setsInput.current.value,
                date: selectedDate
            },
            { withCredentials: true }
        );

        refreshUser();
        navigate("/home");
    }

    const del = async () => {
        try{
            await axios.put(
            "http://localhost:5000/api/users/removeExercise",
            {
                exerciseID: exercise._id, 
            },
            { withCredentials: true }
            );
        } catch (error){
            console.log(error);
        }
        refreshUser();
        navigate("/home");
    }


    
    return (
        <div className = "add-exercise-main-container">
            <div className = "add-exercise-page-title">{exercise.name}</div>
            <div className = "add-exercise-page-discriptor">Enter designated reps and sets</div>
            <div className = "add-exercise-page-form">
                <div></div>
                <input type = "number" ref = { weightInput } placeholder = "Weight" className = "add-exercise-page-number-input"></input>
                <input type = "number" ref = { repsInput } placeholder = "number of reps" className = "add-exercise-page-number-input"></input>
                <input type = "number" ref = { setsInput } placeholder = "number of sets" className = "add-exercise-page-number-input"></input>
                <input type="date" className="add-exercise-page-number-input" ref={dateInput} />

            </div>
            <div className = "add-exercise-button-group">
                <button className = "add-exercise-button" onClick = { () => navigate("/home")}>Cancel</button>
                <button className = "add-exercise-button" onClick = { () => save()}>Save</button>
                <button className = "add-exercise-button" onClick = { () => del()}>delete</button>
            </div>
        </div>
    )
}

export { AddExercise, EditExercise }