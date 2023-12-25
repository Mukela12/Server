const RestrictDomain = require('../models/restrictDomain');

const checkUniversityDomain = async (req, res) => {
  try {
    const { universityName, requestedDomain } = req.body;

    // Find the university in the database
    const university = await RestrictDomain.findOne({ universityName });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found in the database.',
      });
    }

    // Compare the requested domain with the stored domain
    if (requestedDomain === university.domain) {
      return res.status(200).json({
        success: true,
        message: 'Domain match. Request is allowed.',
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Domain mismatch. Access denied.',
      });
    }
  } catch (error) {
    console.error('Error checking university domain:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message || error,
    });
  }
};

module.exports = {
  checkUniversityDomain,
};
