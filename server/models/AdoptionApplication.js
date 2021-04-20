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
}

export default AdoptionApplication
