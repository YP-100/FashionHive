import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';

import { getOrderById } from '../../../state/Order/Action';
import { getUser } from '../../../state/Auth/Action';

const orderStatus = [
    { label: "Payment Pending", value: "PENDING" },
    { label: "Placed", value: "PLACED" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

const Order = () => {
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store.order);
    const { user } = useSelector((store) => store.auth);
    const [realOrder, setRealOrder] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [dispatch]);

    useEffect(() => {
        if (user?.orders?.length > 0) {
            user.orders.forEach((orderId) => {
                dispatch(getOrderById(orderId));
            });
        }
    }, [dispatch, user?.orders]);

    useEffect(() => {
        if (order && order._id) {
            setRealOrder((prevOrders) => {
                const alreadyExists = prevOrders.some((o) => o._id === order._id);
                if (!alreadyExists) {
                    return [...prevOrders, order];
                }
                return prevOrders;
            });
        }
    }, [order]);

    const handleStatusChange = (statusValue) => {
        setSelectedStatuses(prev => {
            if (prev.includes(statusValue)) {
                return prev.filter(item => item !== statusValue);
            } else {
                return [...prev, statusValue];
            }
        });
    };

    const filteredOrders = selectedStatuses.length > 0
        ? realOrder.filter(order => selectedStatuses.includes(order.orderStatus))
        : realOrder;

    return (
        <div className='px-5 lg:px-20'>
            <Grid container spacing={2}>
                {/* Filter Section */}
                <Grid size={{ xs: 12, md: 3 }} className="lg:block sm:block mx-auto">
                    <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className='font-bold text-lg'>Filter</h1>
                        <div className='space-y-4 mt-10'>
                            <h1 className='font-semibold'>ORDER STATUS</h1>
                            {orderStatus.map((option, index) => (
                                <div key={index} className='flex items-center'>
                                    <input
                                        id={`status-${option.value}`}
                                        type="checkbox"
                                        checked={selectedStatuses.includes(option.value)}
                                        onChange={() => handleStatusChange(option.value)}
                                        className='h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500'
                                    />
                                    <label className='ml-3 text-sm text-gray-600' htmlFor={`status-${option.value}`}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Orders Section */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <div className='space-y-5'>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((item) => (
                                <OrderCard order={item} key={item._id} />
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">
                                    {selectedStatuses.length > 0 
                                        ? "No orders match the selected filters"
                                        : "You haven't placed any orders yet"}
                                </p>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Order;
















// filters not working
// import React, { useEffect } from 'react';
// import { Grid } from '@mui/material';
// import OrderCard from './OrderCard';
// import { useDispatch, useSelector } from 'react-redux';

// import { getOrderById } from '../../../state/Order/Action';

// import { getUser } from '../../../state/Auth/Action';


// const orderStatus = [
//     {lable: "Payment Pending", value: "PENDING"},
//     { lable: "Placed", value: "PLACED" },
//     { lable: "Confirmed", value: "CONFRIMED" },
//     { lable: "Delivered", value: "DELIVERED" },
//     { lable: "Cancelled", value: "CANCLLED" },
// ];

// const Order = () => {
//     const dispatch = useDispatch();

//     const { order } = useSelector((store) => store.order);
//     const { user } = useSelector((store) => store.auth);

//     useEffect(() => {
//         const jwt = localStorage.getItem("jwt");
//         if (jwt) {
//             dispatch(getUser(jwt));
//         }
//     }, [dispatch]);


//     // console.log("user in order", user);

//     // console.log("orders in order", user?.orders);

//     useEffect(() => {
//         if (user?.orders?.length > 0) {
//             user.orders.forEach((orderId) => {
//                 dispatch(getOrderById(orderId));
//             });
//         }
//     }, [dispatch, user?.orders]);

//     const [realorder, setRealorder] = React.useState([]);

//     useEffect(() => {
//         if (order && order._id) {
//             setRealorder((prevOrders) => {
//                 const alreadyExists = prevOrders.some((o) => o._id === order._id);
//                 if (!alreadyExists) {
//                     return [...prevOrders, order];
//                 }
//                 return prevOrders;
//             });
//         }
//     }, [order]);


//     // console.log("Fetched order:", order);
//     // console.log("realorder", realorder);

//     return (
//         <div className='px-5 lg:px-20'>
//             <Grid container spacing={2}>
//                 {/* Filter Section */}
//                 {/* item xs={12} sm={12} lg={3} */}
//                 <Grid size={{ md: 3 }} className="lg:block sm:block mx-auto">
//                     <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
//                         <h1 className='font-bold text-lg'>Filter</h1>
//                         <div className='space-y-4 mt-10'>
//                             <h1 className='font-semibold'>ORDER STATUS</h1>
//                             {orderStatus.map((option, index) => (
//                                 <div key={index} className='flex items-center'>
//                                     <input
//                                         defaultValue={option.value}
//                                         type="checkbox"
//                                         className='h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500'
//                                     />
//                                     <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
//                                         {option.lable}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </Grid>

//                 {/* Orders Section */}
//                 <Grid size={{ xs: 12, md: 9 }}>
//                     <div className='space-y-5'>
//                         {realorder.map((item) => (
//                             <OrderCard order={item} key={item._id} />
//                         ))}
//                     </div>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };

// export default Order;