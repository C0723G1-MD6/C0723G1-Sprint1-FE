import axios from "axios";
import authHeader from "../auth/AuthService";

export const getByCustomer = async (email) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/customer/search/${email}`,{headers:authHeader()});
        return res;
    } catch (e) {
        throw e.response;

    }
}