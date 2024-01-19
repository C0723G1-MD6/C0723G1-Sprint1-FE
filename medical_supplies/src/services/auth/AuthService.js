import axios from "axios";

export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return {
            "Authorization": 'Bearer ' + user.accessToken,
            "Content-Type": 'application/json'
        };
    } else {
        return undefined;
    }
}

export const login = async (account)=>{
    try {
        const res = await axios.post("http://localhost:8080/api/login",account);
        return res;
    }catch (e) {
        console.log(e)
        throw e.response;
    }
}
