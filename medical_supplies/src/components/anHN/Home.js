import Footer from "./Footer";
import Header from "./Header";
import * as method from "../../services/anHN/ProductService"
import React, {useEffect, useState} from "react";
import "./AnHN.css";
import ReactPaginate from 'react-paginate';
import home from "../img/home.png"
import home1 from "../img/home1.png"
import {NavLink, useNavigate} from "react-router-dom";

import authToken from "../../services/units/UserToken";

function Home() {

    const navigate = useNavigate();


    const [nameSearch, setNameSearch] = useState([])

    const [product, setProduct] = useState([]);


    const [totalPages, setTotalPages] = useState(0);



    useEffect(() => {
        getAll(0,nameSearch);
        getAllProductPage()
    }, []);

    const getAll = async (page,nameSearch) => {
        try {
            let data = await method.getAllProduct(page,nameSearch);
            setProduct(data.content);
        }catch (e) {
            navigate("/Error");
        }
    }

    const getAllProductPage = async (page,nameSearch) => {
        try {
            let data = await method.getAllProductPage(page,nameSearch);
            setTotalPages(data.totalPages)
        } catch (e) {
            navigate("/Error");
        }
    }

    const handleNameSearch = (value) =>{
        setNameSearch(value);
    }

    const submitSearch = async () =>{
        try {
            let res = await method.getAllProduct(0,nameSearch);
            setProduct(res.content);
            setTotalPages(Math.ceil(res.totalElements/res.size))
        } catch (e){
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
            <div className="main">
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
                    <div className="input-group" style={{marginLeft:"450px"}}>
                        <div className="row m-2">
                            <div className="col-auto">
                                <input type="text" name="name" className="form-control"  onChange={(event => handleNameSearch(event.target.value))} id="name" placeholder="Tìm kiếm theo tên "/>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-outline-secondary" onClick={()=>submitSearch()}>
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
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
                                                <NavLink to={`/product/detail/${item.id}`}>
                                                    <button className="btn btn-primary">Xem chi tiết</button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )
                        ):(<h5 style={{color: "red"}}>Không tìm thấy dữ liệu </h5>)
                        }
                    </div>
                    <div className="page">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Sau>"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
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