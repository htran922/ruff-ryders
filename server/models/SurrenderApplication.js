import pg from "pg"

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
    petType, pet_type_id,
    petImage, img_url,
    vaccinationStatus, vaccination_status,
    adoptablePetId
  }) {
    this.id = id
    this.name = name
    this.phoneNumber = phoneNumber || phone_number
    this.email = email
    this.petName = petName
    this.petAge = petAge
    this.petType = petType || pet_type_id
    this.petImage = petImage || img_url
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptablePetId = adoptablePetId
  }

  async save() {
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
