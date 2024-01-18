import React from 'react';
import Footer from "./anHN/Footer";
import HeaderEmployee from "./anHN/HeaderEmployee";
import HomeEmployee from "./anHN/HomeEmployee";
import Sidebar from "./anHN/Sidebar";


function DashboardSalesman() {
    return (
        <>
            <HeaderEmployee/>
            <div className="container-fluid wrapper">
                <Sidebar/>
                <HomeEmployee/>
            </div>
            <Footer/>
        </>
    );
}

export default DashboardSalesman;