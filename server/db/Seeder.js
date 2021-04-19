import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const adoptablePetsPath = path.join(__dirname, "../../adoptablepets.txt")
class Seeder {
  static async seedAdoptablePets() {
 
    LineReader.eachLine(adoptablePetsPath, async (line, last, done) => {
      const [name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id] = line.split(";")
      
      const queryString = "INSERT INTO adoptable_pets  (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id ) VALUES ($1, $2, $3, $4, $5, $6, $7);"

      try {
        const result = await pool.query(queryString, [name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id])
        if (last) {
     
          console.log("Seeding Complete")
          pool.end()
        }
        done()
      } catch (error) {
        console.log(`Error: ${error}`)
        done()
      }
    })
  }

}


export default Seeder
