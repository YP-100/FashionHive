const paymentService = require("../services/paymentService.js");

const createPaymentLink = async (req, res) => {
    try {
        const paymentLink = await paymentService.createPaymentLink(req.params.id)

        return res.status(200).send(paymentLink);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const UpdatePaymentInformation = async (req, res) => {
    try {
        const paymentLink = await paymentService.UpdatePaymentInformation(req.query);

        return res.status(200).send({message : "payment Information Updated Successfully !",status: true});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { createPaymentLink, UpdatePaymentInformation };
