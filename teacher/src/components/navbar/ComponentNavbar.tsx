import React from "react";
import { Link } from "react-router-dom";

const ComponentNavbar: React.FC = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Teacher</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/study_score">Study Score</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/attendance">Attendance</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default ComponentNavbar;