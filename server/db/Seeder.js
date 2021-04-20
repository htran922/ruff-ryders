import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const adoptablePetsPath = path.join(__dirname, "../../adoptablePets.txt")
class Seeder {
  static async seedPetTypes() {
    const typeQuery =
      "INSERT INTO pet_types (type, img_url, description) VALUES ('cat','https://clipartix.com/wp-content/uploads/2019/02/black-cat-clipart-2-2019-10.png','Meows a lot.'), ('dog','https://clipartix.com/wp-content/uploads/2016/12/Dogs-dog-and-cat-silhouette-clip-art-free.jpg', 'Barks a lot.'), ('fox', 'https://clipartix.com/wp-content/uploads/2016/03/Red-fox-clip-art-free-clipart-images.jpg','Says, hehehe.');"

    try {
      const results = await pool.query(typeQuery)
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }

  static async seedAdoptablePets() {
    LineReader.eachLine(adoptablePetsPath, async (line, last, done) => {
      const [
        name,
        img_url,
        age,
        vaccination_status,
        adoption_story,
        available_for_adoption,
        pet_type_id
      ] = line.split(";")

      const queryString =
        "INSERT INTO adoptable_pets  (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id ) VALUES ($1, $2, $3, $4, $5, $6, $7);"

      try {
        const result = await pool.query(queryString, [
          name,
          img_url,
          age,
          vaccination_status,
          adoption_story,
          available_for_adoption,
          pet_type_id
        ])
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
