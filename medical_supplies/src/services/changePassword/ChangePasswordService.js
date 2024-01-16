import axios from "axios";

export const changePassword = async (account) => {
    try {
        const res = await axios.patch("http://localhost:8080/api/changePassword", account)
        return res.data;
    } catch (e) {
        throw e.response;
    }
}