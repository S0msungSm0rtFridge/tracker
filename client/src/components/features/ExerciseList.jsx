import '../../styles/ExerciseList.css'
import { LiftingWeightChart } from "../components/ui/LiftingWeightChart";

function ExerciseList({ user, bodypart }) {
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
                        <tr>
                            <td>Bench Press</td>
                            <td>135</td>
                            <td>10</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>Incline Dumbbell Press</td>
                            <td>40</td>
                            <td>12</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
                <div className="pagination">
                    <span>Rows per page: 5</span>
                    <span>1–? of ?</span>
                    <button>{`<`}</button>
                    <button>{`>`}</button>
                </div>
            </div>
            <button className="add-exercise-button">Add Exercise</button>
            <LiftingWeightChart />
        </div>
       
    );
}

export { ExerciseList };