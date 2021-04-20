import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const adoptionApplicationsPath = path.join(__dirname, "../../adoptionApplications.txt")

class AdoptionApplicationsSeeder {
  static async seed() {
    LineReader.eachLine(adoptionApplicationsPath, async (line, last, done) => {
      const [
        name,
        phone_number,
        email,
        home_status,
        application_status,
        adoptable_pet_id
      ] = line.split(";")
      const queryString =
        "INSERT INTO adoption_applications (name, phone_number, email, home_status, application_status, adoptable_pet_id) VALUES ($1, $2, $3, $4, $5, $6);"
      try {
        const result = await pool.query(queryString, [
          name,
          phone_number,
          email,
          home_status,
          application_status,
          adoptable_pet_id
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

export default AdoptionApplicationsSeeder
