import {useEffect, useState} from "react";
import Header from "../anHN/Header";
import Sidebar from "../anHN/Sidebar";
import {getProductById} from "../../services/serviceProduct/ServiceProduct";
import {Link, useParams} from "react-router-dom";
import Footer from "../anHN/Footer";
import {NavLink} from "react-bootstrap";


export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const param = useParams();
    const user = JSON.parse(localStorage.getItem(`user`));

    const findByIdProduct = async () => {
        const data = await getProductById(param.id);
        await setProduct(data);
        console.log(data);
    }


    useEffect(() => {
        findByIdProduct();
        console.log(product);
    }, [product.id])

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <>
            {product.id && (
                <div className="container-fluid">
                    <div className="row col-md">
                        <Header/>
                    </div>
                    {
                        user ?
                            <div className="row col-md">
                                <div className="col-md-3">
                                    <Sidebar/>
                                </div>
                                <div className="col-md-9">
                                    <div className="row" style={{textAlign: "center"}}>
                                        <h1>Chi Tiết Thông Tin Sản Phẩm</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="">
                                                <img src={product.mainAvatar}
                                                     style={{padding: "10px"}} alt="img"
                                                     className="img-fluid mb-3 d-none d-md-block rounded-0"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mt-md-5">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Tên sản phẩm :</td>
                                                    <td>{product.name}</td>
                                                </tr>

                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Loại vật tư :</td>
                                                    <td>{product.typeProduct.nameTypeProduct}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Giá vật tư:</td>
                                                    <td> {VND.format(product.price)}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Số lượng vật tư :</td>
                                                    <td>{product.quantity}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Thành phần có trong vật tư :</td>
                                                    <td>{product.ingredient}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Nhà cung cấp vật tư :</td>
                                                    <td>{product.supplier}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Nới sản xuất vật tư :</td>
                                                    <td>{product.productions.nameProductions}</td>
                                                </tr>
                                            </div>
                                            <div className="row mt-5 " style={{textAlign: "center"}}>
                                                <div >
                                                    <div className="btn btn-primary"
                                                         style={{marginLeft: "-88%", marginRight: "0px",}}>
                                                        <Link to="/dashboard" style={{
                                                            color: "white"
                                                        }}>Quay lại</Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row col-md">

                                <div className="col-12">
                                    <div className="row" style={{textAlign: "center"}}>
                                        <h1>Chi Tiết Thông Tin Sản Phẩm</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="">
                                                <img src={product.mainAvatar}
                                                     style={{padding: "10px"}} alt="img"
                                                     className="img-fluid mb-3 d-none d-md-block rounded-0"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mt-md-5">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Tên sản phẩm :</td>
                                                    <td>{product.name}</td>
                                                </tr>

                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Loại vật tư :</td>
                                                    <td>{product.typeProduct.nameTypeProduct}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Giá vật tư:</td>
                                                    <td> {VND.format(product.price)}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Số lượng vật tư :</td>
                                                    <td>{product.quantity}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Thành phần có trong vật tư :</td>
                                                    <td>{product.ingredient}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Nhà cung cấp vật tư :</td>
                                                    <td>{product.supplier}</td>
                                                </tr>
                                            </div>
                                            <div className="mt-md-4">
                                                <tr>
                                                    <td style={{fontWeight: "bold"}}>Nới sản xuất vật tư :</td>
                                                    <td>{product.productions.nameProductions}</td>
                                                </tr>
                                            </div>
                                            <div className="row mt-5 " style={{textAlign: "center"}}>
                                                <div >
                                                    <div className="btn btn-primary"
                                                         style={{marginLeft: "-88%", marginRight: "0px",}}>
                                                        <Link to="/" style={{
                                                            color: "white"
                                                        }}>Quay lại</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                    <div>
                        <Footer/>
                    </div>
                </div>
            )}
        </>
    )


}