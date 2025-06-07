const salesService = require("../services/sales.service.js");

const getSalesData = async (req, res) => {
  try {
    const salesData = await salesService.getSalesData();
    res.status(200).send(salesData);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getSalesData
};