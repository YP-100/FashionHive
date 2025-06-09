require('dotenv').config();
const jwt = require("jsonwebtoken");



const generateToken = (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"48h"});
    return token;
}

const getUserIdFromToken = (token)=>{
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    return decodedToken.userId;
}

module.exports = {generateToken, getUserIdFromToken};