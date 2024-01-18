import React, {useEffect, useState, useRef} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {editEmployeeService, getEmployeeByIdService} from "../../services/employee/employeeService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import authToken from "../../services/units/UserToken";
import * as employeeSevice from "../../services/employee/employeeService";
import HeaderAdmin from "../anHN/HeaderAdmin";
import SidebarAdmin from "../anHN/SidebarAdmin";
import Footer from "../anHN/Footer";
import SidebarEmployee from "../anHN/SidebarEmployee";
import {storage} from "../../services/employee/firebaseConfig";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

export function EditEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState();
    const email = authToken().sub;
    const role = authToken().roles[0].authority;
    // const [image, setImage] = useState("https://media.istockphoto.com/id/1219543807/ko/%EB%B2%A1%ED%84%B0/%EA%B7%B8%EB%A6%BC-%EA%B0%A4%EB%9F%AC%EB%A6%AC-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%A1%9C%EA%B3%A0-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98-%EC%82%AC%EC%A7%84-%EA%B0%A4%EB%9F%AC%EB%A6%AC-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%B2%A1%ED%84%B0-%ED%85%9C%ED%94%8C%EB%A6%BF%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EA%B8%B0%ED%98%B8-%EB%A1%9C%EA%B3%A0-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B8%B0%ED%98%B8-%EC%9D%91%EC%9A%A9-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-ui%EC%97%90-%EB%8C%80%ED%95%9C-%EC%B5%9C%EC%8B%A0-%EC%9C%A0%ED%96%89-%EC%82%AC%EC%A7%84-%EA%B0%A4%EB%9F%AC%EB%A6%AC.jpg?s=170667a&w=0&k=20&c=q1q3pEdGVDSXOf46Dua9Dbplh6WZHui_sG2yL_muJfw=");
    // const inputImage = useRef();

    useEffect(() => {
        if (email) {
            getInfoEmployee();
        }
    }, []);

    // const handleImageChange = (e) => {
    //     if (e.target.file) {
    //         setImage(e.target.file);
    //     }
    // }

    // const handleSubmitAvatar = () => {
    //     const imageRef = ref(storage, "image");
    //     uploadBytes(imageRef, image).then(() => {
    //         getDownloadURL(imageRef).then((url) => {
    //             setUrl(url)
    //         })
    //             .catch((error) => {
    //                 console.log(error.message, "lỗi url image")
    //             });
    //     }).catch((error) => {
    //         console.log(error.message)
    //     })
    // }
    const getInfoEmployee = async () => {
        try {
            const res = await employeeSevice.getAllByEmployee(email);
            setEmployee({...res.data, gender: res.gender ? 1 : 0});
        } catch (e) {
            throw e.response;
        }
    };


    const editEmployee = async (data, setErrors) => {

        try {
            console.log(data)
            const res = await editEmployeeService(data)
            console.log(res)
            if (res.status === 200) {
                navigate("/dashboard")
                toast.success("Chỉnh sửa thông tin thành công.")
            } else if (res.status === 201) {
                toast("Chỉnh sửa thông tin thất bai.")
                setErrors(res.data)
            }
        } catch (e) {
            alert("Error edit")
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
            .required("vui lòng nhập ngày tháng năm sinh.")
            .max(date18, "Vui lòng nhập lớn hơn 18 tuổi.")
            .min(date65, "Vui lòng nhập bé hơn 65 tuổi."),
        phone: Yup.string()
            .required("vui lòng nhập số điện thoại.")
            .matches(/^0[0-9]{9}$/, "SĐT bào gồm 10 số ex:012312312."),
        address: Yup.string()
            .required("vui lòng nhập địa chỉ."),
        gender: Yup.string()
            .required("vui lòng chọn giới tính.")
    }
    const handleGenderChange = (e) => {
        setEmployee({...employee, gender: +e.target.value})
    }
    if (!employee) return null
    return (
        <>
            <HeaderAdmin/>
            {/*cho anh An them sidebarAccountant*/}
            <div className="container-fluid wrapper">
                {role === "ROLE_ADMIN" ?
                    <SidebarAdmin/> : role === "ROLE_ACCOUNTANT" ?
                        "Kế toán" : <SidebarEmployee/>
                }

                <div className="main">
                    <Formik
                        initialValues={employee}
                        onSubmit={(values, {setErrors}) => {
                            const empObj = {...values, gender: +employee.gender === 1}
                            editEmployee(empObj, setErrors)
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
                                                    <div className="row py-5 mt-4 align-items-center">
                                                        {/*// <!-- For Demo Purpose -->*/}
                                                        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0"
                                                             style={{textAlign: "center"}}>
                                                            <img
                                                                src="../img/employee.png"
                                                                alt="img"
                                                                className="img-fluid mb-3 d-none d-md-block rounded-0"
                                                                style={{paddingLeft: "18%"}}/>
                                                            {/*<input type="file" onChange={handleImageChange}/>*/}
                                                            {/*<button className="btn btn-success btn-sm"*/}
                                                            {/*        onClick={handleSubmitAvatar}>Đăng*/}
                                                            {/*</button>*/}
                                                        </div>

                                                        {/*--Form--*/}
                                                        <div className="col-md-7 col-lg-6 ml-auto">
                                                            <Form className="trungnd-form">
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
                                                                                   id="gender"
                                                                                   type="radio"
                                                                                   value={0}
                                                                                   checked={employee.gender === 0}
                                                                                   onChange={handleGenderChange}
                                                                                   data-sb-validations="required"
                                                                                   name="gender"
                                                                            />
                                                                            <label className="form-check-label"
                                                                                   htmlFor="nam">
                                                                                Nam
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <Field className="form-check-input"
                                                                                   style={{marginLeft: "2%"}}
                                                                                   type="radio"
                                                                                   id="gender"
                                                                                   value={1}
                                                                                   checked={employee.gender === 1}
                                                                                   onChange={handleGenderChange}
                                                                                   data-sb-validations="required"
                                                                                   name="gender"
                                                                            />
                                                                            <label className="form-check-label"
                                                                                   htmlFor="nữ">
                                                                                Nữ
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
                                                                    <button type='reset'
                                                                            className="btn btn-warning">Reset
                                                                    </button>
                                                                </div>
                                                            </Form>
                                                        </div>
                                                    </div>
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