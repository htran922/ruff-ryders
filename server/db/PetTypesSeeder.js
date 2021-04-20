import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const petTypesPath = path.join(__dirname, "../../petTypes.txt")

class PetTypesSeeder {
  static async seed() {
    LineReader.eachLine(petTypesPath, async (line, last, done) => {
      const [type, img_url, description] = line.split(";")
      const queryString = "INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3);"
      try {
        const result = await pool.query(queryString, [type, img_url, description])
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

export default PetTypesSeeder
