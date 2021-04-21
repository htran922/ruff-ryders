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
        "SELECT * FROM adoptable_pets WHERE pet_type_id IN (SELECT id FROM pet_types WHERE type = $1 )",
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

  static async getAvaliblePets(petType) {
    try {
      const queryString = "SELECT * FROM adoptable_pets JOIN surrender_application ON surrender_application.adoptable_pets_id = adoptable_pets.id WHERE surrender_application.status = 'Approved' AND adoptable_pets.type = $1;" 

      const results = pool.query(queryString, [petType])
      const avaliblePetsData = results.rows
      const avaliblePets = avaliblePetsData.map(avaliblePet => new this(adoptablePet))
      return avaliblePets
    } catch (error) {
      console.error("MODEL ERROR")
      console.error(error)
      throw error
    }
  }

}

export default AdoptablePet
