import axios from "axios";
import authHeader from "../auth/AuthService";

export const createAccount = async (value) => {
    try {
        await axios.post(`http://localhost:8080/api/register`, value);
        return true;
    } catch (e) {
        return false;
    }
}
export const roleList = async () => {
    try {
        const res =await axios.get(`http://localhost:8080/api/role`);
        return res;
    } catch (e) {
        return false;
    }
}