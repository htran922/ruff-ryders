DROP TABLE IF EXISTS pet_types;

CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  description TEXT
);

DROP TABLE IF EXISTS adoption_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number INT(11) NOT NULL,
  
)


