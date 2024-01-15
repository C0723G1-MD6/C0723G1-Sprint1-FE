import {Form, Field, Formik, ErrorMessage} from "formik";
import {NavLink} from "react-bootstrap";
import logoImage from "../../img/yte4.png"
import {useState} from "react";
import * as yup from "yup"
export default function ProductCreate() {

    const [typeProducts, setTypePrudcts] = useState([]);
    const [productions, setProductions] = useState([]);


    const backgroundImage = `url(${logoImage})`;
    return (
        <>
            <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="row content">
                        <div className="col-lg-12 pt-lg">
                            <div className="d-flex justify-content-center">
                                <div className="col-7">
                                    <div className="form-control shadow rounded-0 p-4"
                                         style={{backgroundImage}}>
                                        <h2 className="text-secondary fw-bolder text-center"
                                            style={{paddingTop: "3%"}}>
                                            Thêm mới vật tư
                                        </h2>
                                        <div className="row py-5 mt-4 align-items-center">
                                            {/*For Demo Purpose*/}
                                            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0"
                                                 style={{textAlign: "center"}}>
                                                <img
                                                    src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                                                    alt="img"
                                                    className="img-fluid mb-3 d-none d-md-block rounded-0"/>
                                                <button className="btn btn-success btn-sm">Thêm ảnh</button>
                                            </div>

                                            {/*Form */}
                                            <div className="col-md-7 col-lg-6 ml-auto">
                                                <Formik initialValues={{
                                                    name: "",
                                                    price: 0,
                                                    quantity: 0,
                                                    supplier: "",
                                                    ingredient: "",
                                                    mainAvatar: "male",
                                                    avatarOne: "",
                                                    avatarTwo: 0,
                                                    typeProduct: 0,
                                                    productions: 0
                                                }}
                                                        validationSchema={}

                                                        onSubmit={}>
                                                    <form action="#">
                                                        <div className="row">
                                                            {/*Tên vật tư*/}
                                                            <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-file-signature"></i>
                            </span>
                                                                <input id="name" type="text" name="name"
                                                                       placeholder="Tên vật tư"
                                                                       className="form-control bg-white border-left-0 border-md"/>
                                                            </div>
                                                            {/*Loại vật tư*/}
                                                            <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-stream"></i>
                            </span>
                                                                <input id="typeProduct" type="text" name="typeProduct"
                                                                       placeholder="Loại vật tư"
                                                                       className="form-control bg-white border-left-0 border-md"/>
                                                            </div>
                                                            {/*Giá*/}
                                                            <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                               <i className="fas fa-dollar-sign"></i>
                            </span>
                                                                <input id="price" type="number" name="price"
                                                                       placeholder="Giá"
                                                                       className="form-control bg-white border-left-0 border-md"/>
                                                            </div>
                                                            {/*Số lượng*/}
                                                            <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                               <i className="fas fa-plus"></i>
                            </span>
                                                                <input id="quantity" type="number" name="quantity"
                                                                       placeholder="Số lượng"
                                                                       className="form-control bg-white border-left-0 border-md"/>
                                                            </div>
                                                            {/*Thành phần*/}
                                                            <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-vial"></i>
                            </span>
                                                                <input id="ingredient" type="text" name="ingredient"
                                                                       placeholder="Thành phần"
                                                                       className="form-control bg-white border-left-0 border-md"/>
                                                            </div>
                                                            {/*Nơi sản xuất*/}
                                                            <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-globe"></i>
                            </span>
                                                                <input id="production" type="text" name="production"
                                                                       placeholder="Nơi sản xuất"
                                                                       className="form-control bg-white border-left-0 border-md"/>
                                                            </div>
                                                            {/*Nhà cung cấp*/}
                                                            <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-truck-moving"></i>
                            </span>
                                                                <input id="supplier" type="text" name="supplier"
                                                                       placeholder="Nhà cung cấp"
                                                                       className="form-control bg-white border-left-0 border-md"/>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex me-5 justify-content-center gap-3">
                                                            <button className="btn btn-secondary btn-sm"><a
                                                                href="../anHN/AnHN_Home2.html"
                                                                style={{textDecoration: "none", color: "white"}}>Hủy</a>
                                                            </button>
                                                            <button className="btn btn-success btn-sm">Thêm Mới
                                                            </button>
                                                        </div>
                                                    </form>
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}