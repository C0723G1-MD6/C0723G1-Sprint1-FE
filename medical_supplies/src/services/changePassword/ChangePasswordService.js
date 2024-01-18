import axios from "axios";
import {authHeader} from "../auth/AuthService";

export const changePassword = async (account) => {
    try {
        const res = await axios.patch(`http://localhost:8080/api/changePassword`, account)
        return res;
    } catch (e) {
        throw e.response;
    }
}