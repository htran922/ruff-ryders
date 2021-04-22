import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

class AdoptablePet {
  constructor({
    id,
    name,
    img_url,
    imgUrl,
    age,
    vaccination_status,
    vaccinationStatus,
    adoption_story,
    adoptionStory,
    available_for_adoption,
    availableForAdoption,
    pet_type_id,
    petTypeId
  }) {
    this.id = id
    this.name = name
    this.imgUrl = img_url || imgUrl
    this.age = age
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptionStory = adoptionStory || adoption_story
    this.availableForAdoption = availableForAdoption || available_for_adoption
    this.petTypeId = petTypeId || pet_type_id
  }

  static async findByType(petType) {
    try {
      const result = await pool.query(
        "SELECT * FROM adoptable_pets WHERE pet_type_id IN (SELECT id FROM pet_types WHERE type = $1);",
        [petType]
      )

      const adoptablePetsData = result.rows
      const adoptablePets = adoptablePetsData.map(adoptablePet => new this(adoptablePet))
      return adoptablePets
    } catch (error) {
      console.error("MODEL ERROR")
      console.error(error)
      throw error
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query("SELECT * FROM adoptable_pets WHERE id = $1;", [id])
      const adoptablePetData = result.rows[0]
      const adoptablePet = new this(adoptablePetData)
      return adoptablePet
    } catch (error) {
      console.error("MODEL ERROR")
      console.error(error)
      throw error
    }
  }

  async save() {
    try {
      const queryOne = "INSERT INTO adoptable_pets(name,img_url, age, vaccination_status, pet_type_id) VALUES ($1,$2, $3, $4, (SELECT id FROM pet_types WHERE type = $5 LIMIT 1)) RETURNING id;"

      const resultOne = await pool.query(queryOne, [this.name, this.imgUrl, this.age, this.vaccinationStatus, this.petTypeId])
      const newInsertOne = resultOne.rows[0].id
      this.adoptablePetId = newInsertOne

    } catch (error) {
      console.error(error)
      throw error
    }
  }

}

export default AdoptablePet
