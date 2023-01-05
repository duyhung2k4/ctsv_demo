import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import ComponentResultsOfAnnouncement from "./ComponentResultsOfAnnouncement";
import ComponentGranduationInformation from "./ComponentGranduationInformation";

const ComponentEnrollmentInformation: React.FC = () => {

    return (
        <div className="sec__one col-md-12">
            <div className="col-md-12">
                <ul className="nav justify-content-center col-md-12">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/enrollment_information/granduation_information">Granduation Information</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/enrollment_information/results_of_announcement">Results Of Announcement</Link>
                    </li>
                </ul>
                <div style={{ marginTop: "40px" }}>
                    <Routes>
                        <Route path="/" element={<ComponentGranduationInformation />} />
                        <Route path="/granduation_information" element={<ComponentGranduationInformation />} />
                        <Route path="/results_of_announcement" element={<ComponentResultsOfAnnouncement />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default ComponentEnrollmentInformation;