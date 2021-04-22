import pg from "pg"
import path from "path"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

class SurrenderApplication {
  constructor({
    id,
    name,
    phoneNumber,
    phone_number,
    email,
    petName,
    petAge,
    petType,pet_type_id,
    petImage,img_url,
    vaccinationStatus,vaccination_status,
    adoptablePetId
  }) {
    this.id = id
    this.name = name
    this.phoneNumber = phoneNumber || phone_number
    this.email = email
    this.petName = petName
    this.petAge = petAge  || NULL
    this.petType = petType || pet_type_id
    this.petImage = petImage || img_url
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptablePetId = adoptablePetId
  }

  async saveAdopt() {
    try {
      const queryOne = "INSERT INTO adoptable_pets(name,img_url, age, vaccination_status, pet_type_id) VALUES ($1,$2, $3, $4, (SELECT id FROM pet_types WHERE type = $5 LIMIT 1)) RETURNING id;"

      const resultOne = await pool.query(queryOne, [this.petName, this.petImage, this.petAge, this.vaccinationStatus,this.petType])
      const newInsertOne = resultOne.rows[0].id
      this.adoptablePetId = newInsertOne
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async saveSurrender() {
    try {
      const queryTwo = "INSERT INTO surrender_applications (adoptable_pet_id, name, phone_number, email ) VALUES ($1,$2,$3,$4) RETURNING id;"
      const resultTwo = await pool.query(queryTwo, [this.adoptablePetId, this.name, this.phoneNumber, this.email])
      const newInsertTwo = resultTwo.rows[0].id
      this.id = newInsertTwo

    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default SurrenderApplication
