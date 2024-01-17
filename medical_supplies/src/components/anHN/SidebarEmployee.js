import {NavLink} from "react-router-dom";
import "./SideBar.css";



function SidebarEmployee() {

    return (
        <aside id="sidebar">
            <div className="h-100">
                <div className="sidebar-logo">
                    <div className="user-img">
                        <img style={{height: "4rem",width: "4rem",borderRadius: "50%"}}
                             src="https://a0.anyrgb.com/pngimg/16/486/user-profile-user-experience-user-interface-design-avatar-user-interface-ico-person-user-man-computer-software-thumbnail.png"
                             alt=""/>
                    </div>
                    <div className="user-detail">
                        <div className="title">Quản Lý</div>
                        <div className="name">Nguyễn Văn A</div>

                    </div>
                </div>
                <ul className="sidebar-nav">
                    <div style={{fontSize:20, paddingLeft:"25px"}}>
                        Chức năng
                    </div>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed text-dark" data-bs-toggle="collapse"
                           data-bs-target="#pages"
                           aria-expanded="false" aria-controls="pages">
                            <i className="fa-regular fa-file-lines pe-2"></i>
                            Thông Tin
                        </a>
                        <ul id="pages" className="sidebar-dropdown list-unstyled collapse"
                            data-bs-parent="#sidebar">
                            <li className="sidebar-item ">
                                <NavLink to="/employee/:id" className="sidebar-link text-dark">Chỉnh
                                    Sửa Thông Tin</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/change_pass" className="sidebar-link text-dark">Đổi
                                    Mật Khẩu</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item" style={{paddingTop: "80%",paddingLeft: "12%"}}>
                        <a href="#" className="sidebar-link text-dark">
                            <i className="fa-solid fa-list pe-2"></i>
                            <button className="btn btn-outline-secondary">Đăng Xuất</button>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

    )
}

export default SidebarEmployee;