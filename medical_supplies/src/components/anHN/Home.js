import Header from "./Header";
import Footer from "./Footer";
import * as method from "../../services/anHN/method"
import React from "react";
import {useState, useEffect} from "react";
import "./AnHN.css";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";

function Home(){


    const [product, setProduct] = useState([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            let data = await method.getAllProduct();
            setProduct(data);
        } catch (e) {
            console.log("error")
        }
    }

    return (
        <div>
            <Header/>
            <div className="row row-home">
                <h2>DANH SÁCH VẬT TƯ</h2>
                <div className="row row-1-home">
                    {product.map(item =>
                        <div key={item.id} className="col-12 col-lg-4">
                            <div className="card" style={{width:"400px"}}>
                                <div className="card-body">
                                    <h5 className="card-text">{item.name}</h5>
                                    <p className="card-text">{item.price}</p>
                                    <a href="#" className="btn btn-primary">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )

}

export default Home;