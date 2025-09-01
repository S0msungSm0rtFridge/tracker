import React from "react";

import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import { ExerciseList } from "../features/ExerciseList";
import { Login } from "../features/Login";

import axios from "axios";
import { useState } from "react";

import '../../styles/Homepage.css'

function Homepage() {

    return (
        <div className="home-page-main-container">
            {/* <LeftDashBoard />
            <BodyPartGrid />
            <ExerciseList /> */}
            <Login />
        </div>
    );
}

export { Homepage };