import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/Pages/HomePage/HomePage'
import Cart from '../customer/components/Cart/Cart'
import Navigation from '../customer/components/Navigation/Navigation'
import Footer from '../customer/components/Footer/Footer'
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import Checkout from '../customer/components/Checkout/Checkout'
import Order from '../customer/components/Order/Order'
import OrderDetails from '../customer/components/Order/OrderDetails'
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess'
import Profile from '../customer/components/Profile/Profile'
import ReviewCard from '../customer/components/Review/reviewCard.jsx'
import TitleResults from '../customer/components/SearchTitle/TitleResults.jsx'
// import ForgotPasswordForm from '../customer/Auth/ForgotPasswordForm.jsx'
// import ResetPasswordForm from '../customer/Auth/ResetPasswordForm.jsx'
import FeedbackForm from '../customer/components/FeedBack/FeedBackForm.jsx'
import Request from '../customer/components/Request/Request.jsx'


const CustomerRouters = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/login' element={<HomePage />}> </Route>
                <Route path='/register' element={<HomePage />}> </Route>

                <Route path='/' element={<HomePage />}> </Route>
                <Route path='/cart' element={<Cart />}> </Route>
                <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />}> </Route>
                <Route path='/product/:productId' element={<ProductDetails />}> </Route>
                <Route path='/checkout' element={<Checkout />}> </Route>
                <Route path='/account/order' element={<Order />}> </Route>
                <Route path='/account/order/:orderId' element={<OrderDetails />}> </Route>
                <Route path='/payment/:orderId' element={<PaymentSuccess />}></Route>
                <Route path='/user/profile' element={<Profile />}></Route>
                <Route path='/product/:productId/review' element={<ReviewCard />}></Route>
                <Route path="/products/search" element={<TitleResults />}></Route>
                <Route path='/forgot-password' element={<HomePage />} ></Route>
                <Route path='/reset-password' element={<HomePage />} ></Route>
                <Route path='/feedback' element={<FeedbackForm />} ></Route>
                <Route path='/request' element={<Request />} ></Route>
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRouters
