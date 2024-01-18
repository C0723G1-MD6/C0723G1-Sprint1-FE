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
import SidebarAdmin from "./components/anHN/SidebarAdmin";

import "react-toastify/dist/ReactToastify.min.css"
import DashboardSalesman from "./components/DashboardSalesman";
import Dashboard from "./pages/Dashboard";

import "react-toastify/dist/ReactToastify.css";
import {EditEmployee} from "./components/employee/EditEmployee";
import ChangePassword from "./components/changePassword/ChangePassword";
import ProductCreate from "./components/product/ProductCreate";
import ProductEdit from "./components/product/ProductEdit";


function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/home-admin" element={<HomeAdmin/>}/>
                <Route path="/home-employee" element={<HomeEmployee/>}/>
                <Route path="/sidebar" element={<SidebarAdmin/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/employee/:id" element={<EditEmployee/>}/>
                <Route path="/change_pass" element={<ChangePassword/>}/>
                <Route path="product/create" element={<ProductCreate/>}/>
                <Route path="product/edit/:id" element={<ProductEdit/>}/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>

    );
}

export default App;
