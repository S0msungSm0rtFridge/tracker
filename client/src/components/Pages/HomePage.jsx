import React from "react";

import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import { ExerciseList } from "../features/ExerciseList";
import { Authpage } from "./Authpage";
import axios from "axios";
import { useState } from "react";

import '../../styles/Homepage.css'

function Homepage() {


    const WindowHandler = () => {
        const [user, setUser] = useState(null);
        const [windowState, setWindowState] = useState(["Authpage", null]);

        if(windowState[0] === "Authpage"){
            return (
                <div className="home-page-main-container">
                    <Authpage setWindowState = {setWindowState} setUser = {setUser}/>
                </div>
            )
        }
        if(windowState[0] === "Home"){
            console.log(user);
            return (
                <div className="home-page-main-container">
                    <LeftDashBoard />
                    <BodyPartGrid />
                    <ExerciseList />
                </div>
            )
        }
    }
    

    return (
        <div className="home-page-main-container">
            <WindowHandler />
        </div>
    );
}

export { Homepage };