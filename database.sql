-- =============================================
-- 🛂 VISA CHECKER DATABASE SETUP
-- =============================================

-- ========== CREATE DATABASE ==========
CREATE DATABASE visa_db;

-- ========== CONNECT TO DATABASE ==========
-- \c visa_db

-- ========== CREATE APPLICATIONS TABLE ==========
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(20) UNIQUE NOT NULL,
    passport_no VARCHAR(20) NOT NULL,
    applicant_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========== CREATE INDEXES ==========
CREATE INDEX idx_app_id ON applications(UPPER(app_id));
CREATE INDEX idx_passport ON applications(UPPER(passport_no));
CREATE INDEX idx_status ON applications(status);

-- ========== INSERT TEST DATA ==========
INSERT INTO applications (app_id, passport_no, applicant_name, status, created_at) 
VALUES 
    ('BGDDVE0BAB26', 'A16193091', 'আহমেদ করিম', 'Approved', NOW()),
    ('APP123456', 'AA1234567', 'রিনা বেগম', 'Processing', NOW()),
    ('APP789012', 'AB9876543', 'হাসান আলী', 'Rejected', NOW() - INTERVAL '5 days'),
    ('VISA001', 'BC1111111', 'ফাতিমা সুলতানা', 'Approved', NOW() - INTERVAL '10 days'),
    ('VISA002', 'BD2222222', 'করিম খান', 'Pending', NOW() - INTERVAL '2 days'),
    ('VISA003', 'BE3333333', 'সিমা ঘোষ', 'Processing', NOW() - INTERVAL '7 days');

-- ========== VERIFY DATA ==========
-- SELECT * FROM applications;
-- SELECT COUNT(*) as total_applications FROM applications;

-- ========== SAMPLE QUERIES ==========
-- Search by App ID and Passport
-- SELECT * FROM applications 
-- WHERE UPPER(app_id) = 'BGDDVE0BAB26' 
-- AND UPPER(passport_no) = 'A16193091';

-- Count by status
-- SELECT status, COUNT(*) FROM applications GROUP BY status;

-- Recent applications
-- SELECT * FROM applications ORDER BY created_at DESC LIMIT 10;
