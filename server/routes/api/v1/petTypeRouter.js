import express from "express"
import PetType from "../../../models/PetType.js"

const petTypeRouter = new express.Router()

petTypeRouter.get("/", (req, res) => {
  debugger
  // try {
  //   const petTypes = await PetType.findAll()
  //   res.json({ petTypes })
  // } catch (error) {
  //   console.log(`Error: ${error}`)
  //   res.status(500).json({ error: error })
  // }
  res.send("hey")
})

export default petTypeRouter
