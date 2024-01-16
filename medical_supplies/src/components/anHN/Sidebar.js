import "./SideBar.css";


function Sidebar(){


    return (
        <div className="container-fluid wrapper">

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
                        <li className="sidebar-header text-dark">
                            Vật Tư
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link text-dark">
                                <i className="fa-solid fa-list pe-2"></i>
                                Thêm Vật Tư
                            </a>
                        </li>
                        <li className="sidebar-header text-dark">
                            Chức Năng
                        </li>
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
                                    <a href="#" className="sidebar-link text-dark">Chỉnh
                                        Sửa Thông Tin</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link text-dark">Đổi
                                        Mật Khẩu</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link text-dark">
                                <i className="fa-solid fa-list pe-2"></i>
                                Đăng Kí Nhân Viên
                            </a>
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

            <div className="main">
                <nav className="navbar navbar-expand px-3 border-bottom">
                    <button className="btn btn-sm" type="button" data-bs-theme="dark">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <main className="content px-3 py-2">
                    <div className="container-fluid">

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Sidebar;