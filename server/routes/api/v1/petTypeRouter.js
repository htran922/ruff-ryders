import express from "express"
import PetType from "../../../models/PetType.js"

const petTypeRouter = new express.Router()

petTypeRouter.get("/", async (req, res) => {
  try {
    const petTypes = await PetType.findAll()
    res.json({ petTypes })
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({ error: error })
  }
})

export default petTypeRouter
