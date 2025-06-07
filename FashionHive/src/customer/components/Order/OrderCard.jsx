import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    // console.log("orders in ordercard ", order);
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/account/order/${order?._id}`)} className='p-5 shadow-lg hover:shadow-2xl border ml-5'>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid size={{ xs: 12,md:6 }}>
                    <div className='flex'>
                        <div className="flex items-center">
                            {order?.orderItems?.slice(0, 2).map((item, idx) => (
                                <img
                                    key={idx}
                                    src={item?.product?.imageUrl}
                                    alt={item?.product?.title}
                                    className={`w-10 h-10 rounded-full object-cover border-2 border-white ${idx !== 0 ? '-ml-3' : ''
                                        }`}
                                    style={{
                                        objectPosition: 'top center',
                                    }}
                                />
                            ))}

                            {order?.orderItems?.length > 2 && (
                                <div
                                    className="-ml-3 w-10 h-10 rounded-full bg-gray-200 text-gray-600 border-2 border-white flex items-center justify-center text-sm font-semibold"
                                >
                                    +{order?.orderItems?.length - 2}
                                </div>
                            )}
                        </div>


                        <div className='ml-5 space-y-2'>
                            <p className='font-semibold'>
                                {order?.orderItems?.map(item => (
                                    <span key={item?._id}>
                                        {item?.product?.title}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </Grid>

                <Grid size={{ xs: 2 }}>
                    <p>₹{order.totalDiscountedPrice}</p>

                </Grid>

                <Grid size={{ xs: 4 }}>
                    <div className={"invisible md:visible"}>
                        <p className=' text-sm'>
                            <AdjustIcon sx={{ width: "15px", height: "15px" }} className='text-green-600 mr-2' />
                            <span>Created on : </span>
                            {order.createdAt.slice(0, 10)}
                        </p>
                        <p className='text-xs'>
                            Your Item Has Been {order.orderStatus}
                        </p>

                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default OrderCard