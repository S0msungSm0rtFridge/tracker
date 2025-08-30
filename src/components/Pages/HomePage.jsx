import React from "react";
import { LeftDashBoard } from "../components/layout/LeftDashBoard";
import { BodyPartGrid } from "../components/layout/BodyPartGrid";
import '../../styles/Homepage.css'
function Homepage() {

    return (
        <div className="home-page-main-container">
            <LeftDashBoard />
            <BodyPartGrid />
        </div>
    );
}

export { Homepage };