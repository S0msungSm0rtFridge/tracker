import React from "react";

import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import { ExerciseList } from "../components/ui/ExerciseList";
import { AddExercise } from "../components/ui/AddExercise";
import { Authpage } from "./Authpage";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

import '../../styles/Homepage.css'

function Homepage() {
    const [user, setUser] = useState(null);
    const [windowState, setWindowState] = useState(["Authpage", null]);

    const fetchUser = useCallback(async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
        setUser(res);
    } catch (err) {
        console.error(err);
    }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [windowState, fetchUser]);

    if (windowState[0] === "Authpage") {
        return (
            <div className="home-page-main-container">
                <Authpage setWindowState={setWindowState} setUser={setUser} />
            </div>
        );
    }

    if (windowState[0] === "Home") {
        return (
            <div className="home-page-main-container">
                <LeftDashBoard />
                <BodyPartGrid />
                <ExerciseList user={user} setWindowState={setWindowState} />
                {windowState[1] === "AddExercise" && (
                    <AddExercise
                    user={user}
                    bodyPart=""
                    setWindowState={setWindowState}
                    fetchUser={fetchUser}
                    />
                )}
            </div>
            );
        }
    }


export { Homepage };