SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default, 
    character_maximum_length, 
    numeric_precision, 
    numeric_scale, 
    datetime_precision,
    udt_name
FROM 
    information_schema.columns
WHERE 
    table_name = 'microposts'
ORDER BY 
    ordinal_position;

create_table :users do |t|
  t.column :created_at, 'timestamptz', null: false, default: -> { 'CURRENT_TIMESTAMP' }
  t.column :updated_at, 'timestamptz', null: false, default: -> { 'CURRENT_TIMESTAMP' }
end

t.datetime :created_at, precision: 6, null: false, default: -> { 'CURRENT_TIMESTAMP' }

execute <<-SQL
  ALTER TABLE your_table_name 
  ALTER COLUMN created_at TYPE timestamptz 
  USING created_at AT TIME ZONE 'UTC';
SQL

created_at timestamp without time zone
updated_at timestamp without time zone

create_table :users do |t|
  t.timestamps
end

execute <<-SQL
  ALTER TABLE users 
  ALTER COLUMN created_at TYPE timestamptz USING created_at AT TIME ZONE 'UTC',
  ALTER COLUMN updated_at TYPE timestamptz USING updated_at AT TIME ZONE 'UTC';
SQL
