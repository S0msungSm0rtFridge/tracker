import { useState, useEffect } from "react";
import '../../styles/AddBodyWeightEntry.css'
import axios from "axios";
import { useAuth } from "../wrappers/AuthProvider";

function BodyWeightTable(){
    const [state, setState] = useState("Add");

    const renderTable = () => {
        if (state === "Add") return <AddBodyWeightTable />;
        if (state === "Edit") return <EditBodyWeightTable />;
        if (state === "Delete") return <DeleteBodyWeightTable />;
        return null;
    };

    return (
        <div className = "right-side-table-container">
            {renderTable()}
            <button className = "right-side-table-button" onClick = {() => setState("Add")}>Add</button>
            <button className = "right-side-table-button" onClick = {() => setState("Edit")}>Edit</button>
            <button className = "right-side-table-button" onClick = {() => setState("Delete")}>Delete</button>

        </div>
    )
}
function AddBodyWeightTable({}) {
    const {user, refreshUser} = useAuth();
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]); // YYYY-MM-DD
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");

    const existing = user?.data?.bodyWeight;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!weight || weight <= 0) {
            alert("Please enter a valid weight.");  
            return;
        }

        const existingEntry = existing?.find(entry => entry.date.slice(0, 10) === date);


        try {
            if(existingEntry){
                await axios.put(
                    "http://localhost:5000/api/users/bodyweight/edit", 
                    {
                        date,
                        bodyWeight: parseFloat(weight),
                        note: notes
                    },
                    { withCredentials: true }
                );
            }else{
                await axios.put("http://localhost:5000/api/users/bodyweight",  
                    {
                        bodyWeight: weight,
                        date: date,    
                        note: notes
                    }, 
                    { withCredentials: true });
            }
            refreshUser();
        } catch (err){
            console.log(err);
        }

        setWeight("");
        setNotes("");
        setDate(new Date());

        
    };

    return (
        <div className="add-bodyweight-container">
            <h2>Add Bodyweight Entry</h2>
            <form onSubmit={handleSubmit} className="add-bodyweight-form">
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Weight (kg):
                    <input
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Notes:
                    <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional"
                    />
                </label>

                <button type="submit">Save</button>
            </form>
        </div>
    );
}

function EditBodyWeightTable() {
    const {user, refreshUser} = useAuth();

    const [selectedDate, setSelectedDate] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");

    const existing = user?.data?.bodyWeight;

    useEffect(() => {
        if (!selectedDate) {
            setWeight("");
            setNotes("");
            return;
        }
        const entry = existing.find(e => e.date.startsWith(selectedDate));
        if (entry) {
            setWeight(entry.value.toString());
            setNotes(entry.note || "");
        }
    }, [selectedDate, existing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!weight || weight <= 0) {
            alert("Please enter a valid weight.");
            return;
        }
        try {
            const response = await axios.put(
                "http://localhost:5000/api/users/bodyweight/edit",
                {
                    date: selectedDate,
                    bodyWeight: parseFloat(weight),
                    note: notes,
                },
                { withCredentials: true }
            );
            refreshUser();
        } catch (error) {
            console.error(error);
            alert("Failed to update bodyweight.");
        }
    };

    return (
        <div className="add-bodyweight-container">
            <h2>Edit Bodyweight Entry</h2>
            <form onSubmit={handleSubmit} className="add-bodyweight-form">
                <label>
                    Select Date:
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select a date
                        </option>
                        {existing.map((entry) => (
                            <option key={entry.date} value={entry.date.slice(0, 10)}>
                                {entry.date.slice(0, 10)}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Weight (kg):
                    <input
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Notes:
                    <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional"
                    />
                </label>
                <button type="submit" disabled={!selectedDate}>
                    Update
                </button>
            </form>
        </div>
    );
}

function DeleteBodyWeightTable() {
    const {user, refreshUser} = useAuth();
    const [selectedDate, setSelectedDate] = useState("");

    const existing = user?.data?.bodyWeight;


    const handleDelete = async () => {
        if (!selectedDate) return;
        if (
            !window.confirm(
                `Are you sure you want to delete the bodyweight entry for ${selectedDate}?`
            )
        )
            return;

        try {
            const response = await axios.put(
                "http://localhost:5000/api/users/removeBodyWeight",
                {
                 date: selectedDate
                },
                {withCredentials: true}
            );
            
            refreshUser();
            setSelectedDate("");
        } catch (error) {
            console.error(error);
            alert("Failed to delete bodyweight entry.");
        }
    };

    return (
        <div className="add-bodyweight-container">
            <h2>Delete Bodyweight Entry</h2>
            <label>
                Select Date:
                <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select a date
                    </option>
                    {existing.map((entry) => (
                        <option key={entry.date} value={entry.date.slice(0, 10)}>
                            {entry.date.slice(0, 10)}
                        </option>
                    ))}
                </select>
            </label>
            <button onClick={handleDelete} disabled={!selectedDate}>
                Delete
            </button>
        </div>
    );
}

export { BodyWeightTable };
