# PrivacyGram 🔐

A privacy-focused Instagram-like social media application with end-to-end encryption and robust data protection.

## Features

### 🔒 Privacy & Security
- **End-to-End Encryption**: All messages are encrypted using AES-256-CBC
- **Private Profiles**: Users can set profiles to private with follower approval
- **Password Protection**: Bcrypt hashing with configurable rounds
- **Two-Factor Authentication**: Optional 2FA support
- **Block Users**: Block unwanted users and protect your privacy
- **Data Deletion**: Users can delete their accounts and all associated data

### 📱 Core Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Posts**: Create, update, and delete posts with privacy controls
- **Comments**: Comment on posts (with user control)
- **Likes**: Like and unlike posts
- **Follow System**: Follow/unfollow users with approval system
- **Direct Messaging**: End-to-end encrypted private messages
- **User Profiles**: Customizable profiles with bio and profile pictures

### ⚙️ Privacy Settings
- **Profile Privacy**: Public or Private
- **Message Control**: Allow/disable messages from non-followers
- **Last Seen**: Hide your last seen status
- **Comment Control**: Allow/disable comments on posts
- **Post Privacy**: Public, Private, or Friends-only

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Multer** - File upload handling
- **Crypto** - End-to-end encryption

### Frontend (To be added)
- React.js
- Redux/Context API
- Tailwind CSS
- Axios

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Vishvagurusamratking/PrivacyGram.git
cd PrivacyGram
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/privacygram
JWT_SECRET=your_secret_key
ENCRYPTION_KEY=your_32_char_encryption_key
PORT=5000
```

4. **Start the server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/update/:userId` - Update profile
- `PUT /api/users/privacy/:userId` - Update privacy settings
- `POST /api/users/block/:userId` - Block a user

### Posts
- `POST /api/posts` - Create post
- `GET /api/posts` - Get feed
- `GET /api/posts/user/:userId` - Get user's posts
- `PUT /api/posts/:postId` - Update post
- `DELETE /api/posts/:postId` - Delete post

### Comments
- `POST /api/comments` - Create comment
- `GET /api/comments/:postId` - Get post comments
- `DELETE /api/comments/:commentId` - Delete comment

### Likes
- `POST /api/likes` - Like post
- `DELETE /api/likes/:postId` - Unlike post

### Follows
- `POST /api/follows` - Follow user
- `DELETE /api/follows/:followingId` - Unfollow user

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/conversation/:userId` - Get conversation
- `PUT /api/messages/read/:conversationId` - Mark as read

## Security Best Practices

1. ✅ **Password Hashing**: All passwords are hashed with Bcrypt
2. ✅ **JWT Authentication**: Secure token-based authentication
3. ✅ **HTTPS Ready**: Use HTTPS in production
4. ✅ **Rate Limiting**: API rate limiting to prevent abuse
5. ✅ **Input Validation**: All inputs are validated
6. ✅ **Encryption**: Messages encrypted end-to-end
7. ✅ **CORS Protection**: CORS properly configured
8. ✅ **Security Headers**: Helmet.js for HTTP headers

## Environment Variables

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/privacygram

# Authentication
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Encryption
ENCRYPTION_KEY=your_32_character_encryption_key

# Security
BCRYPT_ROUNDS=10
```

## Project Structure

```
PrivacyGram/
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── posts.js
│   ├── comments.js
│   ├── likes.js
│   ├── follows.js
│   └── messages.js
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   ├── Like.js
│   ├── Follow.js
│   └── Message.js
├── middleware/
│   └── auth.js
├── utils/
│   ├── encryption.js
│   └── validators.js
├── uploads/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Future Enhancements

- [ ] Frontend UI (React)
- [ ] Real-time notifications (Socket.io)
- [ ] Story feature
- [ ] Photo filters
- [ ] Video support
- [ ] Group chats
- [ ] Search functionality
- [ ] Hashtags and trends
- [ ] User verification badges
- [ ] Report and moderation system
- [ ] Analytics dashboard

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact & Support

For support, email: support@privacygram.com

---

**PrivacyGram** - Your Privacy, Our Priority 🔐