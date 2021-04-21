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

  static async getAvaliblePets(petType) {
    try {
      const petsByType = await this.findById(petType)

      const avaliblePets = petsByType.map(pet => {
        if(pet.availableForAdoption){
          return pet
        }
      })

      const finalResults =[]
      for (let index = 0; index < avaliblePets.length; index++) {
        const pet = avaliblePets[index];
        if(await pet.getSurrendAppliaction()){
          finalResults.push(pet) 
        }
      }
      return finalResults
    }catch (error) {
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

  async getSurrendAppliaction(){
    try {
      const surrenderApp = await import('./SurrenderApplication.js') 
      const SurrenderApplication = surrenderApp.defult

      const relatedPetDataQuery = "Select * FROM surrender_applications WHERE adoptable_pet_id = $1;"

      const resultsData = await pool.query(relatedPetDataQuery, [this.id])
      const result = resultsData.map(result => new SurrenderApplication(result))

      if(resultsData.status === 'approved'){
        return true
      } else {
        return false
      }

    } catch (error) {
      console.error("MODEL ERROR")
      console.error(error)
      throw error
    }
  }

}

export default AdoptablePet
