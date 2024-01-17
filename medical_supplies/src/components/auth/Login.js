import {ErrorMessage, Field, Formik, Form} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as authService from "../../services/auth/AuthService";
import Header from "../anHN/Header";
import Footer from "../anHN/Footer";

export default function Login() {

    const navigate = useNavigate();


    const initValues = {
        email: "",
        password: ""
    }
    const validateFormLogin = Yup.object({
        email: Yup.string()
            .required("Vui lòng nhập email."),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu.")
    });

    const handleSubmitFormLogin = async (values, {setFieldError}) => {
        try {
            const res = await authService.login(values);

            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate("/dashboard")
                toast.success("Đăng nhập thành công !");

            }
        } catch (e) {
            setFieldError("password", e.data);
            console.log(e);

        }
    }
    const jwtToken = JSON.parse(localStorage.getItem("user")).accessToken;

    const [, payloadBase64] = jwtToken.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    console.log(payload)

    return (
        <>
            <Header/>
            <div className="container pt-lg-5 mb-5">
                <div className="d-flex justify-content-center">

                    <div className="col-8">
                        <div className="form-control shadow rounded-0 p-4"
                             style={{backgroundImage: "url('/image/yte4.png')"}}>
                            <div className="text-center mt-1">
                                <h2>ĐĂNG NHẬP</h2>
                            </div>
                            <div className="row py-5 mt-2 align-items-center">

                                <div className="col-md-6 col-lg-6 pr-lg-5 mb-5 mb-md-0 mp"
                                     style={{textAlign: `center`}}>
                                    <img
                                        src="https://thuonghieusaigon.vn/uploads/shops/thumb/vina.gif"
                                        alt="img"
                                        className="img-fluid mb-3 d-none d-md-block rounded-5"/>
                                </div>

                                <div className="col-md-6 col-lg-6 ml-auto">
                                    <Formik initialValues={initValues}
                                            onSubmit={(values, {setFieldError}) => handleSubmitFormLogin(values, {setFieldError})}
                                            validationSchema={validateFormLogin}>
                                        <Form>
                                            <div className="row">
                                                <div className="input-group col-lg-6 mb-4">
                                                    <label htmlFor="email"
                                                           className="input-group-text bg-white px-4 border-md border-right-0">
                                                        <i className="fas fa-user"></i>
                                                    </label>
                                                    <Field id="email" type="text" name="email" placeholder="Email"
                                                           className="form-control bg-white border-left-0 border-md"/>
                                                </div>
                                                <ErrorMessage name="email" className="text-danger"
                                                              component="p"/>
                                                <div className="input-group col-lg-6 mb-4">
                                                    <label htmlFor="password"
                                                           className="input-group-text bg-white px-4 border-md border-right-0">
                                                        <i className="fas fa-map-marked-alt"></i>
                                                    </label>
                                                    <Field id="password" type="password" name="password"
                                                           placeholder="Mật khẩu"
                                                           className="form-control bg-white border-left-0 border-md"/>
                                                </div>
                                                <ErrorMessage name="password" className="text-danger"
                                                              component="p"/>
                                                <div className="d-flex align-items-center mb-4">
                                                    <div className="form-check">
                                                        <Field className="form-check-input" type="checkbox" value=""
                                                               id="form1Example3"
                                                               checked/>
                                                        <label className="form-check-label" htmlFor="form1Example3">
                                                            Ghi nhớ</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex me-5 justify-content-center gap-3">
                                                    <button type="submit" className="btn btn-success btn-sm w-100">
                                                        Đăng nhập
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
            <Footer/>
        </>
    )
}