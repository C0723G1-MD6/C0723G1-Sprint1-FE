import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/auth/Login";
import Register from "./components/register/Register";
import {ToastContainer} from "react-toastify";
import HomeEmployee from "./components/anHN/HomeEmployee";
import Header from "./components/anHN/Header";
import Footer from "./components/anHN/Footer";
import Home from "./components/anHN/Home";
import HomeAdmin from "./components/anHN/HomeAdmin";
import Sidebar from "./components/anHN/Sidebar";
import "react-toastify/dist/ReactToastify.min.css"

function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/" element={<Home/>}/>
                <Route path="/home-admin" element={<HomeAdmin/>}/>
                <Route path="/home-employee" element={<HomeEmployee/>}/>
                <Route path="/sidebar" element={<Sidebar/>}/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>

    );
}

export default App;
