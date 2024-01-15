import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {EditEmployee} from "./components/employee/EditEmployee";


function App() {
    return (
        <>
<BrowserRouter>
    <Routes>
        <Route path="/employee/:id" element={<EditEmployee/>}/>
    </Routes>
</BrowserRouter>
        </>
    );
}

export default App;
