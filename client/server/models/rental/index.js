const RentalProduct = require('./Product');
const RentalCart = require('./Cart');
const RentalFavorite = require('./Favorite');
const Rental = require('./Rental');
const RentalReview = require('./Review');
const Listing = require('../Listing'); // ✅ Added
const Seller = require('../Seller'); // ✅ Added
RentalProduct.hasMany(RentalReview, { foreignKey: 'productId' });
RentalReview.belongsTo(RentalProduct, { foreignKey: 'productId' });
RentalCart.belongsTo(Listing, { 
  foreignKey: 'productId', 
  as: 'product' 
});
Listing.hasMany(RentalCart, { 
  foreignKey: 'productId', 
  as: 'carts' 
});
RentalFavorite.belongsTo(Listing, { 
  foreignKey: 'productId', 
  as: 'product' 
});
Listing.hasMany(RentalFavorite, { 
  foreignKey: 'productId', 
  as: 'favorites' 
});
module.exports = {
  RentalProduct,
  RentalCart,
  RentalFavorite,
  Rental,
  RentalReview,
  Listing,  // ✅ Added
  Seller    // ✅ Added
};
