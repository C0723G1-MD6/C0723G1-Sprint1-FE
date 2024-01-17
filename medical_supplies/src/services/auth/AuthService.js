import axios from "axios";

export default function authHeader(){
    const user = JSON.parse(localStorage.getItem(`user`));

    if (user!==null ){
        const jwtToken = user.accessToken;
        const [, payloadBase64] = jwtToken.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        return payload;
        // return{
        //     "Authorization": 'Bearer ' + user.accessToken,
        //     "Content-Type": 'application/json'
        // }
    } else {
        return {};
    }
}


export const login = async (account)=>{
    try {
        const res = await axios.post("http://localhost:8080/api/login",account);
        return res;
    }catch (e) {
        throw e.response;
    }
}
