const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Post = require('../models/Post');
const { auth } = require('../middleware/auth');

// Like post
router.post('/', auth, async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.userId;

    // Check if already liked
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ error: 'Already liked' });
    }

    const newLike = new Like({ postId, userId });
    await newLike.save();

    // Update post like count
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

    res.status(201).json({ message: 'Post liked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unlike post
router.delete('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    await Like.findOneAndDelete({ postId, userId });
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

    res.json({ message: 'Post unliked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;