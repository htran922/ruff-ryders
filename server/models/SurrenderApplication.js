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
    email,
    petName,
    petAge,
    petType,
    petImage,
    vaccinationStatus
  }) {
    this.id = id
    this.name = name
    this.phoneNumber = phone_number || phoneNumber
    this.email = email
    this.petName = petName
    this.petAge = petAge
    this.petType = petType || pet_type
    this.petImage = petImage || img_url
    this.vaccinationStatus = vaccinationStatus || vaccination_status
  }

  static async findAll() {
    try {
      const results = await pool.query("SELECT * FROM surrender_applications;")
      const surrenderData = results.rows
      const surrenderPet = surrenderData.map(pet => new this(pet))
      console.log(surrenderPet)
      return surrenderPet
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async save() {
    try {
      const query = "INSERT INTO surrender_applications (name, phone_number, email, adoptable_pet_id) VALUES ($1,$2, $3,$4) RETURNING id;"
      const result = await pool.query(query, [this.name, this.phoneNumber, this.email])
      const queryTwo = "INSERT INTO adoptable_pets(pet_name, pet_age,pet_type,id) VALUES ($1,$2, $3,$4) RETURNING id;"
      const resultTwo = await pool.query(queryTwo, [this.petName, this.petAge, this.petType])

    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default SurrenderApplication
