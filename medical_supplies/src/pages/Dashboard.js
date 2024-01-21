// import React, {useEffect} from 'react';
import React, {useEffect,useState} from "react";
import authToken from "../services/units/UserToken";
import * as employeeService from "../services/employee/employeeService";
import Home from "../components/anHN/Home";
import DashboardAdmin from "../components/DashboardAdmin";
import DashboardAccountant from "../components/DashboardAccountant";
import DashboardSalesman from "../components/DashboardSalesman";



function Dashboard() {
    const [employee, setEmployee] = useState({});
    const role = authToken().roles[0].authority;
    const email = authToken().sub;
    useEffect(() => {
        if (email.length>0) {
            getInfoEmployee();
        }
    }, []);


    const getInfoEmployee = async () => {
        try {
            const res = await employeeService.getAllByEmployee(email);
            setEmployee(res.data);
        } catch (e) {
            console.log(e);
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
