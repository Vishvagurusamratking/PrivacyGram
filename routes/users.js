const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Get user profile
router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/update/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, bio, profilePicture, profilePrivacy } = req.body;

    // Verify user is updating their own profile
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, bio, profilePicture, profilePrivacy },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Privacy Settings
router.put('/privacy/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { profilePrivacy, allowMessages, showLastSeen, allowComments } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        profilePrivacy,
        allowMessages: allowMessages !== undefined ? allowMessages : true,
        showLastSeen: showLastSeen !== undefined ? showLastSeen : false,
        allowComments: allowComments !== undefined ? allowComments : true
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Privacy settings updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Block user
router.post('/block/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const blockUserId = req.body.blockUserId;

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { blockedUsers: blockUserId } },
      { new: true }
    );

    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;