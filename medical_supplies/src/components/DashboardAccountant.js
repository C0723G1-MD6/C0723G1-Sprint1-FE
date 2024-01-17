import React from 'react';
import HeaderEmployee from "./anHN/HeaderEmployee";
import SidebarEmployee from "./anHN/SidebarEmployee";
import Footer from "./anHN/Footer";
import SidebarAccountant from "./anHN/SidebarAccountant";
// Trang kế toán
function  DashboardAccountant() {
    return (
        <>
            <HeaderEmployee/>
            <div className="container-fluid wrapper">
                <SidebarAccountant/>
            </div>
            <Footer/>
        </>
    );
}

export default DashboardAccountant;