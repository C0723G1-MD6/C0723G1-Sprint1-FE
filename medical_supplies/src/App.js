import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/auth/Login";
import Register from "./components/register/Register";
import {ToastContainer} from "react-toastify";
import HomeEmployee from "./components/anHN/HomeEmployee";
import Home from "./components/anHN/Home";
import HomeAdmin from "./components/anHN/HomeAdmin";
import Sidebar from "./components/anHN/Sidebar";
import "react-toastify/dist/ReactToastify.min.css"
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import {EditEmployee} from "./components/employee/EditEmployee";
import ChangePassword from "./components/changePassword/ChangePassword";
import ProductCreate from "./components/product/ProductCreate";
import ProductEdit from "./components/product/ProductEdit";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardAccountant from "./components/DashboardAccountant";
import DashboardSalesman from "./components/DashboardSalesman";
import {NotFound} from "./components/NotFound";
import ProductDetails from "./components/product/ProductDetail";



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
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard-admin" element={<DashboardAdmin/>}/>
                <Route path="/dashboard-accountant" element={<DashboardAccountant/>}/>
                <Route path="/dashboard-salesman" element={<DashboardSalesman/>}/>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/register"} element={<Register/>}></Route>
                <Route path="/employee" element={<EditEmployee/>}/>
                <Route path="/change_pass" element={<ChangePassword/>}/>
                <Route path="product/create" element={<ProductCreate/>}/>
                <Route path="product/edit/:id" element={<ProductEdit/>}/>
                <Route path="product/detail/:id" element={<ProductDetails/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>

    );
}

export default App;
