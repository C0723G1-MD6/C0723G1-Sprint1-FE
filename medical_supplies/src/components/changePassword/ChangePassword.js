import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {changePassword} from "../../services/changePassword/ChangePasswordService";
import {Field, Formik, Form, ErrorMessage} from "formik";
import authToken from "../../services/units/UserToken";
import HeaderAdmin from "../anHN/HeaderAdmin";
import Sidebar from "../anHN/Sidebar";
import Footer from "../anHN/Footer";



export default function ChangePassword() {
    const navigate = useNavigate();
    const email = authToken().sub;
    const role = authToken().roles[0].authority;
    const handleSubmitFormChangePassword = async (values, {setErrors}) => {
        try {
            const res = await changePassword(values);
            if (res.status === 200) {
                navigate("/dashboard");
                toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại để tiếp tục !")
            }
        } catch (e) {
            setErrors(e.data);
            if (e.status===403){
                navigate("/error");
            }
        }
    };


    const initValues = {
        email: email,
        password: "",
        newPassword: "",
        againNewPassword: ""
    }
    const validateFormatChangePassword = Yup.object({
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu."),
        newPassword: Yup.string()
            .required("Vui lòng nhập mật khẩu mới.")
            .min(8, "Mật khẩu mới phải trên 8 kí tự.")
            .max(100, "Mật khẩu mới không được quá 100 kí tự."),
        againNewPassword: Yup.string()
            .required("Vui lòng nhập lại mật khẩu mới.")
            .oneOf([Yup.ref('newPassword'), null], 'Nhập lại mật khẩu mới không khớp.')
    });

    return (
        <>
            <HeaderAdmin/>
            <div className="container-fluid wrapper">
                {role === "ROLE_ADMIN" ?
                    <Sidebar/> : role === "ROLE_ACCOUNTANT" ?
                        "Kế toán" : <Sidebar/>
                }

                <div className="row my-5">
                    <div className="col-lg-12 pt-lg-5">
                        <Formik initialValues={initValues}
                                validationSchema={validateFormatChangePassword}
                                onSubmit={(values, {setErrors}) =>
                                    handleSubmitFormChangePassword(values, {setErrors})}>
                            <div className="d-flex justify-content-center">
                                <div className="col-7">
                                    <div className="form-control shadow rounded-0 p-4"
                                         style={{backgroundImage: "url('../img/yte4.png')"}}>
                                        <h2 className="text-secondary fw-bolder text-center" style={{paddingTop: "3%"}}>
                                            Đổi Mật Khẩu
                                        </h2>
                                        {/*<div className="row py-5 mt-4 align-items-center">*/}
                                        {/*    /!*For Demo Purpose *!/*/}
                                        {/*    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0"*/}
                                        {/*         style={{textAlign: "center"}}>*/}
                                        {/*        <img*/}
                                        {/*            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTz9mo8UybQ2Uf6MdgKs-8nz-OM7SS9nKsWRArR-bcdvRvNUTlLHmIksU_onSdvZQmtcY&usqp=CAU"*/}
                                        {/*            alt="img"*/}
                                        {/*            className="img-fluid mb-3 d-none d-md-block rounded-5"/>*/}
                                        {/*    </div>*/}

                                        {/*// <!--Form -->*/}
                                        <div className="col-md-7 col-lg-6 ml-auto">
                                            <Form>
                                                <Field name="email" hidden/>
                                                <div className="row">
                                                    {/*// <!-- Old Password -->*/}
                                                    <div className="input-group col-lg-6 mb-4">
                                                        <Field id="password" type="password" name="password"
                                                               placeholder="Nhập Mật Khẩu Cũ"
                                                               className="form-control bg-white border-left-0 border-md"
                                                        />
                                                    </div>
                                                    <p><small><ErrorMessage name="password" className="text-danger"
                                                                            component="p"/></small></p>
                                                    <div className="input-group col-lg-6 mb-4">
                                                        <Field id="newPassword" type="password" name="newPassword"
                                                               placeholder="Mật Khẩu Mới"
                                                               className="form-control bg-white border-left-0 border-md"
                                                        />
                                                    </div>
                                                    <p><small><ErrorMessage name="newPassword" className="text-danger"
                                                                            component="p"/></small></p>
                                                    <div className="input-group col-lg-6 mb-4">
                                                        <Field id="againNewPassword" type="password"
                                                               name="againNewPassword"
                                                               placeholder="Nhập Lại Mật Khẩu"
                                                               className="form-control bg-white border-left-0 border-md"
                                                        />
                                                    </div>
                                                    <p><small><ErrorMessage name="againNewPassword"
                                                                            className="text-danger"
                                                                            component="p"/></small></p>
                                                    <div className="d-flex me-5 justify-content-center gap-3">
                                                        <button type="submit" className="btn btn-success">Cập nhật
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                {/*</div>*/}
                            </div>
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}