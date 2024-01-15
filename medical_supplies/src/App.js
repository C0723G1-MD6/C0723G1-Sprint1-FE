import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {EditEmployee} from "./components/employee/EditEmployee";
import Test from "./components/employee/Test";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/employee/:id" element={<EditEmployee/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;
