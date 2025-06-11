
// const razorpay = require("../config/razorPayClient.js");
const orderService = require("../services/order.service.js");

const razorpay  = require("../config/razorPayClient");


const createPaymentLink = async(orderId)=>{


    try {
        const order = await orderService.findOrderById(orderId);
        const paymentLinkRequest={

            
            amount: order.totalDiscountedPrice*100,  //--in paise
            currency: "INR",

            customer:{
                name:order.user.firstName+" "+order.user.lastName,
                contact : order.user.mobile,
                email: order.user.email
            },
            notify:{
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url : `https://fashionhive.onrender.com/payment/${orderId}`,
            callback_method : "get"
        };
        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

        const paymentLinkId = paymentLink.id;
        const payment_Link_Url = paymentLink.short_url;

        const resData={
            paymentLinkId,
            payment_Link_Url
        }

        return resData;
    } catch (error) {
        throw new Error(error.message);
    }
}

const UpdatePaymentInformation = async(reqdata)=>{
    // console.log("this is being called", reqdata);
    const paymentId = reqdata.payment_id
    const orderId = reqdata.order_id;

    try {
        const order = await orderService.findOrderById(orderId);

        const payment = await razorpay.payments.fetch(paymentId);
        

        if(payment.status == "captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus = "PLACED";
            console.log("order in payment service", order);
            await order.save();


        }

        const resData ={
            message: "Your order is Placed ", success: true
        }

        return resData;
    } catch (error) {
        throw new Error(error.message);
    }


}

module.exports = {createPaymentLink, UpdatePaymentInformation}
