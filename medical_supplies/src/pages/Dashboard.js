import React, {useEffect, useState} from "react";
import authToken from "../services/auth/AuthService";
import * as accountService from "../services/accounts/AccountService";
import DashboardAdmin from "../components/DashboardAdmin";
import DashboardAccountant from "../components/DashboardAccountant";
import DashboardSalesman from "../components/DashboardSalesman";
import Home from "../components/anHN/Home";
import HomeAdmin from "../components/anHN/HomeAdmin";


function Dashboard() {
    const role = authToken().roles[0].authority;
    const email = authToken().sub;
    const renderDashboardContent = () => {
        if (!email) {
            return <Home/>;
        } else if (role.includes("ROLE_ADMIN")) {
            return <HomeAdmin />;
        } else if (role.includes("ROLE_ACCOUNTANT")) {
            return <HomeAdmin />;
        } else if (role.includes("ROLE_SALESMAN")) {
            return <HomeAdmin />;
        }
    };

    return <>
        <div>
            {renderDashboardContent()}

        </div>
    </>;
}

export default Dashboard;
