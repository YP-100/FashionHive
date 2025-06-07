import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../../state/Order/Action'
import { updatePayment } from '../../../state/Payment/Action'
import { Alert, AlertTitle, Grid } from '@mui/material'
import OrderTracker from '../Order/OrderTracker'
import AddressCard from '../AddressCard/AddressCard'

const PaymentSuccess = () => {
    // const [referenceId, setReferenceId] = useState()
const [paymentStatus, setPaymentStatus] = useState()
const [paymentId, setPaymentId] = useState()


const { orderId } = useParams()
const { order } = useSelector(store => store.order)

const dispatch = useDispatch()

// console.log("order id in payment success", order.order)

useEffect(()=>{
    const urlParam = new URLSearchParams(window.location.search)

    setPaymentId(urlParam.get('razorpay_payment_id'))
    setPaymentStatus(urlParam.get('razorpay_payment_link_status'))
},[])

useEffect(()=>{
    if(paymentId){
        const data ={orderId,paymentId}
        dispatch(getOrderById(orderId));
        dispatch(updatePayment(data));
    }
},[orderId,paymentId,dispatch])

  return (
    <div className='px-2 lg:px-36'>
        <div className='flex flex-col justify-center items-center'>
            <Alert 
            variant='filled'
            severity='success'
            sx={{
                mb:6,
                width:"fit-content",
            }}
            >
                <AlertTitle>Payment Success</AlertTitle>
                Your Order has been Placed !!!
            </Alert>

        </div>
        
        <OrderTracker activeStep={1}/>
        <Grid container className='space-y-5 py-5 pt-20'>
            {
                order?.orderItems.map((item)=><Grid key={item._id} size={{xs:12}} container className='shadow-xl rounded-md p-5 border' sx={{alignItems:"center",justifyContent:"space-between"}}>
                    <Grid size={{xs:12 ,md:6}}>
                        <div className='flex items-center'>
                            <img className='w-[5rem] h-[5rem] object-cover object-top' src={item?.product?.imageUrl} alt='product_image' />
                            <div className='ml-5 space-y-1'>
                                <p>
                                    {item.product.title}
                                </p>
                                <div className='opacity-50 text-xs font-semibold space-x-2'>
                                    <span>Size : {item.size}</span>
                                </div>
                                <p>Seller : {item.product.brand}</p>
                                <p>₹ {item.discountedPrice}</p>
                            </div>

                        </div>
                    </Grid>
                    <Grid size={{xs:12 ,md:6}}>
                        <AddressCard address={order?.shippingAddress} />
                    </Grid>
                </Grid>)
            }
        </Grid>
    </div>
  )
}

export default PaymentSuccess