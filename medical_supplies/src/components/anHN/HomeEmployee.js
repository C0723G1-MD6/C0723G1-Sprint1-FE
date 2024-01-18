import Footer from "./Footer";
import * as method from "../../services/anHN/ProductService"
import React from "react";
import {useState, useEffect} from "react";
import "./AnHN.css";
import { toast } from "react-toastify";
import {Link, NavLink, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import img_1 from "../img/img_1.png";
import ModalLogout from "../auth/ModalLogout";
import ReactPaginate from "react-paginate";



function HomeEmployee(){

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

        } catch (e) {
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

    return (
        <>
            <div className="main">
                <main className="content px-3 py-2">
                    <div className="container">
                        <h2 style={{textAlign: "center"}}>DANH SÁCH VẬT TƯ</h2>
                        <div className="input-group w-25">
                            <input type="text" className="form-control " placeholder="Tìm kiếm theo tên sản phẩm" style={{marginLeft:"400px", marginRight:"400px"}}
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
                                            </div>
                                        </div>
                                    </div>
                                )
                            ):(
                                <h5>Không có dữ liệu</h5>
                            )}
                        </div>
                    </div>
                </main>
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
        </>
    )

}

export default  HomeEmployee;