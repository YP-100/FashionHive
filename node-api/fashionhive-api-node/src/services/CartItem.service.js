const userService = require("./user.service.js");
const CartItem = require("../models/cartItem.model.js");


async function updateCartItem(userId, cartItemId, cartItemData) {
    // console.log(userId, cartItemId, cartItemData, cartItemData);
    try {

        // const item = await CartItem.findById(cartItemId).populate("product");

        const item = await findCartItemById(cartItemId);


        if (!item) {
            throw new Error("Item not found");
        }
        const user = await userService.getUserById(item.userId);


        if (!user) {
            throw new Error("User not found");
        }
        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } //only user whose cart is can update it
        else {
            throw new Error("You can't update this cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.getUserById(userId);
    if (user._id.toString() === cartItem.userId.toString()) {
       return await CartItem.findByIdAndDelete(cartItemId);
    }
    throw new Error("You can't remove Another User's cart item");
}

async function findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (cartItem) {
        return cartItem;
    }
    else {
        throw new Error("Item not found");
    }
}

module.exports = { updateCartItem, removeCartItem,findCartItemById  }; 
