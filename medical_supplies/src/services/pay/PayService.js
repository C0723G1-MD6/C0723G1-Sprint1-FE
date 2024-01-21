import axios from "axios";
import authHeader from "../auth/AuthService";


export const pay = async (price) => {
    try {
        let res =await axios.get(`http://localhost:8080/api/pay?price=${price}`,{ headers: authHeader() });
        return res.data;
    } catch (e) {
        return undefined;
    }
}