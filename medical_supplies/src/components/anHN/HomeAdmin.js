import Header from "./Header";
import Footer from "./Footer";
import * as method from "../../services/anHN/ProductService"
import React from "react";
import {useState, useEffect} from "react";
import "./AnHN.css";
import { toast } from "react-toastify";
import {Link, NavLink} from "react-router-dom";
import Sidebar from "./Sidebar";
import img_1 from "../img/img_1.png";
import ModalLogout from "../auth/ModalLogout";



function HomeAdmin(){


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

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });




    return (
        <div>
            <div className="container-fluid">
                <header>
                    <div className="row row-header-1">
                        <div className="col-12 col-lg-1">

                        </div>
                        <div className="col-12 col-lg-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            </svg>
                            (+84)923456789
                            <hr style={{height:"2px",borderWidth:0,color:"gray",backgroundColor:"black"}}/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                            </svg>
                            info@C0723G1codegym.vn
                            <hr style={{height:"2px",borderWidth:0,color:"gray",backgroundColor:"black"}}/>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username with two button addons"/>
                                <button className="btn btn-outline-secondary" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-1">

                        </div>
                    </div>

                    <div className="row row-header-2">
                        <div className="col-12 col-lg-1">

                        </div>
                        <div className="col-12 col-lg-2">
                            <img className="logo-header" src={img_1}/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <p className="text-header">CÙNG TẠO CƠ HỘI THÀNH CÔNG - HƯỚNG TỚI SỨC KHỎE CỘNG ĐỒNG</p>
                            <p className="text-header">XÂY DỰNG CUỘC SỐNG TƯƠI ĐẸP</p>
                        </div>
                        <div className="button-header col-12 col-lg-2" >

                        </div>
                        <div className="col-12 col-lg-1">

                        </div>
                    </div>
                </header>
                <nav>
                    <div className="px-3 py--1 bg-success text-white">
                        <div className="align-items-center justify-content-center justify-content-lg-start">
                            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                <li>
                                    <Link to="/" className="nav-link text-white">
                                        <svg className="bi d-block mx-auto mb-1" width="5" height="7">
                                            <use xlinkHref="#home"></use>
                                        </svg>
                                        TRANG CHỦ
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        <svg className="bi d-block mx-auto mb-1" width="5" height="7">
                                            <use xlinkHref="#speedometer2"></use>
                                        </svg>
                                        GIỚI THIỆU
                                    </a>
                                </li>
                                <li>
                                    <div className="nav-link text-white">
                                        <svg className="bi d-block mx-auto mb-1" width="5" height="0">
                                            <use xlinkHref="#speedometer2"></use>
                                        </svg>
                                        <div className="dropdown">
                                            <button className="btn btn-success dropdown-toggle" type="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                SẢN PHẨM
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Sản phẩm 1</a></li>
                                                <li><a className="dropdown-item" href="#">Sản phẩm 2</a></li>
                                                <li><a className="dropdown-item" href="#">Sản phẩm 3</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        <svg className="bi d-block mx-auto mb-1" width="5" height="7">
                                            <use xlinkHref="#speedometer2"></use>
                                        </svg>
                                        CHỨNG CHỈ CHẤT LƯỢNG
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        <svg className="bi d-block mx-auto mb-1" width="5" height="7">
                                            <use xlinkHref="#speedometer2"></use>
                                        </svg>
                                        HOẠT ĐỘNG CÔNG TY
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        <svg className="bi d-block mx-auto mb-1" width="5" height="7">
                                            <use xlinkHref="#speedometer2"></use>
                                        </svg>
                                        ĐỐI TÁC
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link text-white">
                                        <svg className="bi d-block mx-auto mb-1" width="5" height="7">
                                            <use xlinkHref="#speedometer2"></use>
                                        </svg>
                                        LIÊN HỆ
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                </nav>

            </div>

            <div className="container-fluid wrapper">

                <aside id="sidebar">
                    <div className="h-100">
                        <div className="sidebar-logo">
                            <div className="user-img">
                                <img style={{height: "4rem",width: "4rem",borderRadius: "50%"}}
                                     src="https://a0.anyrgb.com/pngimg/16/486/user-profile-user-experience-user-interface-design-avatar-user-interface-ico-person-user-man-computer-software-thumbnail.png"
                                     alt=""/>
                            </div>
                            <div className="user-detail">
                                <div className="title">Quản Lý</div>
                                <div className="name">Nguyễn Văn A</div>

                            </div>
                        </div>
                        <ul className="sidebar-nav">
                            <li className="sidebar-header text-dark">
                                Vật Tư
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link text-dark">
                                    <i className="fa-solid fa-list pe-2"></i>
                                    Thêm Vật Tư
                                </a>
                            </li>
                            <li className="sidebar-header text-dark">
                                Chức Năng
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link collapsed text-dark" data-bs-toggle="collapse"
                                   data-bs-target="#pages"
                                   aria-expanded="false" aria-controls="pages">
                                    <i className="fa-regular fa-file-lines pe-2"></i>
                                    Thông Tin
                                </a>
                                <ul id="pages" className="sidebar-dropdown list-unstyled collapse"
                                    data-bs-parent="#sidebar">
                                    <li className="sidebar-item ">
                                        <NavLink to="/employee/:id" className="sidebar-link text-dark">Chỉnh
                                            Sửa Thông Tin</NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink to="/change_pass" className="sidebar-link text-dark">Đổi
                                            Mật Khẩu</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/register" className="sidebar-link text-dark">
                                    <i className="fa-solid fa-list pe-2"></i>
                                    Đăng Kí Nhân Viên
                                </NavLink>
                            </li>
                            <li className="sidebar-item" style={{paddingTop: "80%",paddingLeft: "12%"}}>
                                <a href="#" className="sidebar-link text-dark">
                                    <i className="fa-solid fa-list pe-2"></i>
                                    <button className="btn btn-outline-secondary">Đăng Xuất</button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="main">
                    <nav className="navbar navbar-expand px-3 border-bottom">
                        <button className="btn btn-sm" type="button" data-bs-theme="dark">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </nav>
                    <main className="content px-3 py-2">
                        <div className="container">
                                <h2 style={{textAlign:"center"}}>DANH SÁCH VẬT TƯ</h2>
                                <div className="row row-1-home">
                                    {product.map(item =>
                                        <div key={item.id} className="col-12 col-lg-4">
                                            <div className="card" style={{width:"400px"}}>
                                                <div className="card-body">
                                                    <img className="card-img-top" src={item.mainAvatar} alt="Card image" height="280"
                                                         width="250"/>
                                                    <h5 className="card-text">{item.name}</h5>
                                                    <p className="card-text">Giá: {VND.format(item.price)}</p>
                                                    <a href="#" className="btn btn-primary">Xem chi tiết</a>
                                                    <a href="#" className="btn btn-danger" style={{marginLeft:"15px"}}>Chỉnh sửa</a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    )

}

export default HomeAdmin;