import '../../../styles/LeftDashBoard.css'
import axios from 'axios'
import { useAuth } from '../../wrappers/AuthProvider'
import { useNavigate, useLocation } from "react-router-dom"
function LeftDashBoard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className = "left-dash-board-container">
            <h2 className = "left-dash-board-heading">Tracker</h2>
            <span className = "left-dash-board-span"></span>
            <button className = "left-dash-board-home-button" onClick = { () => navigate("/home")}>Home</button>
            <button className = "left-dash-board-dash-board-button">DashBoard</button>
            <button className="left-dash-board-dash-board-button"
            onClick={() => {
                if (location.pathname !== '/home/progress-charts') {
                    navigate('/home/progress-charts', { replace: true });
                }
            }}
            >Progress Charts</button>
            <button className = "left-dash-board-dash-board-button" onClick = { () => logout()}>Logout</button>
        </div>
    )
}

export { LeftDashBoard }