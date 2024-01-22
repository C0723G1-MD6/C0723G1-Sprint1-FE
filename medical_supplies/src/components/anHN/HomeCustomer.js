import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as method from "../../services/anHN/ProductService";
import ReactPaginate from "react-paginate";
import Cart from "../cart/Cart";
import HeaderCustomer from "./HeaderCustomer";
import Sidebar from "./Sidebar";

export default function HomeCustomer() {
    const navigate = useNavigate();
    const [nameSearch, setNameSearch] = useState([])

    const [product, setProduct] = useState([]);


    const [totalPages, setTotalPages] = useState(0);
    // // Nam cart
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);


    useEffect(() => {
        getAll(0, nameSearch);
        getAllProductPage()
    }, []);

    const getAll = async (page, nameSearch) => {
        try {
            let data = await method.getAllProduct(page, nameSearch);
            setProduct(data.content);
        } catch (e) {
            navigate("/Error");
        }
    }

    const getAllProductPage = async (page, nameSearch) => {
        try {
            let data = await method.getAllProductPage(page, nameSearch);
            setTotalPages(data.totalPages)
        } catch (e) {
            navigate("/Error");
        }
    }

    const handleNameSearch = (value) => {
        setNameSearch(value);
    }

    const submitSearch = async () => {
        try {
            let res = await method.getAllProduct(0, nameSearch);
            setProduct(res.content);
            setTotalPages(Math.ceil(res.totalElements / res.size))
        } catch (e) {
            navigate("/Error");
        }
    }
    // // Nam cart
    const addToCart = (product) => {
        if (cart.indexOf(product) !== -1) return null;
        const arrProduct = [...cart];
        product.amount = 1;
        arrProduct.push(product);
        setCart([...arrProduct]);
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
            <HeaderCustomer quantity={cart.length} setShowCart={setShowCart}/>
            {!showCart ?
                (<div className="container-fluid wrapper">
                        <Sidebar />
                        <div className="main">
                            <main className="content px-3 py-2">
                                <div className="container">
                                    <h2 style={{textAlign: "center"}}>DANH SÁCH VẬT TƯ</h2>
                                    <div className="input-find" >
                                        <div className="row m-2">
                                            <div className="col-auto">
                                                <input type="text" name="name" className="form-control"
                                                       onChange={(event => handleNameSearch(event.target.value))}
                                                       id="name"
                                                       placeholder="Tìm kiếm theo tên "/>
                                            </div>
                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-outline-secondary"
                                                        onClick={() => submitSearch()}>
                                                    Tìm kiếm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row-1-home">
                                        {product ? (
                                            product.map(item =>
                                                <div key={item.id} className="col-12 col-lg-4">
                                                    <div className="card gap-3" >
                                                        <img className="card-img-top" src={item.mainAvatar}
                                                             alt="Card image"
                                                             height="280"
                                                             width="250"/>
                                                        <div className="card-body">
                                                            <h5 className="card-text">{item.name}</h5>
                                                            <p className="card-text">Giá: {VND.format(item.price)}
                                                            </p>
                                                            <NavLink to={`/product/detail/${item.id}`}>
                                                                <button className="btn btn-primary">Xem chi tiết
                                                                </button>
                                                            </NavLink>
                                                            {cart.indexOf(item) !== -1 ?
                                                                (<span></span>)
                                                                :
                                                                (<button onClick={() => addToCart(item)}
                                                                         className="btn btn-danger"
                                                                         style={{marginLeft: "15px"}}>Đặt hàng
                                                                </button>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            <h5 style={{color: "red"}}>Không tìm thấy dữ liệu</h5>
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
                    </div>
                )
                :
                (<Cart setShowCart={setShowCart} cart={cart} setCart={setCart}/>)
            }
        </>
    )
}