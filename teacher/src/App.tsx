import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ComponentLogin from "./components/login/ComponentLogin";
import ComponentHome from "./components/home/ComponentHome";

const App: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/login" element={<ComponentLogin/>}/>
                <Route path="/*" element={<ComponentHome/>}/>
            </Routes>
        </>
    )
}

export default App;