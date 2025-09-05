import { useState, useContext, createContext } from "react"

const ExerciseWrapper = createContext();

export function ExerciseProvider( { children } ){

    const [selectedExercise, setSelectedExercise] = useState(null);

     return (
        <ExerciseWrapper.Provider value={{ selectedExercise, setSelectedExercise }}>
            {children}
        </ExerciseWrapper.Provider>
    );
}

export function useExercise() {
  return useContext(ExerciseWrapper);
}