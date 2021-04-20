import pg from "pg"
import path from "path"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const typeQuery =
  "INSERT INTO pet_types (type, img_url, description) VALUES ('cat','https://clipartix.com/wp-content/uploads/2019/02/black-cat-clipart-2-2019-10.png','Meows a lot.'), ('dog','https://clipartix.com/wp-content/uploads/2016/12/Dogs-dog-and-cat-silhouette-clip-art-free.jpg', 'Barks a lot.'), ('fox', 'https://clipartix.com/wp-content/uploads/2016/03/Red-fox-clip-art-free-clipart-images.jpg','Says, hehehe.');"

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
