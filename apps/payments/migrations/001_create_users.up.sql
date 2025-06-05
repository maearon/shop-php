-- Enable UUID extension if not already enabled
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CREATE TABLE users (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password_hash VARCHAR(255) NOT NULL,
--     admin BOOLEAN DEFAULT FALSE,
--     activated BOOLEAN DEFAULT FALSE,
--     activation_digest VARCHAR(255),
--     activated_at TIMESTAMP,
--     reset_digest VARCHAR(255),
--     reset_sent_at TIMESTAMP,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- CREATE INDEX idx_users_email ON users(email);
-- CREATE INDEX idx_users_activated ON users(activated);
