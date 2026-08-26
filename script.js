// ===============================================
// 🌐 Configuration
// ===============================================

// আপনার Backend API URL এখানে রাখুন
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Status Badge Configuration
const STATUS_CONFIG = {
    'Approved': 'approved',
    'Pending': 'pending',
    'Rejected': 'rejected',
    'Processing': 'processing'
};

// ===============================================
// 🔍 Main Search Function
// ===============================================

async function searchVisa() {
    const appId = document.getElementById('appId').value.trim().toUpperCase();
    const passportNo = document.getElementById('passportNo').value.trim().toUpperCase();
    
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    
    // Reset previous results
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    
    // Validation
    if (!appId || !passportNo) {
        showError('❌ অনুগ্রহ করে সব ফিল্ড পূরণ করুন!');
        return;
    }
    
    // Show loading
    loadingDiv.classList.remove('hidden');
    
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
            })
        });
        
        // Handle HTTP errors
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('API endpoint not found');
            } else if (response.status === 500) {
                throw new Error('Server error. Please try again later.');
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }
        
        const data = await response.json();
        
        // Hide loading
        loadingDiv.classList.add('hidden');
        
        // Process response
        if (data.status === 'success') {
            displaySuccessResult(data.data || data.applicant || data);
        } else {
            showError(`❌ ${data.message || 'কোনো রেকর্ড পাওয়া যায়নি'}`);
        }
        
    } catch (error) {
        console.error('Error:', error);
        loadingDiv.classList.add('hidden');
        
        // User-friendly error messages
        if (error.message.includes('fetch')) {
            showError('❌ সার্ভারের সাথে সংযোগ করতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন।');
        } else if (error.message.includes('JSON')) {
            showError('❌ সার্ভার থেকে অবৈধ প্রতিক্রিয়া পাওয়া গেছে।');
        } else {
            showError(`❌ ত্রুটি: ${error.message}`);
        }
    }
}

// ===============================================
// ✅ Display Success Result
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
    statusBadge.className = `status-badge ${STATUS_CONFIG[status] || 'pending'}`;
    
    // Show result, hide error
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
}

// ===============================================
// ❌ Show Error Message
// ===============================================

function showError(message) {
    const errorDiv = document.getElementById('error');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
}

// ===============================================
// 🛠️ Utility Functions
// ===============================================

function formatDate(dateStr) {
    if (!dateStr || dateStr === 'N/A') return 'N/A';
    
    try {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('bn-BD', options);
    } catch (e) {
        return dateStr;
    }
}

// ===============================================
// 🎯 Event Listeners
// ===============================================

// Allow searching by pressing Enter
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('#appId, #passportNo');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchVisa();
            }
        });
    });
});

// Auto-focus on App ID input when page loads
window.addEventListener('load', () => {
    document.getElementById('appId').focus();
});

// ===============================================
// 📱 PWA Support (Optional)
// ===============================================

if ('serviceWorker' in navigator) {
    // Service Worker registration code can go here
    // for offline support in future
}

// Log version info
console.log('🛂 Visa Checker Frontend Loaded');
console.log('API URL:', API_URL);
