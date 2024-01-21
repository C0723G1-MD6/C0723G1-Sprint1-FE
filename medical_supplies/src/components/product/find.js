// import {createProduct} from "../../services/serviceProduct/ServiceProduct";
// import Swal from "sweetalert2";
//
// checkProduct(values);
// console.log(checkProduct(values));
// console.log(values);
// if (checkProduct(values) == true){
//     values = {
//         ...values,
//         mainAvatar: urlImages.toString(),
//
//     };
//     await createProduct(values).then(() => {
//             Swal.fire({
//                 title: "Success",
//                 text: 'The Prodoct has been edited successfully',
//                 icon: 'success',
//                 timer: 2000
//             })
//         },
//         navigate("/dashboard")
//     )
//         .catch(() => {
//             navigate(`/product/create`);
//         });
//     await navigate("/dashboard");
// }else {
//     setMessage("Tên vật tư đã bị trùng lặp xin vui lòng nhập tên khác")
// }