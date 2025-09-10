import React from "react";
import { Line } from "react-chartjs-2";
import { Outlet } from "react-router-dom"; 
import { useExercise } from "../wrappers/ExerciseSelector";
import '../../styles/ProgressChart.css';
import { useEffect } from "react";
import { useAuth } from "../wrappers/AuthProvider";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
    Title
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler, Title);

function ProgressChart({mode, setMode}) {

    if(mode === "Lifts"){
        return (
            <LiftingProgressChart mode={mode} setMode={setMode} />
        )
    } else{
        return (
            <BodyweightProgressChart mode={mode} setMode={setMode}></BodyweightProgressChart>
        )
    }

}

function LiftingProgressChart({mode, setMode}){

    const { selectedExercise, setSelectedExercise, setSelectedBodyPart } = useExercise();
    const { user } = useAuth();
    
    useEffect(() => {
        setSelectedBodyPart(null);
    },[])
    if (!selectedExercise) {
        setSelectedExercise(user?.data?.exercises[0]);
    }
    const extractData = (arr) => {
        if (!arr?.length) return { labels: [], values: [] };

        const sorted = arr.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        const labels = sorted.map(e => new Date(e.date).toLocaleDateString());
        const values = sorted.map(e => e.value);
        return { labels, values };
    };

    const weightData = extractData(selectedExercise.weight);
    const repsData = extractData(selectedExercise.reps);
    const setsData = extractData(selectedExercise.sets);

    const allDatesSet = new Set([...weightData.labels, ...repsData.labels, ...setsData.labels]);
    const labels = Array.from(allDatesSet).sort((a, b) => new Date(a) - new Date(b));

    const mapValuesToLabels = (labels, dataLabels, dataValues) =>
        labels.map(label => {
            const index = dataLabels.indexOf(label);
            return index !== -1 ? dataValues[index] : null;
        });
    const title = selectedExercise.name;
    const data = {
        labels,
        datasets: [
            {
                label: "Weight",
                data: mapValuesToLabels(labels, weightData.labels, weightData.values),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.3)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
                label: "Reps",
                data: mapValuesToLabels(labels, repsData.labels, repsData.values),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.3)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
                label: "Sets",
                data: mapValuesToLabels(labels, setsData.labels, setsData.values),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.3)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
            labels: {
                color: "#aaa", 
                padding: 16,
                font: { size: 14 },
            },
            },
            tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "#222",
            titleColor: "#fff",
            bodyColor: "#ddd",
            borderColor: "#444",
            borderWidth: 1,
            },
            title: {
            display: true,
            text: title, 
            color: "#fff",
            position: "bottom",
            font: {
                size: 22,
                family: "inherit",
                weight: "bold"
            },
            padding: {
                top: 16,
                bottom: 8
            }
        }},
        scales: {
            x: {
            ticks: {
                color: "#aaa",
                font: { size: 12 },
            },
            grid: {
                color: "rgba(255,255,255,0.05)",
                borderColor: "#444",
            },
            },
            y: {
            ticks: {
                color: "#aaa",
                font: { size: 12 },
                callback: (value) => `${value}kg`,
            },
            grid: {
                color: "rgba(255,255,255,0.05)",
                borderColor: "#444",
            },
            },
        },
        };

    return (
        <div className="chart-page-main-container">
        <div className="progress-chart-container">
            <div className="toggle-button-group">
            <button
                className={`toggle-btn ${mode === "Lifts" ? "active" : ""}`}
                onClick={() => setMode("Lifts")}
            >
                Lifts
            </button>
            <button
                className={`toggle-btn ${mode === "Bodyweight" ? "active" : ""}`}
                onClick={() => setMode("Bodyweight")}
            >
                Bodyweight
            </button>
            </div>
            <Line data={data} options={options} />
            <Outlet />
        </div>
        </div>
    );
}

function BodyweightProgressChart({mode, setMode}){

    const { user } = useAuth();

    const extractData = (arr) => {
        if (!arr?.length) return { labels: [], values: [] };

        const sorted = arr.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        const labels = sorted.map(e => new Date(e.date).toLocaleDateString());
        const values = sorted.map(e => e.value);
        return { labels, values };
    };

    const weightData = extractData(user?.data?.bodyWeight);

    const allDatesSet = new Set([...weightData.labels]);
    const labels = Array.from(allDatesSet).sort((a, b) => new Date(a) - new Date(b));

    const mapValuesToLabels = (labels, dataLabels, dataValues) =>
        labels.map(label => {
            const index = dataLabels.indexOf(label);
            return index !== -1 ? dataValues[index] : null;
        });

    const data = {
        labels,
        datasets: [
            {
                label: "Weight",
                data: mapValuesToLabels(labels, weightData.labels, weightData.values),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.3)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
            labels: {
                color: "#aaa", // legend text
                padding: 16,
                font: { size: 14 },
            },
            },
            tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "#222",
            titleColor: "#fff",
            bodyColor: "#ddd",
            borderColor: "#444",
            borderWidth: 1,
            },
        },
        scales: {
            x: {
            ticks: {
                color: "#aaa",
                font: { size: 12 },
            },
            grid: {
                color: "rgba(255,255,255,0.05)",
                borderColor: "#444",
            },
            },
            y: {
            ticks: {
                color: "#aaa",
                font: { size: 12 },
                callback: (value) => `${value}kg`,
            },
            grid: {
                color: "rgba(255,255,255,0.05)",
                borderColor: "#444",
            },
            },
        },
        };

    return (
        <div className="chart-page-main-container">
        <div className="progress-chart-container">
            <div className="toggle-button-group">
            <button
                className={`toggle-btn ${mode === "Lifts" ? "active" : ""}`}
                onClick={() => setMode("Lifts")}
            >
                Lifts
            </button>
            <button
                className={`toggle-btn ${mode === "Bodyweight" ? "active" : ""}`}
                onClick={() => setMode("Bodyweight")}
            >
                Bodyweight
            </button>
            </div>
            <Line data={data} options={options} />
            <Outlet />
        </div>
        </div>
    );
}

export { ProgressChart }
