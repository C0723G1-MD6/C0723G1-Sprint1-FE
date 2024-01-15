import axios from "axios";


export async function createProduct(product) {
  try {
      await axios.post(`http://localhost:8080/api/products/create`,product);
      return true;
  }catch (e){
      return false;
  }
}

export async function editProduct(product,id){
    try {
        await axios.patch(`http://localhost:8080/api/products/update${id}`,product);
        return true;
    }catch (e){
        return false;
    }
}

export async function getProductById(id){
    try {
        const product =await axios.get(`http://localhost:8080/api/products/details/${id}`);
        return product.data;
    }catch (e){
        return false;
    }
}