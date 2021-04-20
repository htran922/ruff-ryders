import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const petSurrenderApplicationsPath = path.join(__dirname, "../../petSurrenderApplications.txt")

class PetSurrenderApplicationsSeeder {
  static async seed() {
    LineReader.eachLine(petSurrenderApplicationsPath, async (line, last, done) => {
      const [
        name,
        phone_number,
        email,
        pet_name,
        pet_age,
        pet_type_id,
        pet_image_url,
        vaccination_status,
        application_status
      ] = line.split(";")
      const queryString =
        "INSERT INTO adoption_applications (name, phone_number, email, pet_name, pet_age, pet_type_id, pet_image_url, vaccination_status, application_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);"
      try {
        const result = await pool.query(queryString, [
          name,
          phone_number,
          email,
          pet_name,
          pet_age,
          pet_type_id,
          pet_image_url,
          vaccination_status,
          application_status
        ])
        if (last) {
          // Drain pool because we are done connecting
          console.log("Seeding Complete")
          pool.end()
        }
        done()
      } catch (error) {
        console.log(`Error: ${error}`)
        pool.end()
      }
    })
  }
}

export default PetSurrenderApplicationsSeeder
