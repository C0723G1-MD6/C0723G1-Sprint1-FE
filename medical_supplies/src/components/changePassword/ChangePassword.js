import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {changePassword} from "../../services/changePassword/ChangePasswordService";
import {Field, Formik} from "formik";
import Form from "antd/es/form";

export default function ChangePassword() {
    const [disableSubmit, setDisableSubmit] = useState(false);
    const navigate = useNavigate();
    const initValues = {
        password: "",
        newPassword: "",
        againNewPassword: ""
    }

    const validateFormatChangePassword = Yup.object({
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu."),
        newPassword: Yup.string()
            .required("Vui lòng nhập mật khẩu mới.")
            .min(8, "Mật khẩu mới phải trên 8 kí tự")
            .max(100, "Mật khẩu mới không được quá 100 kí tự"),
        againNewPassword: Yup.string()
            .required("Vui lòng nhập lại mật khẩu mới.")
            .oneOf([Yup.ref('newPassword'), null], 'Nhập lại mật khẩu mới không khớp.')
    });
    const handleSubmitFormChangePassword = async (values, {setErrors}) => {
        try {
            setDisableSubmit(true);
            await changePassword(values);
            localStorage.removeItem("user");
            navigate("/")
            toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại để tiếp tục !")
        } catch (e) {
            setDisableSubmit(false);
            setErrors(e.data);
        }
    };
    return (
        <>
            <section id="change-password">
                <div className="row my-5">
                    <div className="col-lg-12 pt-lg-5">
                        <Formik initialValues={initValues} onSubmit={(values, {setErrors}) =>
                            handleSubmitFormChangePassword(values, {setErrors})}
                                validationSchema={validateFormatChangePassword}>
                            <div className="d-flex justify-content-center">
                                <div className="col-7">
                                    <div className="form-control shadow rounded-0 p-4"
                                         style={{backgroundImage: "url('../img/yte4.png')"}}>
                                        <h2 className="text-secondary fw-bolder text-center" style={{paddingTop:"3%"}}>
                                            Đổi Mật Khẩu
                                        </h2>
                                        <div className="row py-5 mt-4 align-items-center">
                                           {/*For Demo Purpose */}
                                            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0" style={{textAlign: "center"}}>
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTz9mo8UybQ2Uf6MdgKs-8nz-OM7SS9nKsWRArR-bcdvRvNUTlLHmIksU_onSdvZQmtcY&usqp=CAU"
                                                    alt="img"
                                                    className="img-fluid mb-3 d-none d-md-block rounded-5"/>
                                            </div>

                                            {/*// <!--Form -->*/}
                                            <div className="col-md-7 col-lg-6 ml-auto">
                                                <Form action="#" className="trungnd-form">
                                                    <div className="row">
                                                        {/*// <!-- Old Password -->*/}
                                                        <div className="input-group col-lg-6 mb-4">
                                                            <Field id="OldPassword" type="password" name="OldPassword"
                                                                   placeholder="Nhập Mật Khẩu Cũ"
                                                                   className="form-control bg-white border-left-0 border-md"
                                                                   required/>
                                                            {/*// <!--                                    <label for="OldPassword">Mật Khẩu Cũ <span style="color: red">*</span></label>-->*/}
                                                        </div>
                                                        <div className="input-group col-lg-6 mb-4">
                                                            <Field id="NewPassword" type="password" name="NewPassword"
                                                                   placeholder="Mật Khẩu Mới"
                                                                   className="form-control bg-white border-left-0 border-md"
                                                                   required/>
                                                        </div>
                                                        <div className="input-group col-lg-6 mb-4">
                                                            <Field id="RetypePassword" type="password"
                                                                   name="RetypePassword"
                                                                   placeholder="Nhập Lại Mật Khẩu"
                                                                   className="form-control bg-white border-left-0 border-md"
                                                                   required/>
                                                        </div>
                                                        <div className="d-flex me-5 justify-content-center gap-3">
                                                            <button disabled={disableSubmit} type="submit" className="btn btn-success btn-sm">Cập nhật</button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    )

}