import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import { ExerciseList } from "../components/ui/ExerciseList";
import { VideoPlayer } from "../components/ui/VideoPlayer";
import { AddExercise, EditExercise } from "../features/AddExercise";
import { BodyWeightTable } from "../features/AddBodyWeight";
import { ProgressChart } from "./ChartPage";

import { useAuth } from '../wrappers/AuthProvider'

import '../../styles/Homepage.css'

function Homepage() {
    const location = useLocation();
    const isProgressCharts = location.pathname.includes("progress-charts");
     const [mode, setMode] = useState("Bodyweight"); 
    

    return (
        <div className="home-page-main-container">
            <LeftDashBoard />

            <div className={isProgressCharts ? "progress-chart-full" : ""}>
                {!isProgressCharts && <BodyPartGrid />}

                <Routes>
                    <Route path="progress-charts/*" element={<ProgressChart mode={mode} setMode={setMode}/>}>
                        <Route path="add-exercise" element={<AddExercise />} />
                        <Route path="edit/:exerciseId" element={<EditExercise />} />
                    </Route>

                <Route path="add-exercise" element={<AddExercise />} />
                <Route path="edit/:exerciseId" element={<EditExercise />} />
                </Routes>
            </div>

            <div className="home-page-right-side-container">
                {(isProgressCharts && mode === "Bodyweight")? <BodyWeightTable /> : <ExerciseList />}
                {/** video player here */}
            </div>
</div>
);
}

export { Homepage };