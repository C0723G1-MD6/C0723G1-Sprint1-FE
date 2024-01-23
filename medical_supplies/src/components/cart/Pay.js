import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import * as payService from "../../services/pay/PayService";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import authToken from "../../services/units/UserToken";
import * as customerService from "../../services/customer/CustomerService";
import {toast} from "react-toastify";

export default function Pay({setShowPay, cart, setCart, totalPrice}) {
    const REGEX = /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/;
    let email;
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({});
    const [orderDetails, setOrderDetails] = useState([])

    if (!authToken()) {
        navigate("/error")
    } else {
        email = authToken().sub;
    }


    useEffect(() => {
        if (email) {
            getInfoCustomer();
        }
    }, []);

    const getInfoCustomer = async () => {
        try {
            const res = await customerService.getByCustomer(email);
            setCustomer(res.data);
        } catch (e) {
            throw e.response;
        }
    };
    const onCloseHandler = () => {
        setShowPay(false);
    }
    const initValues = {
        totalPrice: totalPrice
    }


    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const handleOrderDetail = (cart) => {
        return {
            id: cart.id,
            price: cart.price,
            amount: cart.amount,
        }
    }
    const handleOrderDetails = () => {
       return  cart.map(item => {
           return handleOrderDetail(item);
       })
    }
    console.log(customer)

    // Thanh toan VNP
    const handlerSubmitForPay = async (value) => {
        let order = JSON.parse(localStorage.getItem('order'));
        if (order) {
            localStorage.removeItem('order');
        }

        if (cart.length > 0) {
            order = {idCustomer: customer.id, list: handleOrderDetails()}
            localStorage.setItem('order', JSON.stringify(order));
            try {
                const url = await payService.pay(totalPrice * 1);
                window.location.href = url;
            } catch (e) {
                throw e.response;

            }
        } else {
            navigate("/dashboard-customer")
            toast.warning("Bạn chưa có sản phẩm nào.");
        }
        console.log(order)
    }


    return (
        <>
            <div className="container">
                <section id="check-out">
                    <h2 className="text-center">Thông Tin Khách Hàng</h2>
                    <div className="row fw-bold">
                        <div className="col-md-1 col-lg-1 mt-3"></div>
                        <div className="col-12 col-md-4 col-lg-4  mt-3">Họ và tên:</div>
                        <div className="col-12 col-md-6 col-lg-6  mt-3">{customer.name}</div>
                        <div className="col-md-1 col-lg-1  mt-3"></div>

                        <div className="col-md-1 col-lg-1  mt-3"></div>
                        <div className="col-12 col-md-4 col-lg-4  mt-3">Email:</div>
                        <div className="col-12 col-md-6 col-lg-6  mt-3">{email}</div>
                        <div className="col-md-1 col-lg-1  mt-3"></div>

                        <div className="col-md-1 col-lg-1  mt-3"></div>
                        <div className="col-12 col-md-4 col-lg-4  mt-3">Số điện thoại:</div>
                        <div className="col-12 col-md-6 col-lg-6  mt-3">{customer.phone}</div>
                        <div className="col-md-1 col-lg-1  mt-3"></div>

                        <div className="col-md-1 col-lg-1  mt-3"></div>
                        <div className="col-12 col-md-4 col-lg-4  mt-3">Địa chỉ::</div>
                        <div className="col-12 col-md-6 col-lg-6  mt-3">{customer.address}</div>
                        <div className="col-md-1 col-lg-1  mt-3"></div>

                        <div className="col-md-1 col-lg-1  mt-3"></div>
                        <div className="col-12 col-md-4 col-lg-4  mt-3">Tổng tiền:</div>
                        <div className="col-12 col-md-6 col-lg-6  mt-3">{VND.format(totalPrice)}</div>
                        <div className="col-md-1 col-lg-1  mt-3"></div>
                    </div>

                    <div className="row my-4">
                        <div className="col-md-1 col-lg-1"></div>
                        <div className="col-md-11 col-lg-11">
                            <h5>Phương thức thanh toán</h5>
                            <div>
                                <p>Thanh toán bằng VNPay</p>
                            </div>
                        </div>
                    </div>
                    <Formik initialValues={initValues}
                            onSubmit={values => handlerSubmitForPay(values)}
                    >
                        <Form>
                            <div className="row mt-3 mb-3">
                                <div className="col-6 d-flex justify-content-end">
                                    <button onClick={onCloseHandler} className="btn btn-secondary me-2">Trở
                                        về
                                    </button>
                                </div>


                                <div className="col-6">
                                    <button type="submit" className="btn btn-success ms-2">Tiếp tục</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </section>
            </div>
        </>
    )
}