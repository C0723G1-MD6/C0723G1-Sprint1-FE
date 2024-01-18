import React from 'react';
import HeaderEmployee from "./anHN/HeaderEmployee";
import Footer from "./anHN/Footer";
import Sidebar from "./anHN/Sidebar";
// Trang kế toán
function  DashboardAccountant() {
    return (
        <>
            <HeaderEmployee/>
            <div className="container-fluid wrapper">
                <Sidebar/>
            </div>
            <Footer/>
        </>
    );
}

export default DashboardAccountant;