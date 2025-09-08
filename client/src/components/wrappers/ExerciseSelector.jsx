import { useState, useContext, createContext } from "react"

const ExerciseWrapper = createContext();

export function ExerciseProvider( { children } ){

    const [selectedExercise, setSelectedExercise] = useState();
    const [bodyPart, setSelectedBodyPart] = useState();
    console.log(selectedExercise);
     return (
        <ExerciseWrapper.Provider value={{ selectedExercise, setSelectedExercise, bodyPart, setSelectedBodyPart }}>
            {children}
        </ExerciseWrapper.Provider>
    );
}

export function useExercise() {
  return useContext(ExerciseWrapper);
}