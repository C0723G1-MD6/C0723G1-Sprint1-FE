// import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect,useState} from "react";
import authHeader from "../services/auth/AuthService";
import * as accountService from "../services/accounts/AccountService";
import Home from "../components/anHN/Home";
import DashboardAdmin from "../components/DashboardAdmin";
import DashboardAccountant from "../components/DashboardAccountant";
import DashboardSalesman from "../components/DashboardSalesman";



function Dashboard() {
    const [employee, setEmployee] = useState({});
    const role = authHeader().roles[0].authority;
    const email = authHeader().sub;
    useEffect(() => {
        if (email.length>0) {
            getInfoEmployee();
        }
    }, []);

    console.log(role);
    console.log(email);
    const getInfoEmployee = async () => {
        try {
            const res = await accountService.getAllByEmployee(email);
            setEmployee(res.data);

        } catch (e) {
            throw e.response;
        }
    };
    const renderDashboardContent = () => {
        if (!email) {
            return <Home/>;
        } else if (role.includes("ROLE_ADMIN")) {
            return <DashboardAdmin employee={employee}/>;
        } else if (role.includes("ROLE_ACCOUNTANT")) {
            return <DashboardAccountant employee={employee}/>;
        } else if (role.includes("ROLE_SALESMAN")) {
            return <DashboardSalesman employee={employee}/>;
        }
    };

    return <>
        <div>
            {renderDashboardContent()}
        </div>
    </>;
}

export default Dashboard;
