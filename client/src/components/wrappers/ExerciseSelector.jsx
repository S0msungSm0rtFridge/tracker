import { useState, useContext, createContext } from "react"

const ExerciseWrapper = createContext();

export function ExerciseProvider( { children } ){

    const [selectedExercise, setSelectedExercise] = useState(null);
    const [bodyPart, setSelectedBodyPart] = useState("All");

     return (
        <ExerciseWrapper.Provider value={{ selectedExercise, setSelectedExercise, bodyPart, setSelectedBodyPart }}>
            {children}
        </ExerciseWrapper.Provider>
    );
}

export function useExercise() {
  return useContext(ExerciseWrapper);
}