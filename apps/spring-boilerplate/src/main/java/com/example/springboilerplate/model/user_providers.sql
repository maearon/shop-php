ALTER TABLE users
ADD COLUMN provider VARCHAR(50);


CREATE TABLE user_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,
  provider_user_id TEXT NOT NULL,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  access_token TEXT,
  refresh_token TEXT,
  raw_data JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE (provider, provider_user_id)
);

SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default 
FROM 
    information_schema.columns 
WHERE 
    table_name = 'users';



DROP TABLE IF EXISTS user_providers;
