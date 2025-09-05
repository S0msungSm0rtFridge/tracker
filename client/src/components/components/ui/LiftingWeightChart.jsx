import '../../../styles/LiftingWeightChart.css'
import { useExercise } from '../../wrappers/ExerciseSelector';

function LiftingWeightChart() {

    const { selectedExercise } = useExercise();
    console.log(selectedExercise?.exerciseID?.videoUrl);
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

export { LiftingWeightChart }