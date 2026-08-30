const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { auth } = require('../middleware/auth');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Create post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { caption, privacy } = req.body;
    const userId = req.user.userId;

    const newPost = new Post({
      userId,
      caption: caption || '',
      image: req.file ? req.file.path : null,
      privacy: privacy || 'public',
      createdAt: new Date()
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts (Feed)
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ privacy: 'public' })
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user posts
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update post
router.put('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption, privacy } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      { caption, privacy },
      { new: true }
    );

    res.json({ message: 'Post updated', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
router.delete('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;