import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

class PetType {
  constructor({ id, type, imgUrl, img_url, description }) {
    this.id = id
    this.type = type
    this.imgUrl = imgUrl || img_url
    this.description = description
  }

  static async findAll() {
    try {
      const results = await pool.query("SELECT * FROM pet_types;")
      const petTypesData = results.rows
      const petTypes = petTypesData.map(type => new this(type))
      console.log(petTypes)
      return petTypes
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default PetType
