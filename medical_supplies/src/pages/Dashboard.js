import {useEffect, useState} from "react";
import authHeader from "../services/auth/AuthService";
import * as employeeService from "../services/employee/employeeService";
import Home from "../components/anHN/Home";
import HomeAdmin from "../components/anHN/HomeAdmin";

function Dashboard() {
    const [employee, setEmployee] = useState({});
    const role = authHeader().roles[0].authority;
    const email = authHeader().sub;
    useEffect(() => {
        if (email.length>0) {
            getInfoEmployee();
        }
    }, []);


    const getInfoEmployee = async () => {
        try {
            const res = await employeeService.getAllByEmployee(email);
            setEmployee(res.data);
            console.log(res)
        } catch (e) {
            throw e.response;
        }
    };

    const renderDashboardContent = () => {
        if (!email) {
            return <Home/>;
        } else if (role.includes("ROLE_ADMIN")) {
            return <HomeAdmin employee={employee}/>;
        } else if (role.includes("ROLE_ACCOUNTANT")) {
            return <HomeAdmin employee={employee}/>;
        } else if (role.includes("ROLE_SALESMAN")) {
            return <HomeAdmin employee={employee}/>;
        }
    };

    return <>
        <div>
            {renderDashboardContent()}
        </div>
    </>;
}

export default Dashboard;
