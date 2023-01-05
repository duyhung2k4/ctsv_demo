import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ComponentAccountStudent from "./ComponentAccountStudent";
import ComponentStudentBaseInfo from "./ComponentStudentBaseInfo";
import ComponentOverview from "./ComponentOverview";
import ComponentContact from "./ComponentContact";
import ComponentAddress from "./ComponentAddress";
import ComponentBank from "./ComponentBank";

const ComponentGeneralInformation: React.FC = () => {

    return (
        <div className="sec__one col-md-12">
            <div className="col-md-12">
                <ul className="nav justify-content-center col-md-12">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/general_information/account_student">Account Student</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/general_information/student_base_info">Student Base Info</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/general_information/overview">Overview</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/general_information/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/general_information/address">Address</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/general_information/bank">Bank</Link>
                    </li>
                </ul>
                <div style={{ marginTop: "40px" }}>
                    <Routes>
                        <Route path="/" element={<ComponentAccountStudent/>}/>
                        <Route path="/account_student" element={<ComponentAccountStudent/>}/>
                        <Route path="/student_base_info" element={<ComponentStudentBaseInfo/>}/>
                        <Route path="/overview" element={<ComponentOverview/>}/>
                        <Route path="/contact" element={<ComponentContact/>}/>
                        <Route path="/address" element={<ComponentAddress/>}/>
                        <Route path="/bank" element={<ComponentBank/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default ComponentGeneralInformation;