import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../state/Product/Action'
import { getOrderById } from '../../../state/Order/Action'
import { useLocation } from 'react-router-dom'
import { store } from '../../../state/store'
import { createPayment } from '../../../state/Payment/Action'
import OrderSumItem from './ordersumitem'

const Ordersummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order } = useSelector((store) => store.order)
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('order_id');
  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId,dispatch])

  useEffect(() => {
    // console.log("Fetched order:", order);
  }, [order]);

  const handleCheckout =()=>{
    dispatch(createPayment(orderId))
  }

  // console.log("order in order summary", order)
  return (
    <div>
      <div className='p-5 shadow-lg rounded-s-md border'>
        <AddressCard address={order?.shippingAddress} />
      </div>

      <div>

        <div className='lg:grid grid-cols-3 relative'>
          <div className='col-span-2'>
            {order?.orderItems.map((item, i) => (<OrderSumItem item={item} key={i} />))}
          </div>
          <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
            <div className='border'>
              <p className='uppercase font-bold opacity-60 pb-4'>Price details</p>
              <hr />
              <div className='space-y-3 font-semibold mb-10'>
                <div className='flex justify-between pt-3 text-black'>
                  <span>price</span>
                  <span>₹{order?.totalPrice}</span>
                </div>
                <div className='flex justify-between pt-3'>
                  <span>Discount</span>
                  <span className=' text-green-600'>-₹{order?.discounte}</span>
                </div>
                <div className='flex justify-between pt-3'>
                  <span>Delivery Charge</span>
                  <span className='text-green-600'>₹250</span>
                </div>
                <div className='flex justify-between pt-3 font-bold'>
                  <span>Total Amount</span>
                  <span className='text-green-600'>₹{order?.totalDiscountedPrice}</span>
                </div>
              </div>



            </div>

            <Button onClick={handleCheckout} variant="contained" className="w-full mt-5" sx={{ px: "2.5rem", py: "1rem", bgcolor: "#ca8a04" }}>
              CheckOut
            </Button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Ordersummary
