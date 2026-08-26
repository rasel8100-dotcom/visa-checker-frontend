:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --success: #27ae60;
    --danger: #e74c3c;
    --warning: #f39c12;
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --bg-light: #f8f9fa;
    --border-color: #e0e0e0;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: var(--text-dark);
}

.container {
    width: 100%;
    max-width: 550px;
}

.card {
    background: white;
    padding: 45px;
    border-radius: 16px;
    box-shadow: var(--shadow);
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.header {
    text-align: center;
    margin-bottom: 35px;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    color: var(--text-light);
    font-size: 0.95em;
    font-weight: 400;
}

.search-form {
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 25px;
}

label {
    display: block;
    margin-bottom: 10px;
    color: var(--text-dark);
    font-weight: 600;
    font-size: 0.95em;
}

input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid var(--border-color);
    border-radius: 10px;
    font-size: 1em;
    transition: all 0.3s ease;
    background: white;
    color: var(--text-dark);
}

input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
}

input::placeholder {
    color: #bbb;
}

.btn-search {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.05em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-search:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-search:active {
    transform: translateY(-1px);
}

.btn-search:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Loading State */
.loading {
    text-align: center;
    padding: 40px 20px;
    margin-top: 30px;
}

.loading.hidden {
    display: none;
}

.spinner {
    border: 4px solid var(--bg-light);
    border-top: 4px solid var(--primary);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading p {
    color: var(--text-light);
    font-size: 0.95em;
    margin-top: 10px;
}

/* Result Container */
.result-container {
    margin-top: 30px;
    animation: fadeIn 0.3s ease;
}

.result-container.hidden {
    display: none;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.result-success {
    background: #f0fdf4;
    border: 2px solid #86efac;
    border-radius: 12px;
    padding: 25px;
}

.result-success h3 {
    color: var(--success);
    margin-bottom: 20px;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    gap: 8px;
}

.result-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(132, 204, 22, 0.2);
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    font-weight: 600;
    color: var(--text-dark);
    font-size: 0.95em;
}

.info-value {
    color: var(--text-light);
    text-align: right;
    max-width: 50%;
    word-break: break-word;
}

.status-row .info-value {
    text-align: right;
}

.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.85em;
    display: inline-block;
}

.status-badge.approved {
    background: #d1fae5;
    color: #065f46;
}

.status-badge.pending {
    background: #fef3c7;
    color: #92400e;
}

.status-badge.rejected {
    background: #fee2e2;
    color: #7f1d1d;
}

.status-badge.processing {
    background: #dbeafe;
    color: #1e40af;
}

.btn-new-search {
    width: 100%;
    padding: 10px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.95em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-new-search:hover {
    background: var(--secondary);
    transform: translateY(-2px);
}

/* Error Message */
.error-message {
    margin-top: 30px;
    padding: 20px;
    background: #fef2f2;
    border: 2px solid #fecaca;
    border-radius: 12px;
    color: var(--danger);
    text-align: center;
    animation: fadeIn 0.3s ease;
}

.error-message.hidden {
    display: none;
}

.error-message p {
    font-size: 0.95em;
    margin: 0;
    line-height: 1.5;
}

/* Footer */
.footer {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
    text-align: center;
}

.footer-text {
    font-size: 0.8em;
    color: var(--text-light);
    line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
    .card {
        padding: 30px 20px;
    }
    
    h1 {
        font-size: 2em;
    }
    
    .subtitle {
        font-size: 0.9em;
    }
    
    .info-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .info-value {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .card {
        padding: 20px;
    }
    
    h1 {
        font-size: 1.8em;
    }
    
    .header {
        margin-bottom: 25px;
    }
    
    .form-group {
        margin-bottom: 18px;
    }
}

/* Utility Classes */
.hidden {
    display: none !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
