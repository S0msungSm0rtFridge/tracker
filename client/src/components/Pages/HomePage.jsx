import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import { ExerciseList } from "../components/ui/ExerciseList";
import { VideoPlayer } from "../components/ui/VideoPlayer";
import { AddExercise, EditExercise } from "../components/ui/AddExercise";
import { ProgressChart } from "./ChartPage";

import { useAuth } from '../wrappers/AuthProvider'

import '../../styles/Homepage.css'

function Homepage() {

    const location = useLocation();
    const isProgressCharts = location.pathname.includes("progress-charts");
    console.log(isProgressCharts);
    return (
        <div className="home-page-main-container">
            <LeftDashBoard />
            {!isProgressCharts && <BodyPartGrid />}
            
            <div className="home-page-right-side-container">
            <ExerciseList />
                <Routes>
                <Route path="add-exercise" element={<AddExercise />} />
                <Route path="edit/:exerciseId" element={<EditExercise />} />
                <Route path="progress-charts" element={<ProgressChart />}/>
                </Routes>

                {/* Chart can always show */}
                {/* <VideoPlayer /> */}
            </div>
        </div>
        );
    }

export { Homepage };