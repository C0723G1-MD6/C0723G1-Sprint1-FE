import axios from "axios";

export const getAllProduct= async (nameSearch) => {
    try {
        let rs = await axios.get("http://localhost:8080/api/products/list"+`?name_like=${nameSearch}`)
        return rs.data.content
    }catch (e){
        return undefined
    }
}