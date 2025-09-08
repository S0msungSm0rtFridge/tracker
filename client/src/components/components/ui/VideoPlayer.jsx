import '../../../styles/LiftingWeightChart.css'
import { useExercise } from '../../wrappers/ExerciseSelector';
import { memo } from "react";

function VideoPlayer() {

    const { selectedExercise } = useExercise();
    if (!selectedExercise?.exerciseID?.videoUrl) return null;
    return (
        <div className="example-video-container">
            {selectedExercise?.exerciseID?.videoUrl && (
                <iframe
                    width="560"
                    height="315"
                    src={selectedExercise?.exerciseID?.videoUrl.replace("watch?v=", "embed/")}
                    title={selectedExercise?.exerciseID?.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
}

export {VideoPlayer}