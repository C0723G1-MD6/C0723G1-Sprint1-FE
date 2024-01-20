import axios from "axios";
import {toast} from "react-toastify";
import authHeader from "../auth/AuthService";

export const createProduct= async (productDTO) =>{
  try {
      await axios.post(`http://localhost:8080/api/products/create`,productDTO,{headers:authHeader()});
      return true;
  }catch (e){
      return false;
  }
}

export async function editProduct(product){
    try {
        await axios.patch(`http://localhost:8080/api/products/update`,product,{headers:authHeader()});
        return true;
    }catch (e){
        return false;
    }
}

export const getProductById = async (id) => {
    try {
        const product = await axios.get(`http://localhost:8080/api/products/details/${id}`,{headers:authHeader()});
        return product.data;
    }catch (e){
        return false;
    }
}


export const getListTypeProduct = async () =>{
    try {
        const typeProduct = await axios.get(`http://localhost:8080/api/type_products/list`,{headers:authHeader()})
        return typeProduct.data
    }catch (e){
        return false;
    }
}

export const getListProduction = async () =>{
    try {
        const productions = await axios.get(`http://localhost:8080/api/productions/list`,{headers:authHeader()})
        return  productions.data
    }catch (e){
        return false;
    }
}

export const listProducts = async () => {
    try {
        const products = await axios.get('http://localhost:8080/api/products/list');
        return products.data
        console.log(products.data);
    }catch (e){
        return false;
    }
}

export function showMsgWarning(msg) {
    toast.warning(msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
    });
}

export function showMsg(msg) {
    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
    });
}