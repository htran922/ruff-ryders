import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const surrenderApplicationsPath = path.join(__dirname, "../../surrenderApplications.txt")

class SurrenderApplicationsSeeder {
  static async seed() {
    LineReader.eachLine(surrenderApplicationsPath, async (line, last, done) => {
      const [adoptable_pet_id, name, phone_number, email, status] = line.split(";")
      const queryString =
        "INSERT INTO surrender_applications (adoptable_pet_id, name, phone_number, email, status)  VALUES ($1, $2, $3, $4, $5);"
      try {
        const result = await pool.query(queryString, [
          adoptable_pet_id,
          name,
          phone_number,
          email,
          status
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

export default SurrenderApplicationsSeeder
