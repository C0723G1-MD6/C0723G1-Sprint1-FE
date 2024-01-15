import logo from './logo.svg';
import './App.css';
import Header from "./components/anHN/Header";
import Footer from "./components/anHN/Footer";
import Home from "./components/anHN/Home";
import HomeAdmin from "./components/anHN/HomeAdmin";
import Sidebar from "./components/anHN/Sidebar";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import HomeEmployee from "./components/anHN/HomeEmployee";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home-admin" element={<HomeAdmin/>} />
            <Route path="/home-employee" element={<HomeEmployee/>} />
            <Route path="/sidebar" element={<Sidebar/>} />
        </Routes>
        <ToastContainer/>
    </div>
  );
}

export default App;
