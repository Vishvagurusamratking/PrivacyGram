const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { auth } = require('../middleware/auth');
const { encryptData, decryptData } = require('../utils/encryption');

// Send message (End-to-End Encrypted)
router.post('/', auth, async (req, res) => {
  try {
    const { recipientId, text } = req.body;
    const senderId = req.user.userId;

    // Encrypt message
    const encryptedText = encryptData(text);

    const newMessage = new Message({
      senderId,
      recipientId,
      text: encryptedText,
      isRead: false,
      createdAt: new Date()
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get conversation
router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.userId;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, recipientId: userId },
        { senderId: userId, recipientId: currentUserId }
      ]
    }).sort({ createdAt: 1 });

    // Decrypt messages
    const decryptedMessages = messages.map(msg => ({
      ...msg.toObject(),
      text: decryptData(msg.text)
    }));

    res.json(decryptedMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark messages as read
router.put('/read/:conversationId', auth, async (req, res) => {
  try {
    await Message.updateMany(
      { recipientId: req.user.userId },
      { isRead: true }
    );
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;