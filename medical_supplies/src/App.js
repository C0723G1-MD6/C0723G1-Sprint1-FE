
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/auth/Login";
import Register from "./components/register/Register";
import { ToastContainer } from "react-toastify";

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}></Route>
                    <Route path={"/register"} element={<Register/>}></Route>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>

    );
}

export default App;
