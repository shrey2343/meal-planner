# Render Deployment Guide

This guide will walk you through deploying your full-stack meal planner app on Render.

## Prerequisites

- GitHub account with your code pushed to a repository
- Render account (sign up at https://render.com)
- MongoDB Atlas account (for production database)

## Part 1: Deploy Backend (Node.js/Express)

### Step 1: Prepare Backend for Deployment

✅ **Already Done:**
- Fixed `package.json` start script to use `index.js`
- API uses environment variables

### Step 2: Create Web Service on Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

2. **Connect Your Repository**
   - Connect your GitHub account
   - Select your repository
   - Click "Connect"

3. **Configure Web Service**
   ```
   Name: meal-planner-backend (or your preferred name)
   Region: Choose closest to your users
   Branch: main (or your default branch)
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Instance Type**
   - Select "Free" tier (or paid if needed)

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add these:

   ```
   PORT=5000
   MONGO_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<generate_a_strong_random_string>
   GEMINI_API_KEY=<your_gemini_api_key>
   AMAZON_PARTNER_TAG=<your_amazon_tag>
   
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
   CLIENT_URL=https://your-frontend-url.onrender.com
   SERVER_URL=https://your-backend-url.onrender.com
   SESSION_SECRET=<generate_a_strong_random_string>
   
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=<your_email@gmail.com>
   SMTP_PASS=<your_gmail_app_password>
   
   OTP_EXPIRATION_MINUTES=5
   ```

   **Important Notes:**
   - Replace `<your-backend-url>` with the actual URL Render assigns (e.g., `meal-planner-backend.onrender.com`)
   - You'll need to update `GOOGLE_CALLBACK_URL`, `CLIENT_URL`, and `SERVER_URL` after deployment
   - For `SMTP_PASS`, use a Gmail App Password (not your regular password)

6. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://your-service-name.onrender.com`

### Step 3: Update Environment Variables

After deployment, go back to your service:
1. Click "Environment" tab
2. Update these variables with your actual backend URL:
   - `GOOGLE_CALLBACK_URL`
   - `SERVER_URL`
3. Save changes (service will redeploy)

### Step 4: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to your OAuth 2.0 Client
3. Add to "Authorized redirect URIs":
   ```
   https://your-backend-url.onrender.com/api/auth/google/callback
   ```
4. Add to "Authorized JavaScript origins":
   ```
   https://your-backend-url.onrender.com
   ```

---

## Part 2: Deploy Frontend (React/Vite)

### Step 1: Prepare Frontend for Deployment

✅ **Already Done:**
- Updated `api.js` to use environment variable for API URL

### Step 2: Create Static Site on Render

1. **Go to Render Dashboard**
   - Click "New +" → "Static Site"

2. **Connect Your Repository**
   - Select the same repository
   - Click "Connect"

3. **Configure Static Site**
   ```
   Name: meal-planner-frontend (or your preferred name)
   Region: Choose closest to your users
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variable**
   Click "Advanced" → "Add Environment Variable":
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   Replace `your-backend-url` with your actual backend URL from Part 1

5. **Create Static Site**
   - Click "Create Static Site"
   - Wait for deployment (5-10 minutes)
   - Note your frontend URL: `https://your-frontend-name.onrender.com`

### Step 3: Update Backend CORS Settings

1. Go back to your backend service on Render
2. Click "Environment" tab
3. Update `CLIENT_URL` to your frontend URL:
   ```
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```
4. Save (service will redeploy)

### Step 4: Update Google OAuth Settings (Again)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Add to "Authorized JavaScript origins":
   ```
   https://your-frontend-url.onrender.com
   ```

---

## Part 3: Testing Your Deployment

### Test Backend
1. Visit `https://your-backend-url.onrender.com/ping`
2. Should return: `{"message":"pong"}`

### Test Frontend
1. Visit `https://your-frontend-url.onrender.com`
2. Your app should load
3. Test login/register functionality
4. Test Google OAuth login

---

## Important Notes

### Free Tier Limitations
- **Backend**: Spins down after 15 minutes of inactivity
- **First request after spin-down**: Takes 30-60 seconds to wake up
- **Solution**: Upgrade to paid tier ($7/month) for always-on service

### MongoDB Atlas Setup
If you haven't set up MongoDB Atlas:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get connection string and add to `MONGO_URI`

### Gmail App Password
For `SMTP_PASS`:
1. Enable 2-Factor Authentication on your Gmail
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Use this 16-character password (not your regular password)

### Custom Domain (Optional)
Both frontend and backend support custom domains:
1. Go to service settings
2. Click "Custom Domain"
3. Follow instructions to add DNS records

---

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is running (visit `/ping` endpoint)

### Google OAuth not working
- Verify callback URLs match exactly
- Check Google Console authorized URIs
- Ensure `GOOGLE_CALLBACK_URL` and `CLIENT_URL` are correct

### 502 Bad Gateway
- Backend is likely spinning up (wait 30-60 seconds)
- Check backend logs for errors

---

## Post-Deployment Checklist

- [ ] Backend is accessible at `/ping`
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth works
- [ ] Email OTP works
- [ ] Meal plans can be created
- [ ] Shop page loads products
- [ ] Exercise page works
- [ ] All API calls succeed

---

## Monitoring & Maintenance

### View Logs
- Go to your service in Render dashboard
- Click "Logs" tab
- Monitor for errors

### Auto-Deploy
Render automatically deploys when you push to your connected branch:
- Push to GitHub → Render detects changes → Auto-deploys

### Manual Deploy
- Go to service dashboard
- Click "Manual Deploy" → "Deploy latest commit"

---

## Cost Optimization

### Free Tier Strategy
- Use free tier for both services
- Accept 15-minute spin-down
- Good for development/portfolio projects

### Production Strategy
- Upgrade backend to paid tier ($7/month) for always-on
- Keep frontend on free tier (static sites don't spin down)
- Total cost: $7/month

---

## Need Help?

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Check service logs for detailed error messages

Good luck with your deployment! 🚀
