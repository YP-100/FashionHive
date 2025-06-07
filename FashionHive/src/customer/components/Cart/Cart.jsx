import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../../state/Cart/Action';
import { useDispatch, useSelector } from 'react-redux';
// import { store } from '../../../state/store';


const Cart = () => {
  const navigate = useNavigate();
  const {cart} = useSelector((store) =>store.cart)
  const { auth } = useSelector((store) => store.auth);


  const dispatch = useDispatch();

  const handleCheckout = () => {
    navigate('/checkout?step=2')
  }


  useEffect(() => {
    dispatch(getCart());
  }, [auth?.jwt]); 

  const calculateDeliveryCharge = () => {
    if (cart?.totalDiscountedPrice === 0) {
      return 0;
    } else if (cart?.totalDiscountedPrice > 0 && cart?.totalDiscountedPrice < 2000) {
      return 250;
    } else {
      return 0;
    }
  };

  const deliveryCharge = calculateDeliveryCharge();

  // console.log("auth in cart", auth);


  return (
    <div>

      <div className='lg:grid grid-cols-3 lg:px-16 relative'>
        <div className='col-span-2'>
         {cart?.cartItems.map((item) => <CartItem item={item} key={item._id}/>)}
        </div>
        <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
          <div className='border'>
            <p className='uppercase font-bold opacity-60 pb-4'>Price details</p>
            <hr />
            <div className='space-y-3 font-semibold mb-10'>
              <div className='flex justify-between pt-3 text-black'>
                <span>price</span>
                <span>₹{cart?.totalPrice}</span>
              </div>
              <div className='flex justify-between pt-3'>
                <span>Discount</span>
                <span className=' text-green-600'>- ₹ {cart?.discounte}</span>
              </div>
              <div className='flex justify-between pt-3'>
                <span>Delivery Charge</span>
                <span className='text-green-600'>₹{deliveryCharge}</span>
              </div>
              <div className='flex justify-between pt-3'>
                <span>Total Price</span>
                <span className='text-green-600'>₹{cart?.totalDiscountedPrice}</span>
              </div>
              <div className='flex justify-between pt-3 font-bold'>
                <span>Total Amount</span>
                <span className='text-green-600'>₹{cart?.totalDiscountedPrice + deliveryCharge}</span>
              </div>
            </div>



          </div>

          <Button onClick={handleCheckout} variant="contained" className="w-full mt-5" sx={{ px: "2.5rem", py: "1rem", bgcolor: "#ca8a04" }}>
            CheckOut
          </Button>

        </div>

      </div>

    </div>
  )
}

export default Cart
