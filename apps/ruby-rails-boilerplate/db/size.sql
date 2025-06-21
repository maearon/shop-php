CREATE TABLE sizes (
  id SERIAL PRIMARY KEY,
  label VARCHAR(20) NOT NULL,
  system VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (label, system)
);

ALTER TABLE sizes ADD COLUMN location VARCHAR(10);
ALTER TABLE sizes ADD COLUMN stock INTEGER DEFAULT 0;


ALTER TABLE sizes DROP CONSTRAINT IF EXISTS sizes_label_system_key;

ALTER TABLE sizes
ADD CONSTRAINT sizes_label_system_location_key UNIQUE (label, system, location);


INSERT INTO sizes (label, system, location, stock, created_at, updated_at)
VALUES
  ('XS', 'alpha', 'VN', FLOOR(RANDOM() * 41 + 10), NOW(), NOW()),
  ('S',  'alpha', 'VN', FLOOR(RANDOM() * 41 + 10), NOW(), NOW()),
  ('M',  'alpha', 'VN', FLOOR(RANDOM() * 41 + 10), NOW(), NOW()),
  ('L',  'alpha', 'VN', FLOOR(RANDOM() * 41 + 10), NOW(), NOW()),
  ('XL', 'alpha', 'VN', FLOOR(RANDOM() * 41 + 10), NOW(), NOW()),
  ('XXL','alpha', 'VN', FLOOR(RANDOM() * 41 + 10), NOW(), NOW());


ALTER TABLE sizes DROP COLUMN stock;
