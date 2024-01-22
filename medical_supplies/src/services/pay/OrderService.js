import axios from "axios";
import authHeader from "../auth/AuthService";

export const saveOrder =async (order)=>{
    try {
        console.log(order);
        await axios.post("http://localhost:8080/api/orders/create",order);

        return true;
    } catch (e){
        return false;
    }
}