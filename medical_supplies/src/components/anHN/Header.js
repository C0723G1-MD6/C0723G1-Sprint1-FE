import logo from "../img/logo.png";
import "./AnHN.css";
import {Link} from "react-router-dom";


function Header () {
    return (
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
                        Cung câp thiết bị vật tư y tế
                        <hr style={{height:"2px",borderWidth:0,color:"gray",backgroundColor:"black"}}/>
                    </div>
                    <div className="col-12 col-lg-1">

                    </div>
                </div>

                <div className="row row-header-2">
                    <div className="col-12 col-lg-1">

                    </div>
                    <div className="col-12 col-lg-2">
                        <img className="logo-header" src={logo}/>
                    </div>
                    <div className="col-12 col-lg-6">
                        <p className="text-header">CÙNG TẠO CƠ HỘI THÀNH CÔNG - HƯỚNG TỚI SỨC KHỎE CỘNG ĐỒNG</p>
                        <p className="text-header">XÂY DỰNG CUỘC SỐNG TƯƠI ĐẸP</p>
                    </div>
                    <div className="button-header col-12 col-lg-2" >
                        <button type="button" className="btn btn-success">
                            <Link to="/login" style={{color: "white", textDecoration: "none"}}>
                                ĐĂNG NHẬP
                            </Link>
                        </button>
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
                                <a href="#" className="nav-link text-white">
                                    <svg className="bi d-block mx-auto mb-1" width="5" height="7">
                                        <use xlinkHref="#speedometer2"></use>
                                    </svg>
                                    SẢN PHẨM
                                </a>
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
    )
}

export default Header