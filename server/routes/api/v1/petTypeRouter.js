import express from "express"
import PetType from "../../../models/PetType.js"
import AdoptablePet from "../../../models/AdoptablePet.js"

const petTypeRouter = new express.Router()

petTypeRouter.get("/", async (req, res) => {
  try {
    const petTypes = await PetType.findAll()
    res.status(200).json({ petTypes })
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({ error: error })
  }
})

petTypeRouter.get("/:type", async (req, res) => {
  try {
    const adoptablePets = await AdoptablePet.findByType(req.params.type)
    res.status(200).json({ adoptablePets })
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

export default petTypeRouter
