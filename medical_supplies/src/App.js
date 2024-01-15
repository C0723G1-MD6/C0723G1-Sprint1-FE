
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/auth/Login";
import Register from "./components/register/Register";
import { ToastContainer } from "react-toastify";
import ProductCreate from "./components/product/ProductCreate";


function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}></Route>
                    <Route path={"/register"} element={<Register/>}></Route>
                  <Route path="product/create" element={<ProductCreate/>}/>

                </Routes>
                <ToastContainer/>
            </BrowserRouter>

    );
}

export default App;
