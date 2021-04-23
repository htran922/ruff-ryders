import pg from "pg"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/ruff_ryders_db"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const petTypesPath = path.join(__dirname, "../../petTypes.json")
const adoptablePetsPath = path.join(__dirname, "../../adoptablePets.json")
const surrenderApplicationsPath = path.join(__dirname, "../../surrenderApplications.json")

class Seeder {
  static async seed() {
    try {
      const petTypesData = JSON.parse(fs.readFileSync(petTypesPath)).petTypes
      const adoptablePetsData = JSON.parse(fs.readFileSync(adoptablePetsPath)).adoptablePets
      const surrenderApplicationsData = JSON.parse(fs.readFileSync(surrenderApplicationsPath)).surrenderApplication

      for (let i = 0; i < petTypesData.length; i++) {
        const petType = petTypesData[i]
        const { type, img_url, description } = petType
        const queryString =
          "INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3);"
        await pool.query(queryString, [type, img_url, description])
      }

      const catData = await pool.query("SELECT * FROM pet_types WHERE type = 'cat';")
      const cat = catData.rows[0]
      const dogData = await pool.query("SELECT * FROM pet_types WHERE type = 'dog';")
      const dog = dogData.rows[0]
      const foxData = await pool.query("SELECT * FROM pet_types WHERE type = 'fox';")
      const fox = foxData.rows[0]

      const petIds = []
      for (let i = 0; i < adoptablePetsData.length; i++) {
        const adoptablePet = adoptablePetsData[i]
        switch (adoptablePet.type) {
          case "cat":
            adoptablePet.type = cat
            break
          case "dog":
            adoptablePet.type = dog
            break
          case "fox":
            adoptablePet.type = fox
            break
          default:
            break
        }
        const {
          name,
          img_url,
          age,
          vaccination_status,
          adoption_story,
          available_for_adoption
        } = adoptablePet
        petIds[name] = i + 1
        const queryString =
          "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7);"
        await pool.query(queryString, [
          name,
          img_url,
          age,
          vaccination_status,
          adoption_story,
          available_for_adoption,
          adoptablePet.type.id
        ])
      }

      for(let i = 0; i < surrenderApplicationsData.length; i++){
        const surrenderApplication = surrenderApplicationsData[i]
        const {
          pet_name,
          name,
          phone_number,
          email,
          status
        } = surrenderApplication
        const thisPetId = petIds[pet_name]
        
        const appQueryString = 
          "INSERT INTO surrender_applications (adoptable_pet_id, name, phone_number, email, status) VALUES ($1, $2, $3, $4, $5);"
          await pool.query(appQueryString, [
            thisPetId,
            name,
            phone_number,
            email,
            status
          ])
      }
      console.log("Seeding complete")
      pool.end()
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default Seeder
