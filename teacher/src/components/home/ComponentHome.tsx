import React, { useEffect } from "react";
import ComponentNavbar from "../navbar/ComponentNavbar";
import { getCookie } from "typescript-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import ComponentStudyScore from "../studyScore/ComponentStudyScore";
import ComponentAttendance from "../attendance/ComponentAttendance";

const ComponentHome: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken: string | undefined = getCookie("accessToken");

        if (accessToken === undefined) {
            navigate("/login");
        }

    }, [])

    return (
        <>
            <ComponentNavbar/>
            <Routes>
                <Route path="/study_score/*" element={<ComponentStudyScore/>}/>
                <Route path="/attendance/*" element={<ComponentAttendance/>}/>
            </Routes>   
        </>
    )
}

export default ComponentHome;