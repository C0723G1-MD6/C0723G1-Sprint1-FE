import * as method from "../../services/anHN/ProductService"
import React, {useEffect, useState} from "react";
import "./AnHN.css";
import ReactPaginate from "react-paginate";


function HomeAdmin() {

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
            console.log("error")
        }
    }
    const getAllProduct = async () => {
        try {
            let data = await method.getAllProductPage();
            setTotalPages(data.totalPages)
        } catch (e) {
            console.log("error")
        }
    }
    console.log(product)
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
                            <input type="text" className="form-control " placeholder="Tìm kiếm theo tên sản phẩm" style={{marginLeft:"23px"}}
                                   aria-label="Recipient's username with two button addons"
                                   onChange={event => setNameSearch(event.target.value)}/>
                            <button className="btn btn-outline-secondary" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>
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
                                                <a href="#" className="btn btn-danger" style={{marginLeft:"15px"}}>Chỉnh sửa</a>
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

export default HomeAdmin;