const { Admin, Listing, Order, Payment, PromoCode, StudentVerification } = require('../../models/admin');
const { Op } = require('sequelize');
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await Admin.count();
    const activeListings = await Listing.count({ where: { status: 'approved' } });
    const totalOrders = await Order.count();
    const pendingListings = await Listing.count({ where: { status: 'pending' } });
    const pendingOrders = await Order.count({ where: { status: 'pending' } });
    const activeSellers = await Admin.count({ where: { role: 'seller', status: 'active' } });
    const studentDiscounts = await StudentVerification.count({ where: { status: 'approved' } });
    const totalRevenue = await Payment.sum('amount', { where: { status: 'completed' } }) || 0;
    const totalVAT = await Payment.sum('vatAmount', { where: { status: 'completed' } }) || 0;
    const pendingPayments = await Payment.count({ where: { status: 'pending' } });
    const monthlyRevenue = [];
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    for (let i = 0; i < 7; i++) {
      monthlyRevenue.push(Math.floor(Math.random() * 100000) + 45000);
    }
    const userGrowth = [];
    for (let i = 0; i < 7; i++) {
      userGrowth.push(Math.floor(120 + (i * 100) + Math.random() * 50));
    }
    const categoryDistribution = {
      Furniture: 45,
      Appliances: 30,
      Electronics: 15,
      Others: 10
    };
    res.json({
      stats: {
        totalUsers,
        activeListings,
        totalOrders,
        pendingListings,
        pendingOrders,
        activeSellers,
        studentDiscounts,
        totalRevenue,
        totalVAT,
        pendingPayments
      },
      charts: {
        userGrowth: {
          labels: months,
          data: userGrowth
        },
        monthlyRevenue: {
          labels: months,
          data: monthlyRevenue
        },
        categoryDistribution
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Server error fetching analytics' });
  }
};
