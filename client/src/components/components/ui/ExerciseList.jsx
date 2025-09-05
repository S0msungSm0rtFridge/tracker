import '../../../styles/ExerciseList.css'
import { AddExercise } from './AddExercise';
import { useExercise } from '../../wrappers/ExerciseSelector';

function ExerciseList({ user, setWindowState }) {

    const { setSelectedExercise } = useExercise();

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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* THIS WILL BE MAPPED DATA ONCE I ADD A DB */}
                        {user.data.exercises.map( (exercise) => {
                            {/* if bodypart and exercise.muscleGroup === bodypart */}
                            return (
                                <tr onClick = { () => setSelectedExercise(exercise)}>
                                    <td>{exercise?.name}</td>
                                    <td>{exercise?.weight}</td>
                                    <td>{exercise?.reps}</td>
                                    <td>{exercise?.sets}</td>
                                    <th onClick = { () => setWindowState(["Home", "Edit", exercise])}>Edit</th>
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
        </div>
       
    );
}

export { ExerciseList };