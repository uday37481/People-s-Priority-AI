const User = require('../models/User');
const Constituency = require('../models/Constituency');
const jwt = require('jsonwebtoken');

// Helper to sign JWT tokens
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'jwt-default-secret-key-1234',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { fullName, email, password, role, phone, preferredLanguage, constituencyName } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists',
        errorCode: 'DUPLICATE_KEY'
      });
    }

    // Default or create a dummy constituency if registering an MP and constituency name is provided
    let constituencyId = null;
    if (constituencyName) {
      let constituency = await Constituency.findOne({ constituencyName });
      if (!constituency) {
        // Create basic mock constituency for hackathon validation
        constituency = await Constituency.create({
          constituencyName,
          district: 'District Core',
          state: 'State Core',
          mpName: role === 'MP' ? fullName : 'TBD',
          population: 120000,
          area: 450
        });
      }
      constituencyId = constituency._id;
    } else {
      // Tie to a default constituency if none provided for mockup simplicity
      let defaultConst = await Constituency.findOne();
      if (!defaultConst) {
        defaultConst = await Constituency.create({
          constituencyName: 'Default Constituency',
          district: 'Central',
          state: 'National',
          mpName: 'Representative MP',
          population: 200000,
          area: 850
        });
      }
      constituencyId = defaultConst._id;
    }

    // Create user
    user = await User.create({
      fullName,
      email,
      password,
      role: role || 'Citizen',
      phone,
      preferredLanguage: preferredLanguage || 'English',
      constituencyId
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid login credentials',
        errorCode: 'INVALID_CREDENTIALS'
      });
    }

    // Validate password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid login credentials',
        errorCode: 'INVALID_CREDENTIALS'
      });
    }

    // Sign Token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        constituencyId: user.constituencyId
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user profile
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('constituencyId');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
