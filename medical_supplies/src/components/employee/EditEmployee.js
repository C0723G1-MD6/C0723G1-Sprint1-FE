import React, {useEffect, useRef, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {editEmployeeService} from "../../services/employee/employeeService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import authToken from "../../services/units/UserToken";
import * as employeeSevice from "../../services/employee/employeeService";
import HeaderAdmin from "../anHN/HeaderAdmin";
import Sidebar from "../anHN/Sidebar";
import Footer from "../anHN/Footer";
import {getDownloadURL, refImage, storage, uploadBytes} from "../../services/firebase/firebaseConfig";
import ProductImage from "../product/ProductImage";


export function EditEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState();
    const email = authToken().sub;
    const role = authToken().roles[0].authority;
    const [urlImages, setUrlImages] = useState("");
    const [beError, setBeError] = useState();
    // const [image,setImage] = useState("");

    useEffect(() => {
        if (email) {
            getInfoEmployee();
        }

    }, []);

    const onCallBack = (urls) => {
        console.log(urls);
        if (urls) {
            setBeError((prevState) => ({
                ...prevState, avatar: "",
            }));
        }
        setUrlImages((prevState) => [...prevState, ...urls]);
    }
    const changeValue = (e) => {
        setBeError((prevState) => ({
            ...prevState,
            [e.target.name]: "",
        }));
    };
    const getInfoEmployee = async () => {
        try {
            if (email) {
                const res = await employeeSevice.getAllByEmployee(email);
                await setEmployee({...res.data, gender: res.data.gender ? "true" : "false"});
            }
        } catch (e) {
            if (e.response && e.response.status === 403) {
                navigate("/error");
            }
        }
    };


    const editEmployee = async (data, setErrors) => {
        try {
            data.avatar = urlImages.toString();
            data.gender = data.gender == "true" ? true : false;
            console.log(data)
            const res = await editEmployeeService(data)
            if (res.status === 200) {
                navigate("/dashboard")
                toast.success("Chỉnh sửa thông tin thành công.")
            } else if (res.status === 201) {
                toast.error("Chỉnh sửa thông tin thất bai.")
                setErrors(res.data)
            }
        } catch (e) {
            if (e.status === 403) {
                navigate("/error");
            }
        }
    }

    const dd = new Date();
    const date18 = `${dd.getFullYear() - 18}-${dd.getMonth() + 1}-${dd.getDate()}`;
    const date65 = `${dd.getFullYear() - 65}-${dd.getMonth() + 1}-${dd.getDate()}`;

    const employeeValidate = {
        name: Yup.string()
            .required("Vui lòng nhập tên")
            .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/, "Chứa kí tự đặc biệt, hoặc số."),
        birthday: Yup.date()
            .required("vui lòng nhập ngày sinh.")
            .max(date18, "Vui lòng nhập lớn hơn 18 tuổi.")
            .min(date65, "Vui lòng nhập bé hơn 65 tuổi."),
        phone: Yup.string()
            .required("vui lòng nhập số điện thoại.")
            .matches(/^(01|03|04|05|07|08|09)\d{8}$/, "Số điện thoại sai định dạng."),
        address: Yup.string()
            .required("vui lòng nhập địa chỉ."),
        gender: Yup.string()
            .required("vui lòng chọn giới tính.")
    }

    if (!employee) return null
    return (
        <>
            <HeaderAdmin/>
            {/*cho anh An them sidebarAccountant*/}
            <div className="container-fluid wrapper">
                <Sidebar/>
                <div className="main">
                    <Formik
                        initialValues={employee}
                        onSubmit={(values, {setErrors}) => {
                            editEmployee(values, setErrors)
                        }}
                        validationSchema={Yup.object(employeeValidate)}
                    >
                        <div className="content px-3 py-2">
                            <div className="container-fluid">
                                <div className="row content">
                                    <div className="col-lg-12 pt-lg">
                                        <div className="d-flex justify-content-center">
                                            <div className="col-7">
                                                <div className="form-control shadow rounded-0 p-4"
                                                     style={{backgroundImage: "url('../img/yte4.png')"}}>
                                                    <h2 className="text-secondary fw-bolder text-center"
                                                        style={{paddingTop: "3%"}}>
                                                        Chỉnh Sửa Thông Tin Cá Nhân
                                                    </h2>
                                                    <Form>
                                                        <div className="row py-5 mt-4 align-items-center">
                                                            {/*// <!-- For Demo Purpose -->*/}
                                                            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0"
                                                                 style={{textAlign: "center"}}>
                                                                <img style={{padding: "10px"}} alt="img"
                                                                     src={employee.avatar}
                                                                     className="img-fluid mb-3 d-none d-md-block rounded-0"/>
                                                                <ProductImage
                                                                    callBack={onCallBack}
                                                                    name="avatar"
                                                                    onInput={changeValue}
                                                                />
                                                            </div>

                                                            {/*--Form--*/}
                                                            <div className="col-md-7 col-lg-6 ml-auto">

                                                                <div className="row">
                                                                    {/* -- Name --*/}
                                                                    <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <FontAwesomeIcon icon="fas fa-user"></FontAwesomeIcon>
                            </span>
                                                                        <Field id="name" type="text" name="name"
                                                                               placeholder="Họ và Tên*"
                                                                               className="form-control bg-white border-left-0 border-md"/>

                                                                    </div>
                                                                    <p><small><ErrorMessage className="text text-danger"
                                                                                            name="name"
                                                                                            component="div"/></small>
                                                                    </p>
                                                                    {/*// <!-- Address-->*/}
                                                                    <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <FontAwesomeIcon icon="fas fa-map-marked-alt"><span
                                    style={{color: "red"}}>*</span></FontAwesomeIcon>
                            </span>
                                                                        <Field as="textarea" id="address" type="text"
                                                                               name="address"
                                                                               placeholder="Địa Chỉ*"
                                                                               className="form-control bg-white border-left-0 border-md"/>

                                                                    </div>
                                                                    <p><small><ErrorMessage className="text text-danger"
                                                                                            name="address"
                                                                                            component="div"/></small>
                                                                    </p>
                                                                    {/*// <!--Gender-->*/}
                                                                    <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <FontAwesomeIcon icon="fas fa-venus-mars"><span
                                    style={{color: "red"}}>*</span></FontAwesomeIcon>
                            </span>
                                                                        <div className="form-check form-check-inline"
                                                                             id="gender">
                                                                            <Field className="form-check-input"
                                                                                   style={{marginLeft: "2%"}}
                                                                                   type="radio"
                                                                                   value="false"
                                                                                   data-sb-validations="required"
                                                                                   name="gender"
                                                                            />
                                                                            <label className="form-check-label"
                                                                                   htmlFor="nam">
                                                                                Nữ
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <Field className="form-check-input"
                                                                                   style={{marginLeft: "2%"}}
                                                                                   type="radio"
                                                                                   value="true"
                                                                                   data-sb-validations="required"
                                                                                   name="gender"
                                                                            />
                                                                            <label className="form-check-label"
                                                                                   htmlFor="nữ">
                                                                                Nam
                                                                            </label>
                                                                        </div>
                                                                    </div>


                                                                    <p><small><ErrorMessage className="text text-danger"
                                                                                            name="gender"
                                                                                            component="div"/></small>
                                                                    </p>
                                                                    {/*// <!-- Phone-->*/}
                                                                    <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <FontAwesomeIcon icon="fas fa-phone-square-alt"><span
                                    style={{color: "red"}}>*</span></FontAwesomeIcon>
                            </span>
                                                                        <Field id="phone" type="text" name="phone"
                                                                               placeholder="Số Điện Thoại"
                                                                               className="form-control bg-white border-left-0 border-md"/>

                                                                    </div>
                                                                    <p><small><ErrorMessage className="text text-danger"
                                                                                            name="phone"
                                                                                            component="div"/></small>
                                                                    </p>
                                                                    <div className="input-group col-lg-6 mb-4">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <FontAwesomeIcon icon="fas fa-birthday-cake"><span
                                    style={{color: "red"}}>*</span></FontAwesomeIcon>
                            </span>
                                                                        <Field id="birthday" type="date" name="birthday"
                                                                               placeholder="Ngày Sinh"
                                                                               className="form-control bg-white border-left-0 border-md"/>
                                                                    </div>
                                                                    <p><small><ErrorMessage className="text text-danger"
                                                                                            name="birthday"
                                                                                            component="div"/></small>
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    className="d-flex me-5 justify-content-center gap-3">
                                                                    <NavLink to={"../dashboard"}>
                                                                        <button className="btn btn-secondary btn-sm"><a
                                                                        >Hủy</a>
                                                                        </button>
                                                                    </NavLink>
                                                                    <button type='submit'
                                                                            className="btn btn-success btn-sm">Cập
                                                                        nhật
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Formik>
                </div>
            </div>
            <Footer/>
        </>
    )
}