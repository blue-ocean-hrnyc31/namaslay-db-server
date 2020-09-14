CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  username VARCHAR,
  password VARCHAR,
  visit_count INTEGER,
  total_mins INTEGER,
  account_created TIMESTAMP
);

INSERT INTO users (
  first_name,
  last_name,
  username,
  password,
  visit_count,
  total_mins,
  account_created
) VALUES (
  'Deo',
  'Ruplall',
  'druplall',
  'password@',
  0,
  50,
  CURRENT_TIMESTAMP
)

INSERT INTO users (
  first_name,
  last_name,
  username,
  password,
  visit_count,
  total_mins,
  account_created
) VALUES (
  'John',
  'Smith',
  'jSmith',
  'YoudontKnow@',
  20,
  100,
  CURRENT_TIMESTAMP
)