import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">CTSV</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/general_information">Genelral Information</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/enrollment_information">Enrollment Information</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/account_teacher">Account Teacher</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/course">Course</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar