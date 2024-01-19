import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {
    editProduct,
    getListProduction,
    getListTypeProduct,
    getProductById
} from "../../services/serviceProduct/ServiceProduct";
import logoImage from "../../img/yte4.png";
import {useNavigate, Link} from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../anHN/Sidebar";
import {Navbar} from "react-bootstrap";
import Header from "../anHN/Header";
import Footer from "../anHN/Footer";

export default function ProductEdit() {
    const [product, setProduct] = useState([]);
    const [typeProducts, setTypeProducts] = useState([]);
    const [productions, setProductions] = useState([]);
    const navigate = useNavigate();
    const param = useParams();
    const [img,setImg] = useState("");
    console.log(param.id);
    const findByIdProduct = async () => {
        const dataProduct = await getProductById(param.id);
        await setProduct(dataProduct);
        await setImg(dataProduct.mainAvatar);
        await console.log(img);
        await console.log(dataProduct)
    }
    const getAllTypeProduct = async () => {
        const dataTypeProduct = await getListTypeProduct();
        console.log(dataTypeProduct)
        setTypeProducts(dataTypeProduct);
    }
    const getAllProduction = async () => {
        const dataProduction = await getListProduction();
        setProductions(dataProduction);
    }
    useEffect(() => {
        findByIdProduct();
        getAllTypeProduct();
        getAllProduction();
        window.scrollTo(0, 0);
    }, [param.id]);

    const handleCreate = async (product) => {
        await editProduct(product)
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: 'The Prodoct has been edited successfully',
                    icon: 'success',
                    timer: 2000
                })
            }, await  setProduct(product),
            navigate("/dashboard")
            )
            .catch(() => {
                navigate(`/product/edit/${param.id}`);
            });
    }


    const backgroundImage = `url(${logoImage})`;
    return (
        <>
            <div className="container-fluid">
                <div>
                    <Header/>
                </div>
                <div className="row">
                    <div className="col-3">
                        <Sidebar/>
                    </div>
                    <div className="col-9">
                        {product.id && (
                            <Formik initialValues={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: product.quantity,
                                supplier: product.supplier,
                                ingredient: product.ingredient,
                                mainAvatar: product.mainAvatar,
                                avatarOne: product.avatarOne,
                                avatarTwo: product.avatarTwo,
                                typeProduct: product.typeProduct.id,
                                productions: product.productions.id
                            }}
                                    validationSchema={yup.object().shape({
                                        name: yup.string().required("Tên vật tư không được để trống.")
                                            .min(3, "Tên vật tư phải dài hơn 3 kí tự.")
                                            .max(100, "Tên vật tư phải ngắn 100 kí tự."),
                                        price: yup.number().required("Giá không được để trống.")
                                            .min(1000, "Giá phải lớn hơn 1000 VNĐ.")
                                            .max(10000000000000, "Giá không thể vượt quá 10000000000000 VNĐ."),
                                        quantity: yup.number().required("Số lượng không được để trống.")
                                            .min(1, "Số lượng phải lớn hơn hoặc bằng 1.")
                                            .max(10000000000000, "Số lượng phải bé hơn 10000000000000."),
                                        supplier: yup.string().required("Tên nhà cung cấp không được để trống.")
                                            .min(3, "Tên nhà cung cấp phải dài hơn 3 kí tự.")
                                            .max(100, "Tên nhà cung cấp phải ngắn hơn 100 kí tự."),
                                        ingredient: yup.string().required("Tên thành phần không được để trống.")
                                            .min(3, "Tên thành phần phải dài hơn 3 kí tụ.")
                                            .max(100, "Tên thành phần phải ngắn hơn 100 ký tự."),
                                        typeProduct: yup.number().required("Loại vật tư không được để trống.").min(1, "Vui lòng chọn loại sản phẩm.").max(4, "dfvrr"),
                                        productions: yup.number().required("Nhà sản xuất không được để trống.")
                                    })}

                                    onSubmit={(values) => {
                                        handleCreate(values);
                                    }}
                            >
                                <Form>
                                    <div style={{height: "20%", width: "90%"}}>
                                        <div style={{backgroundImage}}>
                                            <h2 className="text-secondary fw-bolder text-center"
                                                style={{paddingTop: "3%"}}>
                                                Chỉnh Sửa Vật Tư
                                            </h2>
                                            <div className="row py-5 mt-4 align-items-center">
                                                {/*For Demo Purpose*/}
                                                <div className="col-md-5 pr-lg-5 mb-5 mb-md-0"
                                                     style={{textAlign: "center"}}>
                                                    <img style={{padding: "10px"}} alt="img"
                                                         src={img}
                                                         className="img-fluid mb-3 d-none d-md-block rounded-0"/>
                                                    <button className="btn btn-success btn-sm">Sửa ảnh</button>
                                                </div>

                                                {/*Form */}
                                                <div className="col-md-7 col-lg-6 ml-auto">

                                                    <div className="row">
                                                        {/*Tên vật tư*/}
                                                        <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-file-signature"></i>
                            </span>
                                                            <Field id="name" type="text" name="name"
                                                                   placeholder="Tên vật tư"
                                                                   className="form-control"/>

                                                        </div>
                                                        <p style={{color: "red"}}><small>
                                                            <ErrorMessage
                                                                name="name"
                                                                component="div"
                                                                className="text-error"
                                                                id="name"/>
                                                        </small>
                                                        </p>
                                                        {/*Loại vật tư*/}
                                                        <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-stream"></i>
                            </span>
                                                            <Field id="typeProduct" as="select"
                                                                   name="typeProduct"
                                                                   placeholder="Loại vật tư"
                                                                   className="form-control bg-white border-left-0 border-md">
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
                                                            className="text-error"
                                                            id="typeProduct"/></small>
                                                        </p>
                                                        {/*Giá*/}
                                                        <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                               <i className="fas fa-dollar-sign"></i>
                            </span>
                                                            <Field id="price" type="number" name="price"
                                                                   placeholder="Giá"
                                                                   className="form-control bg-white border-left-0 border-md"/>
                                                        </div>
                                                        <p style={{color: "red"}}><small><ErrorMessage
                                                            name="price"
                                                            component="div"
                                                            className="text-error"
                                                            id="price"/></small>
                                                        </p>
                                                        {/*Số lượng*/}
                                                        <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                               <i className="fas fa-plus"></i>
                            </span>
                                                            <Field id="quantity" type="number"
                                                                   name="quantity"
                                                                   placeholder="Số lượng"
                                                                   className="form-control bg-white border-left-0 border-md"/>
                                                        </div>
                                                        <p style={{color: "red"}}><small><ErrorMessage
                                                            name="quantity"
                                                            component="div"
                                                            className="text-error"
                                                            id="quantity"/></small>
                                                        </p>
                                                        {/*Thành phần*/}
                                                        <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-vial"></i>
                            </span>
                                                            <Field id="ingredient" type="text"
                                                                   name="ingredient"
                                                                   placeholder="Thành phần"
                                                                   className="form-control bg-white border-left-0 border-md"/>
                                                        </div>
                                                        <p style={{color: "red"}}><small><ErrorMessage
                                                            name="ingredient"
                                                            component="div"
                                                            className="text-error"
                                                            id="ingredient"/></small>
                                                        </p>
                                                        {/*Nơi sản xuất*/}
                                                        <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-globe"></i>
                            </span>
                                                            <Field id="productions" as="select"
                                                                   name="productions"
                                                                   placeholder="Nơi sản xuất"
                                                                   className="form-control bg-white border-left-0 border-md">
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
                                                            className="text-error"
                                                            id="productions"/></small>
                                                        </p>
                                                        {/*Nhà cung cấp*/}
                                                        <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fas fa-truck-moving"></i>
                            </span>
                                                            <Field id="supplier" type="text" name="supplier"
                                                                   placeholder="Nhà cung cấp"
                                                                   className="form-control bg-white border-left-0 border-md"/>
                                                        </div>
                                                        <p style={{color: "red"}}><small><ErrorMessage
                                                            name="supplier"
                                                            component="div"
                                                            className="text-error"
                                                            id="supplier"/></small>
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="d-flex me-5 justify-content-center gap-3">
                                                        <Link to="/dashboard" className="btn btn-success btn-sm">
                                                            Hủy
                                                        </Link>
                                                        <button className="btn btn-success btn-sm"
                                                                type="submit">Thay đổi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        )}
                    </div>
                </div>
                <div style={{marginTop: "30px"}}>
                    <Footer/>
                </div>
            </div>
        </>
    )

}