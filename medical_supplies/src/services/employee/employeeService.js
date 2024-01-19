import axios from "axios";
import authHeader from "../auth/AuthService";
const URL_EMPLOYEE =`http://localhost:8080/api/employee`;

export const editEmployeeService = async (value) => {
    try {
        const res = await axios.patch(URL_EMPLOYEE + `/${value.id}`,value,{headers:authHeader()})
        return res;
    } catch (e) {
        alert("err edit employee")
    }
}

// Lấy dữ liệu employee bằng email
export const getAllByEmployee = async (email) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/search/${email}`,{headers:authHeader()});
        console.log(res)
        return res;
    } catch (e) {
        throw e.response;

    }
}