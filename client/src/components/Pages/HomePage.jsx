import React from "react";

import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import { ExerciseList } from "../components/ui/ExerciseList";
import { AddExercise } from "../components/ui/AddExercise";
import { Authpage } from "./Authpage";
import axios from "axios";
import { useState, useEffect } from "react";

import '../../styles/Homepage.css'

function Homepage() {


    const WindowHandler = () => {

        
        const [user, setUser] = useState(null);

        useEffect(() => {
            const fetchUser = async () => {
                try{
                    const user = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
                    setUser(user.data);                
                } catch (error){
                    console.log(error);
                }

            }
            fetchUser();

        },)
        const [windowState, setWindowState] = useState(["Authpage", null]);

        if(windowState[0] === "Authpage"){
            return (
                <div className="home-page-main-container">
                    <Authpage setWindowState = {setWindowState}/>
                </div>
            )
        }
        if(windowState[0] === "Home"){
            return (
                <div className="home-page-main-container">
                    <LeftDashBoard />
                    <BodyPartGrid />
                    <ExerciseList user={user} setWindowState={setWindowState}/>
                    {windowState[1] === "AddExercise" && <AddExercise user = {user} bodyPart={""} setWindowState={setWindowState}/>}

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