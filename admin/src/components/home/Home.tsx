import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { getCookie } from "typescript-cookie";
import ComponentGeneralInformation from "../genelralInformation/ComponentGeneralInformation";
import ComponentEnrollmentInformation from "../enrollmanrInformation/ComponentEnrollmantInformation";
import ComponentAccountTeacher from "../accountTeacher/ComponentAccountTeacher";
import ComponentCourse from "../course/ComponentCourse";

const Home: React.FC = () => {

    const navigate = useNavigate();

    const token: string | undefined = getCookie("accessToken");

    useEffect(() => {
        if(token === undefined) {
            navigate("/login");
        }
    }, [token])

    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/general_information/*" element={<ComponentGeneralInformation/>}/>
                <Route path="/enrollment_information/*" element={<ComponentEnrollmentInformation/>} />
                <Route path="/account_teacher" element={<ComponentAccountTeacher/>}/>
                <Route path="/course" element={<ComponentCourse/>}/>
            </Routes>
        </div>
    )
}

export default Home;