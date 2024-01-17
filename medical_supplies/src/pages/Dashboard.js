// import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
// import {getInfoByIdAccount} from "../redux/middlewares/EmployeeMiddleware";
// import DashboardSale from "../components/DashboardSale";
// import DashboardWarehouse from "../components/DashboardWarehouse";
// import DashboardManager from "../components/DashboardManager";
// import AccessDenied from "../components/auth/AccessDenied";


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
