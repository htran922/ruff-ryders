import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db" })

class Seeder {
  static async seed() {
    // your seeder code here
  }
}

export default Seeder
