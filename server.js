// ========================================
// 🔧 VISA CHECKER BACKEND
// ========================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
dotenv.config();

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== DATABASE CONNECTION ==========
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'visa_db'
});

// Test database connection
pool.on('connect', () => {
    console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
    console.error('❌ Database error:', err);
});

// ========== API ROUTES ==========

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Visa Checker Backend is running' });
});

// ✅ Main Search Endpoint
app.post('/api/search', async (req, res) => {
    const { appId, passportNo } = req.body;

    // Input validation
    if (!appId || !passportNo) {
        return res.status(400).json({
            status: 'error',
            message: 'অনুগ্রহ করে Application ID এবং Passport Number প্রদান করুন'
        });
    }

    try {
        // Query database
        const result = await pool.query(
            `SELECT 
                id,
                app_id,
                passport_no,
                applicant_name,
                status,
                created_at,
                updated_at
             FROM applications 
             WHERE UPPER(app_id) = UPPER($1) 
             AND UPPER(passport_no) = UPPER($2)
             LIMIT 1`,
            [appId.trim(), passportNo.trim()]
        );

        if (result.rows.length > 0) {
            const applicant = result.rows[0];
            return res.json({
                status: 'success',
                data: {
                    app_id: applicant.app_id,
                    passport_no: applicant.passport_no,
                    applicant_name: applicant.applicant_name,
                    status: applicant.status,
                    created_at: applicant.created_at,
                    updated_at: applicant.updated_at
                }
            });
        } else {
            return res.json({
                status: 'error',
                message: 'কোনো রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে তথ্য যাচাই করুন।'
            });
        }

    } catch (error) {
        console.error('Search Error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'সার্ভারে সমস্যা হয়েছে। পরে চেষ্টা করুন।'
        });
    }
});

// Get all applications (Admin only)
app.get('/api/applications', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM applications ORDER BY created_at DESC LIMIT 100'
        );
        res.json({
            status: 'success',
            data: result.rows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'ডাটা পেতে ব্যর্থ'
        });
    }
});

// Add new application (Admin)
app.post('/api/applications', async (req, res) => {
    const { appId, passportNo, applicantName, status } = req.body;

    if (!appId || !passportNo) {
        return res.status(400).json({
            status: 'error',
            message: 'App ID এবং Passport Number আবশ্যক'
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO applications (app_id, passport_no, applicant_name, status)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [appId, passportNo, applicantName || 'Unknown', status || 'Pending']
        );

        res.json({
            status: 'success',
            message: 'আবেদন যোগ করা হয়েছে',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Insert Error:', error);
        if (error.code === '23505') {
            return res.status(400).json({
                status: 'error',
                message: 'এই Application ID ইতিমধ্যে বিদ্যমান'
            });
        }
        res.status(500).json({
            status: 'error',
            message: 'যোগ করতে ব্যর্থ'
        });
    }
});

// Update application status
app.put('/api/applications/:id', async (req, res) => {
    const { id } = req.params;
    const { status, applicantName } = req.body;

    try {
        const result = await pool.query(
            `UPDATE applications 
             SET status = COALESCE($1, status),
                 applicant_name = COALESCE($2, applicant_name),
                 updated_at = NOW()
             WHERE id = $3
             RETURNING *`,
            [status, applicantName, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'রেকর্ড পাওয়া যায়নি'
            });
        }

        res.json({
            status: 'success',
            message: 'আপডেট সফল',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'আপডেট ব্যর্থ'
        });
    }
});

// Delete application
app.delete('/api/applications/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM applications WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'রেকর্ড পাওয়া যায়নি'
            });
        }

        res.json({
            status: 'success',
            message: 'ডিলিট সফল'
        });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'ডিলিট ব্যর্থ'
        });
    }
});

// ========== ERROR HANDLING ==========
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'এন্ডপয়েন্ট পাওয়া যায়নি'
    });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
    🚀 Visa Checker Backend
    ✅ Server running on: http://localhost:${PORT}
    📊 Database: PostgreSQL
    🔗 API: POST /api/search
    ⚡ CORS Enabled
    `);
});

module.exports = app;
