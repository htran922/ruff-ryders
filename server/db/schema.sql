DROP TABLE IF EXISTS pet_types CASCADE;
DROP TABLE IF EXISTS adoptable_pets CASCADE;

CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE adoptable_pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  age INTEGER, 
  vaccination_status BOOLEAN NOT NULL DEFAULT FALSE,
  adoption_story TEXT NOT NULL,
  available_for_adoption BOOLEAN NOT NULL DEFAULT TRUE,
  pet_type_id INTEGER REFERENCES pet_types(id)
);

INSERT INTO surrender_applications (adoptable_pet_id, name, phone_number, email, status) VALUES ('3', 'Dan Brown', '123-456-7890', 'dan_brown@gmail.com', 'accepted');