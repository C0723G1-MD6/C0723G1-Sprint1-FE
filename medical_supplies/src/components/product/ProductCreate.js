import {Form, Field, Formik, ErrorMessage} from "formik";
import logoImage from "../../img/yte4.png"
import {useEffect, useState} from "react";
import * as yup from "yup"
import {
    createProduct,
    getListProduction,
    getListTypeProduct,
    listProducts
} from "../../services/serviceProduct/ServiceProduct";
import {Link, NavLink, useNavigate} from "react-router-dom";
import ProductImage from "./ProductImage";
import Header from "../anHN/Header";
import Sidebar from "../anHN/Sidebar";
import Footer from "../anHN/Footer";
import {forEach} from "react-bootstrap/ElementChildren";
import Swal from "sweetalert2";
import HeaderAdmin from "../anHN/HeaderAdmin";

export default function ProductCreate() {
    const [typeProducts, setTypePrudcts] = useState([]);
    const [productions, setProductions] = useState([]);
    const [urlImages, setUrlImages] = useState("");
    const [beError, setBeError] = useState();
    const [products, setProduct] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const getListProduct = async () => {
        const products = await listProducts();
        setProduct(products.content);
    }

    const getListtTypeProduct = async () => {
        const data = await getListTypeProduct();
        await setTypePrudcts(data);
        // await console.log(typeProducts);

    }
    const getListtProduction = async () => {
        const data = await getListProduction();
        await setProductions(data);
        await console.log(productions);
    }

    const onCallBack = (urls) => {
        console.log(urls);
        if (urls) {
            setBeError((prevState) => ({
                ...prevState,
                productImage: "",
            }));
        }
        setUrlImages((prevState) => [...prevState, ...urls]);
    };

    const changeValue = (e) => {
        setBeError((prevState) => ({
            ...prevState,
            [e.target.name]: "",
        }));
    };

    const handleCreate = async (values) => {
        checkProduct(values);
        if (checkProduct(values) == true){
            values = {
                ...values,
                mainAvatar: urlImages.toString(),

            };
            await createProduct(values).then(() => {
                    Swal.fire({
                        title: "Success",
                        text: 'The Prodoct has been edited successfully',
                        icon: 'success',
                        timer: 2000
                    })
                },
                navigate("/dashboard")
            )
                .catch(() => {
                    navigate(`/product/create`);
                });
            await navigate("/dashboard");
        }else {

        }

    }
    const checkProduct = (product) => {
        for (let i = 0; i < products.length; i++) {
            if (product.name === products[i].name) {
                setMessage("Tên vật tư đã tồn tại");
                return false;
            }
            return true;
        }
    }


    useEffect(() => {
        getListtProduction();
        getListtTypeProduct();
        getListProduct();
        window.scrollTo(0, 0);
    }, []);


    const backgroundImage = `url(${logoImage})`;
    return (
        <>
            <div className="container-fluid">
                <div>
                    <HeaderAdmin/>
                </div>
                <div className="row">
                    <div className="col-3">
                        <Sidebar/>
                    </div>

                    <div className="col-9">
                        <Formik initialValues={{
                            name: "",
                            price: 1000,
                            quantity: 0,
                            supplier: "",
                            ingredient: "",
                            mainAvatar: "",
                            avatarOne: "",
                            avatarTwo: "",
                            typeProduct: 0,
                            productions: 0
                        }}
                                validationSchema={yup.object().shape({
                                    name: yup.string().required("Tên vật tư không được để trống")
                                        .min(3, "Tên vật tư phải dài hơn 3 kí tự")
                                        .max(100, "Tên vật tư phải ngắn 100 kí tự"),
                                    price: yup.number().required("Giá không được để trống")
                                        .min(1000, "Giá phải lớn hơn 1000 VNĐ")
                                        .max(10000000000000, "Giá không thể vượt quá 10000000000000 VNĐ"),
                                    quantity: yup.number().required("Số lượng không được để trống")
                                        .min(1, "Số lượng phải lớn hơn hoặc bằng 1")
                                        .max(10000000000000, "Số lượng phải bé hơn 10000000000000"),
                                    supplier: yup.string().required("Tên nhà cung cấp không được để trống")
                                        .min(3, "Tên nhà cung cấp phải dài hơn 3 kí tự")
                                        .max(100, "Tên nhà cung cấp phải ngắn hơn 100 kí tự"),
                                    ingredient: yup.string().required("Tên thành phần không được để trống")
                                        .min(3, "Tên thành phần phải dài hơn 3 kí tụ")
                                        .max(100, "Tên thành phần phải ngắn hơn 100 ký tự"),
                                    typeProduct: yup.number().required("Loại vật tư không được để trống").min(1, "Vui lòng chọn loại sản phẩm"),
                                    productions: yup.number().required("Nhà sản xuất không được để trống").min(1, "Vui lòng chọn nơi sản xuất")
                                })}

                                onSubmit={(values) => {
                                    handleCreate(values);
                                }}>
                            <Form>
                                <div style={{height: "20%", width: "90%"}}>
                                    <div className="form-control shadow rounded-0 p-4"
                                         style={{backgroundImage}}>
                                        <h2 className="text-secondary fw-bolder text-center"
                                            style={{paddingTop: "3%"}}>
                                            Thêm Mới Vật Tư
                                        </h2>
                                        <div className="row py-5 mt-4 align-items-center">
                                            {/*For Demo Purpose*/}
                                            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0"
                                                 style={{textAlign: "center"}}>
                                                <ProductImage
                                                    callBack={onCallBack}
                                                    name="mainAvatar"
                                                    onInput={changeValue}
                                                />
                                            </div>

                                            {/*Form */}
                                            <div className="col-md-7 col-lg-6 ml-auto">

                                                <div className="row">
                                                    {/*Tên vật tư*/}
                                                    <div className="input-group mb-1">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-file-signature"/>
                            </span>
                                                        <Field id="name" type="text" name="name"
                                                               placeholder="Tên vật tư"
                                                               className="form-control"
                                                            // onChange={handleOnChange}
                                                        />
                                                    </div>
                                                    <p style={{color: "red"}} className=" mb-0">
                                                        {message != "" &&
                                                        (
                                                            <small className="mb-0">{message}</small>
                                                        )}
                                                        <small>
                                                            <ErrorMessage name="name"
                                                                          component="div"
                                                                          className="text-error"
                                                                          id="name"/>
                                                        </small>
                                                    </p>
                                                    {/*Loại vật tư*/}
                                                    <div className="input-group">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-stream"/>
                            </span>
                                                        <Field id="typeProduct" as="select" name="typeProduct"
                                                               placeholder="Loại vật tư"
                                                               className="form-control bg-white border-left-0 border-md">
                                                            <option>Chọn loại vật tư</option>
                                                            {typeProducts.map((typeProducts) => {
                                                                return (
                                                                    <option key={typeProducts.id}
                                                                            value={typeProducts.id}>
                                                                        {typeProducts.nameTypeProduct}
                                                                    </option>
                                                                );
                                                            })}
                                                        </Field>
                                                    </div>
                                                    <p style={{color: "red"}}><small><ErrorMessage
                                                        name="typeProduct"
                                                        component="div"
                                                        className="text-error mb-0"
                                                        id="typeProduct"/></small>
                                                    </p>
                                                    {/*Giá*/}
                                                    <div className="input-group">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                               <i className="fas fa-dollar-sign"/>
                            </span>
                                                        <Field id="price" type="number" name="price"
                                                               placeholder="Giá"
                                                               className="form-control bg-white border-left-0 border-md"/>
                                                    </div>
                                                    <p style={{color: "red"}}><small><ErrorMessage name="price"
                                                                                                   component="div"
                                                                                                   className="text-error"
                                                                                                   id="price"/></small>
                                                    </p>
                                                    {/*Số lượng*/}
                                                    <div className="input-group">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                               <i className="fas fa-plus"/>
                            </span>
                                                        <Field id="quantity" type="number" name="quantity"
                                                               placeholder="Số lượng"
                                                               className="form-control bg-white border-left-0 border-md"/>
                                                    </div>
                                                    <p style={{color: "red"}}><small><ErrorMessage
                                                        name="quantity"
                                                        component="div"
                                                        className="text-error mb-1"
                                                        id="quantity"/></small>
                                                    </p>
                                                    {/*Thành phần*/}
                                                    <div className="input-group">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-vial"/>
                            </span>
                                                        <Field id="ingredient" type="text" name="ingredient"
                                                               placeholder="Thành phần"
                                                               className="form-control bg-white border-left-0 border-md"/>
                                                    </div>
                                                    <p style={{color: "red"}}><small><ErrorMessage
                                                        name="ingredient"
                                                        component="div"
                                                        className="text-error mb-1"
                                                        id="ingredient"/></small>
                                                    </p>
                                                    {/*Nơi sản xuất*/}
                                                    <div className="input-group">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-globe"/>
                            </span>
                                                        <Field id="productions" as="select" name="productions"
                                                               placeholder="Nơi sản xuất"
                                                               className="form-control bg-white border-left-0 border-md">
                                                            <option>Chọn nơi sản xuất</option>
                                                            {productions.map((production) => {
                                                                return (
                                                                    <option key={production.id}
                                                                            value={production.id}>
                                                                        {production.nameProductions}
                                                                    </option>
                                                                );
                                                            })}
                                                        </Field>
                                                    </div>
                                                    <p style={{color: "red"}}><small><ErrorMessage
                                                        name="productions"
                                                        component="div"
                                                        className="text-error mb-1"
                                                        id="productions"/></small>
                                                    </p>
                                                    {/*Nhà cung cấp*/}
                                                    <div className="input-group">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-truck-moving"/>
                            </span>
                                                        <Field id="supplier" type="text" name="supplier"
                                                               placeholder="Nhà cung cấp"
                                                               className="form-control bg-white border-left-0 border-md"/>
                                                    </div>
                                                    <p style={{color: "red"}}><small><ErrorMessage
                                                        name="supplier"
                                                        component="div"
                                                        className="text-error mb-1"
                                                        id="supplier"/></small>
                                                    </p>
                                                </div>
                                                <div className="d-flex me-5 justify-content-center gap-3">

                                                    <Link to="/dashboard" className="btn btn-success btn-sm"
                                                          type="submit">Hủy
                                                    </Link>

                                                    <button className="btn btn-success btn-sm"
                                                            type="submit">Thêm Mới
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div style={{marginTop: "30px"}}>
                    <Footer/>
                </div>
            </div>

        </>
    )
}