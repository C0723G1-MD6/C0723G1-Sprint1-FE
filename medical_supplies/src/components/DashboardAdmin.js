import React from 'react';
import SidebarAdmin from "./anHN/SidebarAdmin";
// import HeaderAdmin from "./anHN/HeaderAdmin";
import Footer from "./anHN/Footer";
import HomeAdmin from "./anHN/HomeAdmin";

// Trang Admin
function DashboardAdmin() {
    return (
        <>
            {/*<HeaderAdmin/>*/}
            <div className="container-fluid wrapper">
            <SidebarAdmin/>
            <HomeAdmin/>
            </div>
            <Footer/>
        </>
    );
}

export default DashboardAdmin;