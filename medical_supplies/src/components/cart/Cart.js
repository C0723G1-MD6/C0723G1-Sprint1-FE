import Footer from "../anHN/Footer";
import Header from "../anHN/Header";
import {useEffect, useState} from "react";
import Pay from "./Pay";

export default function Cart({setShowCart, cart, setCart}) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPay, setShowPay] = useState(false);
    const [list, setList] = useState([]);


    // tim san pham va thay doi so luong
    const changeQuantity = (p, quantity) => {
        const i = cart.indexOf(p);
        const arr = [...cart];
        arr[i].amount += quantity;
        if (arr[i].amount === 0) {
            arr[i].amount = 1
        } else if (arr[i].amount > p.quantity) {
            arr[i].amount = p.quantity;
        }
        setCart([...arr]);
    }
    // xoa san pham
    const removeProduct = (product) => {
        const arr = cart.filter(p => p.id !== product.id);
        setCart([...arr])
    }

    // tính tong tien
    const getTotalPrice = () => {
        let total = 0;
        cart.map(item => {
            total += item.price * item.amount;
        });

        setTotalPrice(total);
    }
    useEffect(() => {
        getTotalPrice();
    });


    const onCloseHandler = () => {
        setShowCart(false);
    }
    const onShowPayHandler = () => {
        setShowPay(true);
    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


    return (
        <>
            {
                !showPay ?
                    (
                        <>
                            <div className="container">
                                <h2 className="text-center mt-2 mb-4">GIỎ HÀNG CỦA BẠN</h2>
                                <table className="table table-hover">
                                    <thead className="">
                                    <tr className="text-center">
                                        <th>SẢN PHẨM</th>
                                        <th>GIÁ</th>
                                        <th>SỐ LƯỢNG</th>
                                        <th>TỔNG TIỀN</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody className=" text-center fw-bold align-text-top">
                                    {
                                        cart.map(product => (
                                            <tr key={product.id}>
                                                <td className="text-start">
                                                    <img src={product.mainAvatar} width="100" height="100"
                                                         className="me-2"/>
                                                    {product.name} (<span
                                                    className="text-danger">{product.quantity}</span>)
                                                </td>
                                                <td>
                                                    {VND.format(product.price)}
                                                </td>

                                                <td>
                                                    <button onClick={() => changeQuantity(product, -1)}
                                                            className="btn "><i
                                                        className="fas fa-minus"></i></button>
                                                    <input type="text" className="form-control-sm  fw-bold text-center"
                                                           style={{width: "70px"}}
                                                           value={product.amount}/>
                                                    <button onClick={() => changeQuantity(product, 1)} className="btn">
                                                        <i
                                                            className="fas fa-plus"></i></button>
                                                </td>
                                                <td>
                                                    {VND.format(product.price * product.amount)}
                                                </td>
                                                <td>
                                                    <button data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal"
                                                            className="btn btn-danger"><i
                                                        className="fas fa-trash-alt"></i></button>
                                                    <div>
                                                        <div className="modal fade" id="exampleModal" tabIndex="-1"
                                                             aria-labelledby="exampleModalLabel"
                                                             aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title fs-5"
                                                                            id="exampleModalLabel">Xác nhận xóa</h1>
                                                                        <button type="button" className="btn-close"
                                                                                data-bs-dismiss="modal"
                                                                                aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        Bạn có chắc chắn muốn xóa <span
                                                                        className="text-primary">{product.name}</span> ra
                                                                        khỏi giỏ hàng không?
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button"
                                                                                className="btn btn-secondary"
                                                                                data-bs-dismiss="modal">Không
                                                                        </button>
                                                                        <button onClick={() => removeProduct(product)}
                                                                                type="button"
                                                                                className="btn btn-danger"
                                                                                data-bs-dismiss="modal">Có
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                    </tbody>
                                </table>
                                <div>
                                    <h2 className="">Tiền cần thanh toán: {VND.format(totalPrice)}</h2>
                                </div>
                                <div className="row mt 5 mb-3">
                                    <div className="col-6 d-flex justify-content-end">
                                        <button className="btn btn-secondary me-2" onClick={onCloseHandler}> Trở về
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button onClick={onShowPayHandler}
                                                className="btn btn-success ms-2 text-light ">Thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </>
                    ) :
                    (<Pay setShowPay={setShowPay} cart={cart} setCart={setCart} totalPrice={totalPrice}/>)
            }
        </>

    )
}