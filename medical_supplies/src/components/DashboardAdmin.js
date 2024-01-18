import React from 'react';
import Sidebar from "./anHN/Sidebar";
import HeaderAdmin from "./anHN/HeaderAdmin";
import Footer from "./anHN/Footer";
import HomeAdmin from "./anHN/HomeAdmin";

// Trang Admin
function DashboardAdmin() {
    return (
        <>
            <HeaderAdmin/>
            <div className="container-fluid wrapper">
            <Sidebar/>
            <HomeAdmin/>
            </div>
            <Footer/>
        </>
    );
}

export default DashboardAdmin;