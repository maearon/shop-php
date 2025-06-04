-- CREATE TABLE microposts (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     content VARCHAR(140) NOT NULL,
--     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- CREATE INDEX idx_microposts_user_id ON microposts(user_id);
-- CREATE INDEX idx_microposts_created_at ON microposts(created_at DESC);

