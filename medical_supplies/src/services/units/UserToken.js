export default function authToken(){
    const user = JSON.parse(localStorage.getItem(`user`));
    if (user!==null ){
        const jwtToken = user.accessToken;
        const [, payloadBase64] = jwtToken.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        console.log(payload);
        return payload;

    } else {
        return {};
    }
}