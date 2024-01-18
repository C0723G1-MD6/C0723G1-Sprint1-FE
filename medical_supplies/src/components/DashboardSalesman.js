import React from 'react';
import Footer from "./anHN/Footer";
import HeaderEmployee from "./anHN/HeaderEmployee";
import SidebarEmployee from "./anHN/SidebarEmployee";
import HomeEmployee from "./anHN/HomeEmployee";


function DashboardSalesman() {
    return (
        <>
            <HeaderEmployee/>
            <div className="container-fluid wrapper">
                <SidebarEmployee/>
                <HomeEmployee/>
            </div>
            <Footer/>
        </>
    );
}

export default DashboardSalesman;