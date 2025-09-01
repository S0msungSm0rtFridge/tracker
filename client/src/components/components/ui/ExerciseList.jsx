import '../../../styles/ExerciseList.css'
import { LiftingWeightChart } from "./LiftingWeightChart";


function ExerciseList({ user, setWindowState }) {

    return (
        <div className="exercise-list-container">
            <div className="table-container">
                <table className="exercise-table">
                    <thead>
                        <tr>
                            <th>Exercise Name</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Sets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* THIS WILL BE MAPPED DATA ONCE I ADD A DB */}
                        {user.data.exercises.map( (exercise) => {
                            {/* if bodypart and exercise.muscleGroup === bodypart */}
                            return (
                                <tr>
                                    <td>{exercise.name}</td>
                                    <td>{exercise.weight}</td>
                                    <td>{exercise.reps}</td>
                                    <td>{exercise.sets}</td>
                                </tr>    
                        )})}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>Rows per page: 5</span>
                    <span>1–? of ?</span>
                    <button>{`<`}</button>
                    <button>{`>`}</button>
                </div>
            </div>
            <button className="add-exercise-button" onClick = { () => setWindowState(["Home", "AddExercise"])}>Add Exercise</button>
            <LiftingWeightChart />
        </div>
       
    );
}

export { ExerciseList };