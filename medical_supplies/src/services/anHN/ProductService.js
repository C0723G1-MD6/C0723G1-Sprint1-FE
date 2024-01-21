import axios from "axios";

export const getAllProduct = async (page, nameSearch) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/products/list?page=${page}&nameProduct=${nameSearch}`)
        return rs.data;
    }catch (e){
        return undefined
    }
}
export const getAllProductPage= async () => {
    try {
        let rs = await axios.get("http://localhost:8080/api/products/list")
        return rs.data
    }catch (e){
        return undefined
    }
}