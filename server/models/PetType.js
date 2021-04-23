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
      const typeNameId = results.rows
      const petTypes = typeNameId.map(type => new this(type))
      return petTypes
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async getTypeNameID(typeName) {
    try {
      const queryString = "SELECT id FROM pet_types WHERE type = $1"
      const result = await pool.query(queryString, [typeName])
      const typeNameId = result.rows[0]
      return typeNameId
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default PetType
