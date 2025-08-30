import '../../../styles/LeftDashBoard.css'

function LeftDashBoard() {

    return (
        <div className = "left-dash-board-container">
            <h2 className = "left-dash-board-heading">Tracker</h2>
            <span className = "left-dash-board-span"></span>
            <button className = "left-dash-board-home-button">Home</button>
            <button className = "left-dash-board-dash-board-button">DashBoard</button>
        </div>
    )
}

export { LeftDashBoard }