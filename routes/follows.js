const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');
const { auth } = require('../middleware/auth');

// Follow user
router.post('/', auth, async (req, res) => {
  try {
    const { followingId } = req.body;
    const userId = req.user.userId;

    // Can't follow yourself
    if (userId === followingId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const existingFollow = await Follow.findOne({ followerId: userId, followingId });
    if (existingFollow) {
      return res.status(400).json({ error: 'Already following' });
    }

    const newFollow = new Follow({ followerId: userId, followingId });
    await newFollow.save();

    res.status(201).json({ message: 'Follow request sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unfollow user
router.delete('/:followingId', auth, async (req, res) => {
  try {
    const { followingId } = req.params;
    const userId = req.user.userId;

    await Follow.findOneAndDelete({ followerId: userId, followingId });
    res.json({ message: 'Unfollowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;