import "./SideBar.css";
import {NavLink, useNavigate} from "react-router-dom";
import ModalLogout from "../auth/ModalLogout";
import React, {useEffect, useState} from "react";
import authToken from "../../services/units/UserToken";
import * as employeeService from "../../services/employee/employeeService";


function Sidebar(){
    let role;
    let email;
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});
    console.log(authToken())
    if (!authToken()){
       navigate("/error")
    } else {
         role = authToken().roles[0].authority;
        email = authToken().sub;
    }

    useEffect(() => {
        if (email) {
            getInfoEmployee();
        }
    }, []);

    const getInfoEmployee = async () => {
        try {
            const res = await employeeService.getAllByEmployee(email);
            setEmployee(res.data);
        } catch (e) {
           console.log(e);
        }
    };

    return (
        role === "ROLE_ADMIN" ?
            <aside id="sidebar">
                <div className="h-100">
                    <div className="sidebar-logo" style={{textAlign:"center"}}>
                        <div className="user-img">
                            <img style={{height: "4rem", width: "4rem", borderRadius: "50%"}}
                                 src="https://a0.anyrgb.com/pngimg/16/486/user-profile-user-experience-user-interface-design-avatar-user-interface-ico-person-user-man-computer-software-thumbnail.png"
                                 alt=""/>
                        </div>
                        <div className="user-detail">
                            <div className="title">
                                Admin
                            </div>
                            <div className="name fw-bold">{employee.name}</div>
                        </div>
                    </div>
                    <ul className="sidebar-nav">
                        <li className="sidebar-header text-dark">
                            <div style={{fontSize: 20}}>
                                Vật Tư
                            </div>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="/product/create" className="sidebar-link text-dark">
                                <i className="fa-solid fa-list pe-2"></i>
                                Thêm mới vật tư
                            </NavLink>
                        </li>
                        <div style={{fontSize: 20, paddingLeft: "25px"}}>
                            Chức năng
                        </div>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed text-dark" data-bs-toggle="collapse"
                               data-bs-target="#pages"
                               aria-expanded="false" aria-controls="pages">
                                <i className="fa-regular fa-file-lines pe-2"></i>
                                Thông Tin
                            </a>
                            <ul id="pages" className="sidebar-dropdown collapse"
                                data-bs-parent="#sidebar">
                                <li className="sidebar-item ">
                                    <NavLink to="/employee" className="sidebar-link text-dark" >
                                        <div style={{fontSize: 14}} >
                                            Chỉnh Sửa Thông Tin
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="/change_pass" className="sidebar-link text-dark" >
                                        <div style={{fontSize: 14}}>
                                            Đổi Mật Khẩu
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="/register" className="sidebar-link text-dark">
                                <i className="fa-solid fa-list pe-2"></i>
                                Đăng Kí Nhân Viên
                            </NavLink>
                        </li>
                        <li className="sidebar-item" style={{paddingTop: "80%", paddingLeft: "12%"}}>
                            <NavLink role="button" className="sidebar-link text-dark">
                                <i className="fa-solid fa-list pe-2"></i>
                                <button className="btn btn-outline-secondary" data-bs-toggle="modal"
                                        data-bs-target="#logout">Đăng Xuất
                                </button>
                            </NavLink>
                        </li>
                        <ModalLogout/>
                    </ul>
                </div>
            </aside>
            : role === "ROLE_ACCOUNTANT" ?
                <aside id="sidebar">
                    <div className="h-100">
                        <div className="sidebar-logo" style={{textAlign:"center"}}>
                            <div className="user-img">
                                <img style={{height: "4rem", width: "4rem", borderRadius: "50%"}}
                                     src="https://a0.anyrgb.com/pngimg/16/486/user-profile-user-experience-user-interface-design-avatar-user-interface-ico-person-user-man-computer-software-thumbnail.png"
                                     alt=""/>
                            </div>
                            <div className="user-detail">
                                <div className="title">Kế toán</div>
                                <div className="name fw-bold">{employee.name}</div>
                            </div>
                        </div>
                        <ul className="sidebar-nav">
                            <div style={{fontSize: 20, paddingLeft: "25px"}}>
                                Chức năng
                            </div>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link collapsed text-dark" data-bs-toggle="collapse"
                                   data-bs-target="#pages"
                                   aria-expanded="false" aria-controls="pages">
                                    <i className="fa-regular fa-file-lines pe-2"></i>
                                    Thông Tin
                                </a>
                                <ul id="pages" className="sidebar-dropdown  collapse"
                                    data-bs-parent="#sidebar">
                                    <li className="sidebar-item ">
                                        <NavLink to="/employee" className="sidebar-link text-dark">
                                            <p style={{fontSize: 14}}>Chỉnh Sửa Thông Tin</p>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink to="/change_pass" className="sidebar-link text-dark">
                                            <p style={{fontSize: 14}}>Đổi Mật Khẩu</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="sidebar-item" style={{paddingTop: "80%", paddingLeft: "12%"}}>
                                <NavLink role="button" className="sidebar-link text-dark">
                                    <i className="fa-solid fa-list pe-2"></i>
                                    <button className="btn btn-outline-secondary" data-bs-toggle="modal"
                                            data-bs-target="#logout">Đăng Xuất
                                    </button>
                                </NavLink>
                            </li>
                            <ModalLogout/>
                        </ul>
                    </div>
                </aside>
                :
                <aside id="sidebar">
                    <div className="h-100">
                        <div className="sidebar-logo" style={{textAlign:"center"}}>
                            <div className="user-img">
                                <img style={{height: "4rem", width: "4rem", borderRadius: "50%"}}
                                     src="https://a0.anyrgb.com/pngimg/16/486/user-profile-user-experience-user-interface-design-avatar-user-interface-ico-person-user-man-computer-software-thumbnail.png"
                                     alt=""/>
                            </div>
                            <div className="user-detail">
                                <div className="title">Bán hàng</div>
                                <div className="name fw-bold">{employee.name}</div>
                            </div>
                        </div>
                        <ul className="sidebar-nav">
                        <div style={{fontSize: 20, paddingLeft: "25px"}}>
                                Chức năng
                            </div>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link collapsed text-dark" data-bs-toggle="collapse"
                                   data-bs-target="#pages"
                                   aria-expanded="false" aria-controls="pages">
                                    <i className="fa-regular fa-file-lines pe-2"></i>
                                    Thông Tin
                                </a>
                                <ul id="pages" className="sidebar-dropdown collapse"
                                    data-bs-parent="#sidebar">
                                    <li className="sidebar-item ">
                                        <NavLink to="/employee" className="sidebar-link text-dark">
                                            <p style={{fontSize: 14}}>Chỉnh Sửa Thông Tin</p>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink to="/change_pass" className="sidebar-link text-dark">
                                            <p style={{fontSize: 14}}>Đổi Mật Khẩu</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="sidebar-item" style={{paddingTop: "80%", paddingLeft: "12%"}}>
                                <NavLink role="button" className="sidebar-link text-dark">
                                    <i className="fa-solid fa-list pe-2"></i>
                                    <button className="btn btn-outline-secondary" data-bs-toggle="modal"
                                            data-bs-target="#logout">Đăng Xuất
                                    </button>
                                </NavLink>
                            </li>
                            <ModalLogout/>
                        </ul>
                    </div>
                </aside>
    )
}

export default Sidebar;