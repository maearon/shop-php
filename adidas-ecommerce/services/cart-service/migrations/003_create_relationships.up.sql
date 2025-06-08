-- CREATE TABLE relationships (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     followed_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     UNIQUE(follower_id, followed_id)
-- );

-- CREATE INDEX idx_relationships_follower_id ON relationships(follower_id);
-- CREATE INDEX idx_relationships_followed_id ON relationships(followed_id);
-- CREATE INDEX idx_relationships_follower_followed ON relationships(follower_id, followed_id);

