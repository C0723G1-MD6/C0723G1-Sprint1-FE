import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {editEmployeeService, getEmployeeByIdService} from "../../services/employee/employeeService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function EditEmployee() {
    const [employee, setEmployee] = useState();
    const navigate = useNavigate();
    const {id} = useParams();


    const getEmployee = async (id) => {
        try {
            if (id) {
                const res = await getEmployeeByIdService(id)
                setEmployee({...res, gender: res.gender ? 1 : 0})
            }
        } catch (e) {
            alert("error get Employee")
        }
    }
    const editEmployee = async (data, setErrors) => {
        console.log("Ok")
        try {
            console.log(data)
            const res = await editEmployeeService(data)
            console.log(res)
            if (res.status === 200) {
                navigate("/employee")
                toast.success("Edit successfully")
            } else if (res.status === 201) {
                toast("edit failed")
                setErrors(res.data)
            }
        } catch (e) {
            alert("Error edit")
        }
    }
    useEffect(() => {
        id && getEmployee(id)
    }, [id]);
    if (!employee) {
        return null;
    }
    // const handleGenderChange = (event) => {
    //     const value = event.target.value
    //     setGender(value === true)
    // }
    const dd = new Date();
    const date18 = `${dd.getFullYear() - 18}-${dd.getMonth() + 1}-${dd.getDate()}`;
    const date65 = `${dd.getFullYear() - 65}-${dd.getMonth() + 1}-${dd.getDate()}`;

    const employeeValidate = {
        name: Yup.string()
            .required("Vui lòng nhập tên")
            .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/, "Chứa kí tự đặc biệt, hoặc số."),
        birthday: Yup.date()
            .required("vui lòng nhập tuổi.")
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
            <Formik initialValues={employee} onSubmit={(values, {setErrors}) => {
                const empObj = {...values, gender: +employee.gender === 1}
                editEmployee(empObj, setErrors)
            }} validationSchema={Yup.object(employeeValidate)}>
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
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTz9mo8UybQ2Uf6MdgKs-8nz-OM7SS9nKsWRArR-bcdvRvNUTlLHmIksU_onSdvZQmtcY&usqp=CAU"
                                                        alt="img"
                                                        className="img-fluid mb-3 d-none d-md-block rounded-0"
                                                        style={{paddingLeft: "18%"}}/>
                                                    <button className="btn btn-success btn-sm">Thay Đổi</button>
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
                                                                                    component="div"/></small></p>
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
                                                                                    component="div"/></small></p>
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
                                                                    <label className="form-check-label" htmlFor="nam">
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
                                                                    <label className="form-check-label" htmlFor="nữ">
                                                                        Nữ
                                                                    </label>
                                                                </div>
                                                            </div>


                                                            <p><small><ErrorMessage className="text text-danger"
                                                                                    name="gender"
                                                                                    component="div"/></small></p>
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
                                                                                    component="div"/></small></p>
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
                                                                                    component="div"/></small></p>
                                                        </div>
                                                        <div className="d-flex me-5 justify-content-center gap-3">
                                                            <NavLink to={"../change_pass"}>
                                                                <button className="btn btn-secondary btn-sm"><a
                                                                >Hủy</a>
                                                                </button>
                                                            </NavLink>
                                                            <button type='submit' className="btn btn-success btn-sm">Cập
                                                                nhật
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

        </>
    )
}