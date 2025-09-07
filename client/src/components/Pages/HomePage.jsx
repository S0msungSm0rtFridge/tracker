import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";


import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import { ExerciseList } from "../components/ui/ExerciseList";
import { LiftingWeightChart } from "../components/ui/LiftingWeightChart";
import { AddExercise, EditExercise } from "../components/ui/AddExercise";

import { useAuth } from '../wrappers/AuthProvider'

import '../../styles/Homepage.css'

function Homepage() {

    const { refreshUser } = useAuth();
    return (
        <div className="home-page-main-container">
            <LeftDashBoard />
            <BodyPartGrid />
            
            <div className="home-page-right-side-container">
            <ExerciseList />
                <Routes>
                <Route path="add-exercise" element={<AddExercise />} />
                <Route path="edit/:exerciseId" element={<EditExercise />} />
                </Routes>

                {/* Chart can always show */}
                <LiftingWeightChart />
            </div>
        </div>
        );
    }

export { Homepage };