import pg from "pg"
import path from "path"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

class AdoptionApplication {
  constructor({
    id,
    name,
    phone_number,
    phoneNumber,
    email,
    home_status,
    homeStatus,
    application_status,
    applicationStatus,
    adoptable_pet_id,
    adoptablePetId
  }) {
    this.id = id
    this.name = name
    this.phoneNumber = phone_number || phoneNumber
    this.email = email
    this.homeStatus = homeStatus || home_status
    this.applicationStatus = applicationStatus || application_status || "pending"
    this.adoptablePetId = adoptablePetId || adoptable_pet_id
  }

  async save(){
    try {
      const query = 'INSERT INTO adoption_applications (name, phone_number, email, home_status, application_status, adoptable_pet_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;'

      const result = await pool.query(query, [this.name, this.phoneNumber, this.email, this.homeStatus, this.applicationStatus, this.adoptablePetId])

      const newAppId = result.rows[0].id
      this.id = newAppId
      return true
    } catch (error) {
      console.error(error)
      throw(error)
    }
  }
}

export default AdoptionApplication
