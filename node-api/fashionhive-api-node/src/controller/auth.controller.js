const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service.js");

const register = async(req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return res.status(200).send({jwt, message:"User Registered Successfully"});
        

    }catch(error){
        return res.status(500).send({error: error.message});
}
}

const login = async(req, res) => {
    const{password,email} = req.body;
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if(!user){
            return res.status(404).send({message:"User not found with email :",email});
        }
        const isPasswordvalid = await bcrypt.compare(password,user.password);
        if(!isPasswordvalid){
            return res.status(401).send({message:"Invalid Password"});
        }
        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({jwt, message:"Logged In Successfully"});
    }catch(error){
        return res.status(500).send({error: error.message});
    }
}

module.exports = {register, login};