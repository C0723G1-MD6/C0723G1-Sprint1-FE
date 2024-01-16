
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/auth/Login";
import Register from "./components/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {EditEmployee} from "./components/employee/EditEmployee";
import ChangePassword from "./components/changePassword/ChangePassword";


function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}></Route>
                    <Route path={"/register"} element={<Register/>}></Route>
                    <Route path="/employee/:id" element={<EditEmployee/>}/>
                    <Route path="/change_pass" element={<ChangePassword/>}/>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>

    );
}

export default App;
