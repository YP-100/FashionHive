const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../services/user.service.js");



const authenticate = async (req, res, next) => {
    // bearer token splits into bearer and token
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(404).send({error:"Unauthorized!"});
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userService.getUserById(userId);

        req.user = user;


    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
    next();
};

module.exports = authenticate;