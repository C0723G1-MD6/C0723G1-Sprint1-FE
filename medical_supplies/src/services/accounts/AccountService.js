import axios from "axios";
import authHeader from "../auth/AuthService";

export const createAccount = async (accountDto) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/register`, accountDto);
        return res;
    } catch (e) {
        throw e.response;

    }
}
export const roleList = async () => {
    try {
        const res = await axios.get(`http://localhost:8080/api/role`);
        return res;
    } catch (e) {
        throw e.response;

    }
}
