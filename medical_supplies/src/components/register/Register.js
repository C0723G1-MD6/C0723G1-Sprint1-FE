import {ErrorMessage, Field, Formik, Form} from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import * as accountService from "../../services/accounts/AccountService";
import {toast} from "react-toastify";
import {useNavigate, NavLink} from "react-router-dom";
import Footer from "../anHN/Footer";
import HeaderAdmin from "../anHN/HeaderAdmin";
import Sidebar from "../anHN/Sidebar";


export default function Register() {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllRole();
    }, []);

    const getAllRole = async () => {
        try {
            const res = await accountService.roleList();
            setRoles(res.data)
        } catch (e) {
            return e;
        }
    }

    const initValues = {
        email: "",
        password: "",
        name: "",
        birthday: "",
        phone: "",
        address: "",
        gender: "",
        idRole: ""

    }
    const validateFormRegister = {
        email: Yup.string()
            .required("Vui lòng nhập email."),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu."),
        name: Yup.string()
            .required("Vui lòng nhập tên."),
        birthday: Yup.string()
            .required("Vui lòng nhập ngày sinh."),
        phone: Yup.string()
            .required("Vui lòng nhập số điện thoại."),
        gender: Yup.string()
            .required("Vui lòng chọn giới tính."),
        address: Yup.string()
            .required("Vui lòng nhập địa chỉ."),
        idRole: Yup.string()
            .required("Vui lòng chọn chức vụ.")
    };

    const handleSubmitFormRegister = async (values, {setErrors}) => {
        try {
            console.log(values);
            const res = await accountService.createAccount(values);
            if (res.status === 200) {
                navigate("/register")
                toast.success("Đăng ký thành công!");

            }
        } catch (e) {
            setErrors(e.data);
            if (e.status===403){
                navigate("/error");
            }
        }
    }
    return (
        <>
            <HeaderAdmin/>
            <div className="container-fluid wrapper">
                <Sidebar/>
                <div className="main">
                    <main className="content px-3 py-2">
                        <div className="container-fluid">
                            <div className="row content">
                                <div className="col-lg-12 pt-lg" style={{paddingLeft: '15%'}}>
                                    <div className="col-md-9 col-lg-9 col-xl-9">
                                        <div className="d-flex justify-content-center">
                                            <div className="form-control shadow rounded-0 p-4"
                                                 style={{backgroundImage: "url('/imgage/yte4.png')"}}>
                                                <h2 className="text-center">Tạo Tài Khoản</h2>
                                                <Formik initialValues={initValues}
                                                        onSubmit={(values, {setErrors}) => handleSubmitFormRegister(values, {setErrors})}
                                                        validationSchema={Yup.object(validateFormRegister)}
                                                >
                                                    <Form className="mt-3">
                                                        <div className="mb-3">
                                                            <label htmlFor="email"
                                                                   className="form-label fw-bold">Email<span
                                                                className="text-danger">(*)</span></label>
                                                            <Field type="text" className="form-control" id="email"
                                                                   name="email"
                                                                   aria-describedby="emailHelp"/>
                                                        </div>
                                                        <ErrorMessage name="email" className="text-danger"
                                                                      component="p"/>
                                                        <div className="mb-3">
                                                            <label htmlFor="password" className="form-label fw-bold">Mật
                                                                khẩu<span
                                                                    className="text-danger">(*)</span></label>
                                                            <Field type="password" className="form-control"
                                                                   id="password"
                                                                   name="password"/>
                                                        </div>
                                                        <ErrorMessage name="password" className="text-danger"
                                                                      component="p"/>
                                                        <div className="mb-3">
                                                            <label htmlFor="idRole" className="form-label fw-bold">Chức
                                                                vụ<span
                                                                    className="text-danger">(*)</span></label>
                                                            < Field as="select" className="form-select" name="idRole">
                                                                <option value="">-----Chọn nghiệp vụ-----</option>
                                                                {
                                                                    roles.map(role => (
                                                                        <option key={role.idRole} value={role.idRole}>
                                                                            {role.idRole === 1 ?
                                                                                "Admin" : role.idRole === 2 ?
                                                                                    "Kế toán" : "Người bán hàng"}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Field>
                                                        </div>
                                                        <ErrorMessage name="idRole" className="text-danger"
                                                                      component="p"/>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label fw-bold">Tên
                                                                nhân
                                                                viên<span
                                                                    className="text-danger">(*)</span></label>
                                                            <Field type="text" className="form-control" id="name"
                                                                   name="name"/>
                                                        </div>
                                                        <ErrorMessage name="name" className="text-danger"
                                                                      component="p"/>
                                                        <div className="mb-3">
                                                            <label htmlFor="birthday" className="form-label fw-bold">Ngày
                                                                sinh<span
                                                                    className="text-danger">(*)</span></label>
                                                            <Field type="date" className="form-control" id="birthday"
                                                                   name="birthday"/>
                                                        </div>
                                                        <ErrorMessage name="birthday" className="text-danger"
                                                                      component="p"/>
                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Giới tính<span
                                                                className="text-danger">(*)</span></label>
                                                            <div>
                                                                <Field className="form-check-input" type="radio"
                                                                       name="gender"
                                                                       id="nam" value="true"
                                                                       data-sb-validations="required"
                                                                />
                                                                <label className="form-check-label me-3 ms-1"
                                                                       htmlFor="nam">
                                                                    Nam
                                                                </label>

                                                                <Field className="form-check-input" type="radio"
                                                                       name="gender"
                                                                       id="nu" value="false"
                                                                       data-sb-validations="required"
                                                                />
                                                                <label className="form-check-label ms-1" htmlFor="nu">
                                                                    Nữ
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="gender" className="text-danger"
                                                                      component="p"/>
                                                        <div className="mb-3">
                                                            <label htmlFor="address" className="form-label fw-bold">Địa
                                                                chỉ<span
                                                                    className="text-danger">(*)</span></label>
                                                            <Field as="textarea" className="form-control" id="address"
                                                                   name="address"></Field>
                                                        </div>
                                                        <ErrorMessage name="address" className="text-danger"
                                                                      component="p"/>
                                                        <div className="mb-3">
                                                            <label htmlFor="phone" className="form-label fw-bold">
                                                                Số điện thoại
                                                                <span className="text-danger">(*)</span></label>
                                                            <Field type="text" className="form-control" id="phone"
                                                                   name="phone"/>
                                                        </div>
                                                        <ErrorMessage name="phone" className="text-danger"
                                                                      component="p"/>
                                                        <div className="row mt-5">
                                                            <div className="col-6 d-flex justify-content-end">
                                                                <NavLink to={"/dashboard-admin"}
                                                                         className="btn btn-secondary me-2">Trở
                                                                    về</NavLink>
                                                            </div>

                                                            <div className="col-6">
                                                                <button type="submit"
                                                                        className="btn btn-success ms-2">Thêm
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </main>
                </div>
            </div>

            <Footer/>
        </>
    )
}