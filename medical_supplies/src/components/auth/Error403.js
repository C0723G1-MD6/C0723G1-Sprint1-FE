import {NavLink} from "react-router-dom";


export default function Error403 (){
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">403</h1>
                    <p className="fs-3"><span className="text-danger">Cảnh báo!</span></p>
                    <p className="lead">
                        Bạn không có quyền sử dụng chức năng này!
                    </p>
                    <NavLink to="/" className="btn btn-outline-primary rounded-0">Quay lại trang chủ</NavLink>
                </div>
            </div>
        </>
    )
}
