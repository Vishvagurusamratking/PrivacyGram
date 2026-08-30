const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { auth } = require('../middleware/auth');

// Create comment
router.post('/', auth, async (req, res) => {
  try {
    const { postId, text } = req.body;
    const userId = req.user.userId;

    const newComment = new Comment({
      postId,
      userId,
      text,
      createdAt: new Date()
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment created', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for post
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete comment
router.delete('/:commentId', auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;