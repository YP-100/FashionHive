const Sales = require("../models/sales.model.js");
const Order = require("../models/order.model.js");

async function createSalesRecord(order) {
  const salesRecord = new Sales({
    totalSales: order.totalDiscountedPrice,
    totalItemsSold: order.totalItem,
    order: order._id
  });
  
  await salesRecord.save();
  return salesRecord;
}

// async function getSalesData() {
//   try {
//     const result = await Sales.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalSales: { $sum: "$totalSales" },
//           totalItemsSold: { $sum: "$totalItemsSold" }
//         }
//       }
//     ]);
//     const dailySales = await Sales.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//           dailySales: { $sum: "$totalSales" },
//           dailyItemsSold: { $sum: "$totalItemsSold" }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);
    
//     return {
//       overall: result[0] || { totalSales: 0, totalItemsSold: 0 },
//       dailySales
//     };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }


async function getSalesData() {
    try {
      // Get total sales and items sold across all records
      const result = await Sales.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalSales" },
            totalItemsSold: { $sum: "$totalItemsSold" }
          }
        }
      ]);
      
      // Get sales by date (daily sales)
      const dailySales = await Sales.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            dailySales: { $sum: "$totalSales" },
            dailyItemsSold: { $sum: "$totalItemsSold" }
          }
        },
        { $sort: { "_id": 1 } }
      ]);
  
      // Format numbers function
      const formatNumber = (num) => {
        if (num >= 1000) {
          const formatted = (num / 1000).toFixed(1);
          // Remove .0 if it's a whole number
          return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'k' : formatted + 'k';
        }
        return num.toString();
      };
  
      const overall = result[0] || { totalSales: 0, totalItemsSold: 0 };
      
      // Format the numbers
      const formattedOverall = {
        raw: {
          totalSales: overall.totalSales,
          totalItemsSold: overall.totalItemsSold
        },
        display: {
          totalSales: formatNumber(overall.totalSales),
          totalItemsSold: formatNumber(overall.totalItemsSold)
        }
      };
  
      const formattedDailySales = dailySales.map(day => ({
        raw: {
          dailySales: day.dailySales,
          dailyItemsSold: day.dailyItemsSold
        },
        display: {
          dailySales: formatNumber(day.dailySales),
          dailyItemsSold: formatNumber(day.dailyItemsSold)
        },
        _id: day._id
      }));
  
      return {
        overall: formattedOverall,
        dailySales: formattedDailySales
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
module.exports = {
  createSalesRecord,
  getSalesData
};