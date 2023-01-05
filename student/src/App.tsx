import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import CompnentLogin from "./components/login/ComponentLogin";
import ComponentHome from "./components/home/ComponentHome";

const App: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/login" element={<CompnentLogin/>}/>
                <Route path="/*" element={<ComponentHome/>}/>
            </Routes>
        </>
    )
}

export default App;