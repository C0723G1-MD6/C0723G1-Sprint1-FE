import axios from "axios";
const URL_EMPLOYEE =`http://localhost:8080/api/employee`;
export const editEmployeeService = async (value) => {
    try {
        const res = await axios.patch(URL_EMPLOYEE + `/${value.id}`,value)
        return res;
    } catch (e) {
        alert("err edit employee")
    }
}

export const getEmployeeByIdService = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/${id}`)
        return res.data
    } catch (e) {
        alert("err get employee")
    }

}
export const getAllByEmployee = async (email) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/search/${email}`);
        console.log(res);
        return res;
    } catch (e) {
        throw e.response;

    }
}