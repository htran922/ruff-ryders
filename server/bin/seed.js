import PetTypesSeeder from "../db/PetTypesSeeder.js"
import AdoptablePetsSeeder from "../db/AdoptablePetsSeeder.js"
import AdoptionApplicationsSeeder from "../db/AdoptionApplicationsSeeder.js"
import PetSurrenderApplicationsSeeder from "../db/PetSurrenderApplicationsSeeder.js"

await PetTypesSeeder.seed()
await AdoptablePetsSeeder.seed()
await AdoptionApplicationsSeeder.seed()
await PetSurrenderApplicationsSeeder.seed()
