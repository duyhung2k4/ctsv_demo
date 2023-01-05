import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./components/login/AdminLogin";
import Home from "./components/home/Home";

const App: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/*" element={<Home/>} />
                <Route path="/login" element={<AdminLogin/>} />
            </Routes>
        </>
    )
}

export default App