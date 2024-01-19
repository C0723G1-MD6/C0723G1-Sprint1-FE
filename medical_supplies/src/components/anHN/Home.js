import Footer from "./Footer";
import Header from "./Header";
import * as method from "../../services/anHN/ProductService"
import React, {useEffect, useState} from "react";
import "./AnHN.css";
import ReactPaginate from 'react-paginate';
import home from "../img/home.png"
import home1 from "../img/home1.png"
import {useNavigate} from "react-router-dom";
import authToken from "../../services/units/UserToken";

function Home() {

    const navigate = useNavigate();


    const [nameSearch, setNameSearch] = useState([])

    const [product, setProduct] = useState([]);


    const [totalPages, setTotalPages] = useState(0);



    useEffect(() => {
        getAll(0,nameSearch);
        getAllProduct()
    }, [nameSearch]);

    const getAll = async (page,nameSearch) => {
        try {
            let data = await method.getAllProduct(page,nameSearch);
            setProduct(data);
        }catch (e) {
            navigate("/Error");
        }
    }

    const getAllProduct = async () => {
        try {
            let data = await method.getAllProductPage();
            setTotalPages(data.totalPages)
        } catch (e) {
            navigate("/Error");
        }
    }


    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handlePageClick = (event) => {
        getAll(event.selected, nameSearch)
    }

    if (authToken()){
        return navigate("/dashboard");
    }
    return (
        <>
            <div>
                <Header/>
                <div className="container-fluid">
                    <div id="carouselExample" className="carousel slide" style={{paddingBottom:"30px"}} >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={home} className="d-block w-100" alt="..." width="1000" height="500" />
                            </div>
                            <div className="carousel-item">
                                <img src={home1} className="d-block w-100" alt="..." width="1000" height="500" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="row container row-home">
                    <h2>DANH SÁCH VẬT TƯ</h2>
                    <div className="input-group ">
                        <input type="text" className="form-control " placeholder="Tìm kiếm theo tên sản phẩm" style={{marginLeft:"450px", marginRight:"450px"}}
                               aria-label="Recipient's username with two button addons"
                               onChange={event => setNameSearch(event.target.value)}/>
                    </div>
                    <div className="row row-1-home">
                        {product ?(
                            product.map(item =>
                                    <div key={item.id} className="col-12 col-lg-4">
                                        <div className="card" style={{width: "400px"}}>
                                            <img className="card-img-top" src={item.mainAvatar} alt="Card image" height="280"
                                                 width="250"/>
                                            <div className="card-body">
                                                <h5 className="card-text">{item.name}</h5>
                                                <p className="card-text">Giá: {VND.format(item.price)}
                                                </p>
                                                <a href="#" className="btn btn-primary">Xem chi tiết</a>
                                                <a href="#" className="btn btn-danger" style={{marginLeft:"15px"}}>Đặt hàng</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                        ):(
                            <h5>Không có dữ liệu</h5>
                        )}
                    </div>
                    <div className="page">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Sau>"
                            onPageChange={handlePageClick}
                            pageCount={totalPages}
                            previousLabel="<Trước"

                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </div>

                    </div>
                <Footer/>
            </div>
        </>
    )
}

export default Home;