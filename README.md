# 🛂 Visa Checker - ভিসা চেকার

এটি একটি সহজ ও দ্রুত ভিসা আবেদন ট্র্যাকার ওয়েবসাইট যেখানে আপনি আপনার আবেদনের অবস্থা জানতে পারবেন।

## ✨ বৈশিষ্ট্য

- 🔍 দ্রুত ভিসা অনুসন্ধান
- 📱 মোবাইল-বান্ধব ডিজাইন
- ⚡ তাৎক্ষণিক ফলাফল
- 🎨 আধুনিক ইউজার ইন্টারফেস
- 🌐 বাংলা ভাষা সমর্থন

## 🚀 দ্রুত শুরু

### স্থানীয়ভাবে চালানো

```bash
# 1. Repository clone করুন
git clone https://github.com/rasel8100-dotcom/visa-checker-frontend.git
cd visa-checker-frontend

# 2. সাধারণ HTTP সার্ভার চালু করুন
python -m http.server 3000

# অথবা Node.js ব্যবহার করুন:
npx http-server -p 3000

# 3. ব্রাউজার খুলুন
# http://localhost:3000
```

### অনলাইনে ডিপ্লয় করা (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rasel8100-dotcom/visa-checker-frontend)

এই বাটন ক্লিক করলে সরাসরি Vercel-এ ডিপ্লয় হবে। ✅

## 🔧 কনফিগারেশন

### Backend API সংযোগ

`script.js`-এ Backend API URL সেট করুন:

```javascript
const API_URL = 'https://your-backend-api.com';
// অথবা localhost তে: 'http://localhost:5000'
```

### Environment Variables (Vercel)

Vercel Dashboard → Settings → Environment Variables
