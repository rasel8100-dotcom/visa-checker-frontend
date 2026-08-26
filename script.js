// ===============================================
// 🛂 VISA CHECKER FRONTEND - JAVASCRIPT
// ===============================================

// ========== CONFIGURATION ==========
// ✅ Simple configuration (NOT React, so no process.env)
const API_URL = localStorage.getItem('apiUrl') || 'http://localhost:5000';

// For Vercel deployment, change to your backend URL:
// const API_URL = 'https://your-backend.herokuapp.com';
// const API_URL = 'https://your-backend.railway.app';

console.log('🌐 API URL:', API_URL);

// Status badge configuration
const STATUS_CONFIG = {
    'Approved': 'approved',
    'Pending': 'pending',
    'Rejected': 'rejected',
    'Processing': 'processing'
};

// ===============================================
// 🎯 FORM SUBMISSION
// ===============================================

function handleFormSubmit(event) {
    event.preventDefault();
    searchVisa();
}

// ===============================================
// 🔍 MAIN SEARCH FUNCTION
// ===============================================

async function searchVisa() {
    const appId = document.getElementById('appId').value.trim().toUpperCase();
    const passportNo = document.getElementById('passportNo').value.trim().toUpperCase();
    
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    const searchBtn = document.getElementById('searchBtn');
    
    // Reset previous results
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    
    // Validation
    if (!appId || !passportNo) {
        showError('❌ অনুগ্রহ করে সব ফিল্ড পূরণ করুন!');
        return;
    }
    
    // Additional validation
    if (appId.length < 5) {
        showError('❌ Application ID কমপক্ষে ৫ অক্ষর হতে হবে');
        return;
    }
    
    if (passportNo.length < 6) {
        showError('❌ Passport Number কমপক্ষে ৬ অক্ষর হতে হবে');
        return;
    }
    
    // Show loading
    loadingDiv.classList.remove('hidden');
    searchBtn.disabled = true;
    
    try {
        // Make API Request
        const response = await fetch(`${API_URL}/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                appId: appId,
                passportNo: passportNo
            }),
            timeout: 10000  // 10 second timeout
        });
        
        // Handle HTTP errors
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('API endpoint not found. Backend might be offline.');
            } else if (response.status === 500) {
                throw new Error('Server error. Please try again later.');
            } else if (response.status === 503) {
                throw new Error('Service temporarily unavailable.');
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }
        
        const data = await response.json();
        
        // Hide loading
        loadingDiv.classList.add('hidden');
        searchBtn.disabled = false;
        
        // Process response
        if (data.status === 'success') {
            displaySuccessResult(data.data || data);
        } else {
            showError(`❌ ${data.message || 'কোনো রেকর্ড পাওয়া যায়নি'}`);
        }
        
    } catch (error) {
        console.error('Error:', error);
        loadingDiv.classList.add('hidden');
        searchBtn.disabled = false;
        
        // User-friendly error messages
        if (error.message.includes('Failed to fetch')) {
            showError('❌ সার্ভারের সাথে সংযোগ করতে পারছি না।\n\n🔗 নিশ্চিত করুন:\n1. Backend চলছে (http://localhost:5000)\n2. CORS enabled\n3. Network সংযোগ আছে');
        } else if (error.message.includes('endpoint not found')) {
            showError('❌ API endpoint পাওয়া যায়নি।\n\nBackend চলছে কিনা চেক করুন।');
        } else if (error.message.includes('JSON')) {
            showError('❌ সার্ভার থেকে অবৈধ প্রতিক্রিয়া পাওয়া গেছে।');
        } else {
            showError(`❌ ত্রুটি: ${error.message}`);
        }
    }
}

// ===============================================
// ✅ DISPLAY SUCCESS RESULT
// ===============================================

function displaySuccessResult(data) {
    // Extract data (handle different response formats)
    const appId = data.app_id || data.appId || 'N/A';
    const name = data.applicant_name || data.applicantName || 'N/A';
    const passport = data.passport_no || data.passportNo || 'N/A';
    const status = data.status || 'Pending';
    const date = data.created_at || data.createdAt || 'N/A';
    
    // Update result elements
    document.getElementById('resultAppId').textContent = appId;
    document.getElementById('resultName').textContent = name;
    document.getElementById('resultPassport').textContent = passport;
    document.getElementById('resultDate').textContent = formatDate(date);
    
    // Update status badge with appropriate styling
    const statusBadge = document.getElementById('resultStatus');
    statusBadge.textContent = status;
    
    // Remove all status classes
    statusBadge.className = 'status-badge';
    
    // Add appropriate class
    const statusClass = STATUS_CONFIG[status] || 'pending';
    statusBadge.classList.add(statusClass);
    
    // Show result, hide error
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
}

// ===============================================
// ❌ SHOW ERROR MESSAGE
// ===============================================

function showError(message) {
    const errorDiv = document.getElementById('error');
    const errorText = document.getElementById('errorText');
    const loadingDiv = document.getElementById('loading');
    
    loadingDiv.classList.add('hidden');
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
}

// ===============================================
// 🛠️ UTILITY FUNCTIONS
// ===============================================

function formatDate(dateStr) {
    if (!dateStr || dateStr === 'N/A') return 'N/A';
    
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return dateStr;  // Return as-is if invalid
        }
        
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Asia/Dhaka'
        };
        return date.toLocaleDateString('bn-BD', options);
    } catch (e) {
        return dateStr;
    }
}

function resetForm() {
    document.getElementById('appId').value = '';
    document.getElementById('passportNo').value = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('searchBtn').disabled = false;
    document.getElementById('appId').focus();
}

// ===============================================
// 🎯 EVENT LISTENERS
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // Auto-focus on App ID input
    document.getElementById('appId').focus();
    
    // Allow Enter key to search
    const inputs = document.querySelectorAll('#appId, #passportNo');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchVisa();
            }
        });
    });
    
    // Auto-uppercase input
    document.getElementById('appId').addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });
    
    document.getElementById('passportNo').addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });
});

// ===============================================
// 🔧 ADMIN PANEL (Optional)
// ===============================================

// Store API URL (for future admin panel)
window.setApiUrl = function(url) {
    localStorage.setItem('apiUrl', url);
    location.reload();
};

window.getApiUrl = function() {
    return API_URL;
};

// ===============================================
// 📱 PWA SUPPORT (Optional)
// ===============================================

if ('serviceWorker' in navigator) {
    // Service Worker registration can go here for offline support
}

// ===============================================
// 🔍 VERSION INFO
// ===============================================

console.log(`
🛂 Visa Checker Frontend
✅ Version: 1.0.0
🌐 API: ${API_URL}
📱 Environment: ${window.location.protocol}//${window.location.host}
`);
