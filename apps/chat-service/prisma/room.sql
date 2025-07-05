DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TYPE IF EXISTS "MessageType" CASCADE;

CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'FILE');

CREATE TABLE rooms (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  type             TEXT NOT NULL DEFAULT 'public',
  last_message     TEXT,
  last_message_at  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE messages (
  id          TEXT PRIMARY KEY,
  content     TEXT NOT NULL,
  type        "MessageType" DEFAULT 'TEXT',

  room_id     TEXT NOT NULL,
  user_id     TEXT NOT NULL,

  created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_room FOREIGN KEY (room_id)
    REFERENCES rooms(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE INDEX index_messages_on_user_id
  ON messages (user_id);

CREATE INDEX index_messages_on_user_id_and_created_at
  ON messages (user_id, created_at);

CREATE INDEX index_messages_on_room_id
  ON messages (room_id);

CREATE INDEX index_messages_on_room_id_and_created_at
  ON messages (room_id, created_at);

