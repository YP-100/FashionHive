const cartService = require("../services/cart.service.js");
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.model.js");
const salesService = require("./sales.service.js");
async function createOrder(user, shippingAddress) {
  let address;

  if (shippingAddress._id) {
    let Addressexists = await Address.findById(shippingAddress._id);
    address = Addressexists;
  } else {
     const duplicateAddress = await Address.findOne({
      User: user._id,
      streetAddress: shippingAddress.streetAddress,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zipCode: shippingAddress.zipCode,
      country: shippingAddress.country,
    });

    if (duplicateAddress) {
      address = duplicateAddress;
    } else {
      address = new Address(shippingAddress);
      address.User = user;
      await address.save();

      user.address.push(address);
      await user.save();
    }



  }
  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });


  const savedOrder = await createdOrder.save();
  user.orders = user.orders || []; 
  user.orders.push(savedOrder._id);
  await user.save();

  
  await cartService.clearCart(user._id);
  // Remove circular reference before returning
  savedOrder.user = savedOrder.user._id;
  if (savedOrder.shippingAddress && savedOrder.shippingAddress.User) {
    savedOrder.shippingAddress.User = savedOrder.shippingAddress.User._id;
  }

  return savedOrder;
}
async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

// for admin

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";

  return await order.save();
}
async function shippedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function outdeliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "OUT_FOR_DELIVERY";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";

  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(orderId);
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  await order.save();
  
  // Create sales record
  await salesService.createSalesRecord(order);
  
  return order;
}

module.exports = {
  createOrder,
  placeOrder,
  confirmOrder,
  shippedOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
  outdeliverOrder,
  deliverOrder,
};
