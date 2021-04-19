import pg from "pg"
import path from "path"
// import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const typeQuery =
  "INSERT INTO pet_types (type, img_url, description) VALUES ('cat','client/public/images/Black Cat Clipart 2 59347.png','Meows a lot.'), ('dog','client/public/images/Dog Bone Clipart 22434.png', 'Barks a lot.'), ('fox', 'client/public/images/Fox Clipart 181.jpeg','Says, hehehe.');"

class Seeder {
  static async seedPetTypes() {
    try {
      const results = await pool.query(typeQuery)
      pool.end()
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default Seeder
