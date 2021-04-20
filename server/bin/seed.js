import PetTypesSeeder from "../db/PetTypesSeeder.js"
import AdoptablePetsSeeder from "../db/AdoptablePetsSeeder.js"
import AdoptionApplicationsSeeder from "../db/AdoptionApplicationsSeeder.js"
import SurrenderApplicationsSeeder from "../db/SurrenderApplicationsSeeder.js"

await PetTypesSeeder.seed()
await AdoptablePetsSeeder.seed()
await AdoptionApplicationsSeeder.seed()
await SurrenderApplicationsSeeder.seed()
