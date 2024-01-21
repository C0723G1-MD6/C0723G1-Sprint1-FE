import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import * as accountService from "../../services/accounts/AccountService";
import * as Yup from "yup";
import {toast} from "react-toastify";
import HeaderAdmin from "../anHN/HeaderAdmin";
import Sidebar from "../anHN/Sidebar";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Footer from "../anHN/Footer";


export default function RegisterCustomer() {

    const navigate = useNavigate();


    const initValues = {
        email: "",
        password: "",
        name: "",
        birthday: "",
        phone: "",
        address: "",
        idRole: 4

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
        address: Yup.string()
            .required("Vui lòng nhập địa chỉ."),
    };

    const handleSubmitFormRegisterCustomer = async (values, {setErrors}) => {
        try {
            const res = await accountService.createAccountCustomer(values);
            if (res.status === 200) {
                navigate("/login")
                toast.success("Đăng ký thành công!");

            }
        } catch (e) {
            setErrors(e.data);
            if (e.status === 403) {
                navigate("/error");
            }
        }
    }
    return (
        <>
            <HeaderAdmin/>
            <div className="container-fluid wrapper">

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
                                                    onSubmit={(values, {setErrors}) => handleSubmitFormRegisterCustomer(values, {setErrors})}
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
                                                        <label htmlFor="name" className="form-label fw-bold">
                                                            Họ và tên
                                                            <span className="text-danger">(*)</span></label>
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
                                                            <NavLink to={"/"}
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


            <Footer/>
        </>
    )
}