import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Button, Grid } from '@mui/material'
import { yellow } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../state/Order/Action'
import { useNavigate } from 'react-router-dom'
import { createPayment } from '../../../state/Payment/Action'



const OrderDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store.order)

    const statusSteps = {
        PENDING: 0,
        PLACED: 1,
        CONFIRMED: 2,
        SHIPPED: 3,
        OUT_FOR_DELIVERY: 4,
        DELIVERED: 5,
    };
    const activeStep = statusSteps[order?.orderStatus] || 0;
    
    
    
    
    
    useEffect(() => {
        // console.log("Fetched order:", order);
    }, [order]);
    
    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const orderId = pathParts[pathParts.length - 1];
        
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [dispatch]);

      const handleCheckout =()=>{
        dispatch(createPayment(order?._id))
      }
    
    // console.log("order in order details", order)
    return (

        
        <div className='px-5 lg:px-20'>

            {order?.orderStatus === "PENDING" && (
        <div className="my-5 p-5 border shadow-md rounded-md bg-yellow-50">
            <p className="text-lg font-semibold mb-3 text-yellow-800">Your payment is pending.</p>
            <Button
                variant="contained"
                color="warning"
                 onClick={handleCheckout}
            >
                Complete Payment
            </Button>
        </div>
    )}
            <div>
                <h1 className='font-bold text-xl py-7 text-start'>Delivery Address</h1>
                <div className='p-5 shadow-lg rounded-s-md border'>
                    <AddressCard address={order?.shippingAddress} />
                </div>
            </div>
            <div className='py-20'>
                <OrderTracker activeStep={activeStep} />
            </div>

            <Grid container className='space-y-5'>


                {order?.orderItems.map((item) =>

                    <Grid key={item._id} size={{ xs: 12 }} container className="shadow-xl rounded-md p-5 border" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Grid size={{ xs: 12 , md: 6 }}>
                            <div className='flex items-center space-x-4'>
                                <div>
                                    <img className="w-[5rem] h-[5rem] object-cover object-top" src={item.product.imageUrl} alt="" />
                                </div>
                                <div className='space-y-2 ml-5 text-start'>
                                    <p className='font-semibold'>
                                        {item.product.title}
                                    </p>
                                    <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                        <span>
                                            Color : {item.product.color}
                                        </span>
                                        <span>
                                            size : {item.size}
                                        </span>
                                    </p>
                                    <p>Seller : {item.product.brand}</p>
                                    <p>₹{item.product.discountedPrice}</p>
                                </div>
                            </div>
                        </Grid>

                        {activeStep === 5 && (
                            <Grid size={{ xs: 12 , md: 6 }} sx={{ textAlign: { xs: 'start', md: 'end' } }}>
                                <Box sx={{ color: yellow[900], display: 'flex', alignItems: 'center', justifyContent: { xs: 'start', md: 'end' } }}>
                                    <StarBorderIcon sx={{ fontSize: "2rem" }} className='px-2 ' />
                                    <Button sx={{ color: "#ca8a04" }} onClick={()=>{navigate(`/product/${item.product._id}/review`)}}>
                                        Rate & Review Product
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                )}

            </Grid>

        </div>
    )
}

export default OrderDetails
