# Deployment Guide - PrivacyGram 🚀

PrivacyGram ko production mein deploy karne ke liye yeh complete guide follow karein.

## Option 1: Heroku par Deploy (Free/Paid)

### Step 1: Heroku Account Banao
1. https://www.heroku.com par jao
2. Sign up karo free account ke liye
3. Heroku CLI download karo: https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Deploy karo
```bash
# Heroku CLI se login karo
heroku login

# Naya Heroku app banao
heroku create privacygram-app

# MongoDB Atlas connection setup karo (below mein guide hai)
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/privacygram
heroku config:set JWT_SECRET=your_super_secret_key
heroku config:set ENCRYPTION_KEY=your_32_char_key

# Push karo
git push heroku main

# Live check karo
heroku open
```

**Live Link:** `https://privacygram-app.herokuapp.com`

---

## Option 2: Vercel par Deploy (Recommended for Frontend)

### Frontend Setup with React

1. **Create React App**
```bash
npx create-react-app privacygram-client
cd privacygram-client
```

2. **.vercelignore file banao**
```
node_modules
.git
.env
```

3. **Deploy karo**
```bash
npm install -g vercel
vercel
```

**Live Link:** `https://privacygram-client.vercel.app`

---

## Option 3: Railway.app par Deploy (Best for Beginners)

### Step 1: Account Banao
1. https://railway.app par jao
2. GitHub se login karo

### Step 2: Deploy karo
1. "Create New" → "Deploy from GitHub repo"
2. PrivacyGram repo select karo
3. Environment variables set karo:
   - MONGODB_URI
   - JWT_SECRET
   - ENCRYPTION_KEY
   - PORT (default: 5000)

4. Deploy button click karo

**Live Link:** `https://privacygram.railway.app`

---

## Option 4: AWS par Deploy (Professional)

### EC2 Instance Setup
```bash
# 1. EC2 instance launch karo (Ubuntu 20.04)
# 2. SSH se connect karo
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Dependencies install karo
sudo apt update
sudo apt install nodejs npm mongodb-org

# 4. App clone karo
git clone https://github.com/Vishvagurusamratking/PrivacyGram.git
cd PrivacyGram

# 5. Install aur start karo
npm install
npm start
```

**Live Link:** `http://your-ec2-instance-ip:5000`

---

## Option 5: Render.com par Deploy (Modern & Free)

### Step 1: Account Setup
1. https://render.com par jao
2. GitHub se login karo

### Step 2: Deploy
1. "Create New Service" → "Web Service"
2. GitHub repo connect karo
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** MONGODB_URI, JWT_SECRET, etc.

4. Deploy karo

**Live Link:** `https://privacygram.onrender.com`

---

## Step 1: MongoDB Atlas Setup (Database)

### Free Database Banao
1. https://www.mongodb.com/cloud/atlas par jao
2. Sign up karo
3. Create Cluster (Free tier select karo)
4. Network access mein apna IP add karo
5. Connection string copy karo:
```
mongodb+srv://username:password@cluster.mongodb.net/privacygram
```

---

## Step 2: Domain Setup (Agar Apna Domain Chahiye)

### Cheap Domains Buy Karo
- GoDaddy: https://godaddy.com
- Namecheap: https://namecheap.com
- Domain.com: https://domain.com

### DNS Settings (Cloudflare ke through)
1. https://cloudflare.com par jao
2. Domain add karo
3. Nameservers update karo domain registrar par
4. DNS records setup karo

---

## Complete Production Checklist

- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] MongoDB connected
- [ ] JWT_SECRET configured
- [ ] ENCRYPTION_KEY set (32 characters)
- [ ] Email service setup (optional)
- [ ] Rate limiting active
- [ ] Security headers enabled
- [ ] CORS configured
- [ ] File upload size limits set
- [ ] Error logging setup
- [ ] Backup strategy planned

---

## Environment Variables (.env file)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/privacygram

# Security
JWT_SECRET=your_32_character_super_secret_key_change_this
JWT_EXPIRE=7d
ENCRYPTION_KEY=your_32_character_encryption_key_here

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads

# Security
BCRYPT_ROUNDS=10

# Frontend URL
FRONTEND_URL=https://privacygram-client.vercel.app
```

---

## Recommended Deployment Flow

```
GitHub Repo
    ↓
Backend (Heroku/Railway/Render)
    ↓
Frontend (Vercel/Netlify)
    ↓
Database (MongoDB Atlas)
    ↓
Domain (Cloudflare DNS)
    ↓
🎉 LIVE PrivacyGram!
```

---

## Testing Endpoints After Deployment

```bash
# Backend API test
curl https://privacygram.herokuapp.com/api/health

# Frontend test
https://privacygram-client.vercel.app

# Combined
Frontend → Backend API → MongoDB
```

---

## Troubleshooting

### Build fails?
```bash
# Local mein test karo
npm run dev

# Logs check karo
heroku logs --tail
```

### Database connection error?
```bash
# MongoDB URI check karo
echo $MONGODB_URI

# Atlas pe IP whitelist karo
```

### Frontend nahi dikhai raha?
```bash
# CORS settings check karo server.js mein
# Frontend URL environment mein set karo
```

---

## Production Security Best Practices

1. ✅ Use HTTPS everywhere
2. ✅ Keep dependencies updated
3. ✅ Monitor logs regularly
4. ✅ Set up backups
5. ✅ Use strong JWT secrets
6. ✅ Enable rate limiting
7. ✅ Use environment variables
8. ✅ Keep API keys private
9. ✅ Regular security audits
10. ✅ Monitor for vulnerabilities

---

## Important Links

- **Heroku Dashboard:** https://dashboard.heroku.com
- **Railway Dashboard:** https://railway.app/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Render Dashboard:** https://dashboard.render.com

---

## Launch Commands

### Local mein start karo (Testing)
```bash
npm install
npm run dev
# http://localhost:5000
```

### Production deploy karo
```bash
git add .
git commit -m "Ready for production"
git push origin main
# Auto-deploy hoga!
```

---

**Ab PrivacyGram public hone ke liye tayyar hai!** 🎉

Choose any platform above aur 5-10 minutes mein LIVE ho jayega!

Need help? Puch lo! 💬