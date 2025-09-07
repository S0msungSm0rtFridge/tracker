import '../../../styles/ExerciseList.css'
import { useExercise } from '../../wrappers/ExerciseSelector';
import { useNavigate } from "react-router-dom";
import { useAuth  } from '../../wrappers/AuthProvider'
import { useState } from 'react';


function ExerciseList() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const { setSelectedExercise, setSelectedBodyPart, bodyPart } = useExercise();

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredExercises = user?.data?.exercises?.filter(
    (exercise) => bodyPart === "All" || bodyPart === exercise?.exerciseID?.muscleGroup
    ) || [];

    const totalPages = Math.ceil(filteredExercises.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentExercises = filteredExercises.slice(indexOfFirst, indexOfLast);
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
                        {currentExercises?.map(exercise => (
                            <tr
                                key={exercise._id}
                                onClick={() => {
                                    setSelectedExercise(exercise);
                                    setSelectedBodyPart(exercise.exerciseID.muscleGroup);
                                }}
                            >
                                <td>{exercise?.name}</td>
                                <td>{exercise?.weight}</td>
                                <td>{exercise?.reps}</td>
                                <td>{exercise?.sets}</td>
                                <th onClick={(e) => { 
                                    e.stopPropagation(); 
                                    navigate(`edit/${exercise?._id}`);
                                }}>
                                    Edit
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>Rows per page: {rowsPerPage}</span>
                    <span>
                        {filteredExercises.length === 0
                            ? "0–0 of 0"
                            : `${indexOfFirst + 1}–${Math.min(indexOfLast, filteredExercises.length)} of ${filteredExercises.length}`}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                        disabled={currentPage === 1}
                    >
                        {`<`}
                    </button>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        {`>`}
                    </button>
                </div>
            </div>
            <button className="add-exercise-button" onClick={() => navigate("add-exercise")}>
                Add Exercise
            </button>
        </div>
    );
}

export { ExerciseList };