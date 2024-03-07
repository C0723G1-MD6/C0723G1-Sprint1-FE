import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import * as orderService from "../../services/pay/OrderService"
import {useDispatch} from "react-redux";


function SuccessPay() {
    const order = JSON.parse(localStorage.getItem('order'));
    const [searchParams] = useSearchParams();
    const status = searchParams.get("vnp_ResponseCode");
    const navigate=useNavigate();

    console.log(order)

    const transaction=async ()=>{
        if(status==="00"){
           const res = await orderService.saveOrder(order);
            toast.success("Thanh toán thành công");
            localStorage.removeItem('order');
            navigate("/dashboard-customer");
        }  else {
            toast.error("Thanh toán thất bại");
            navigate("/dashboard-customer");
        }
    }
    useEffect(()=>{
        transaction();
    },[])

    return (
        <div>
        </div>
    );
}

export default SuccessPay;