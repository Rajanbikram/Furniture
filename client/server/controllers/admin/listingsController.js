const { Listing } = require('../../models/admin');
exports.getAllListings = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = {};
    if (status && status !== 'all') {
      whereClause.status = status;
    }
    console.log('📋 Fetching listings with filter:', whereClause);
    const listings = await Listing.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true
    });
    console.log('✅ Found', listings.length, 'listings');
    res.status(200).json(listings);
  } catch (error) {
    console.error('❌ Get listings error:', error);
    console.error('Error message:', error.message);
    res.status(500).json({ 
      error: 'Server error fetching listings',
      message: error.message
    });
  }
};
exports.approveListing = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('✅ Approving listing ID:', id);
    const listing = await Listing.findByPk(id);
    if (!listing) {
      console.log('❌ Listing not found:', id);
      return res.status(404).json({ 
        success: false,
        error: 'Listing not found' 
      });
    }
    listing.status = 'active';  // ← This makes it show in seller dashboard!
    await listing.save();
    console.log('✅ Listing approved and set to ACTIVE:', listing.title);
    res.status(200).json({ 
      success: true,
      message: 'Listing approved and activated successfully', 
      listing 
    });
  } catch (error) {
    console.error('❌ Approve listing error:', error);
    console.error('Error message:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Server error approving listing',
      message: error.message 
    });
  }
};
exports.rejectListing = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('❌ Rejecting listing ID:', id);
    const listing = await Listing.findByPk(id);
    if (!listing) {
      console.log('❌ Listing not found:', id);
      return res.status(404).json({ 
        success: false,
        error: 'Listing not found' 
      });
    }
    listing.status = 'rejected';
    await listing.save();
    console.log('✅ Listing rejected:', listing.title);
    res.status(200).json({ 
      success: true,
      message: 'Listing rejected successfully', 
      listing 
    });
  } catch (error) {
    console.error('❌ Reject listing error:', error);
    console.error('Error message:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Server error rejecting listing',
      message: error.message 
    });
  }
};
exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Deleting listing ID:', id);
    const listing = await Listing.findByPk(id);
    if (!listing) {
      console.log('❌ Listing not found:', id);
      return res.status(404).json({ 
        success: false,
        error: 'Listing not found' 
      });
    }
    const title = listing.title;
    await listing.destroy();
    console.log('✅ Listing deleted:', title);
    res.status(200).json({ 
      success: true,
      message: 'Listing deleted successfully',
      deletedListing: { id, title }
    });
  } catch (error) {
    console.error('❌ Delete listing error:', error);
    console.error('Error message:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Server error deleting listing',
      message: error.message 
    });
  }
};
exports.getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('📋 Fetching listing ID:', id);
    const listing = await Listing.findByPk(id);
    if (!listing) {
      console.log('❌ Listing not found:', id);
      return res.status(404).json({ 
        success: false,
        error: 'Listing not found' 
      });
    }
    console.log('✅ Listing found:', listing.title);
    res.status(200).json({
      success: true,
      listing
    });
  } catch (error) {
    console.error('❌ Get listing error:', error);
    console.error('Error message:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Server error fetching listing',
      message: error.message 
    });
  }
};
