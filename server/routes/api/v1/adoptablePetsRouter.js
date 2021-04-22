import express from "express"
import AdoptionForm from "../../../../client/components/AdoptionForm.js"

import AdoptablePet from "../../../models/AdoptablePet.js"
import AdoptionApplication from '../../../models/AdoptionApplication.js'

const adoptablePetsRouter = new express.Router()

adoptablePetsRouter.get("/:type", async (req, res) => {
  try {
    const adoptablePets = await AdoptablePet.findByType(req.params.type)
    res.json({ adoptablePets })
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

adoptablePetsRouter.post('/:type/:id', async (req, res)=>{
  try {
    const newApplication = new AdoptionApplication(req.body)
    const petId = req.params.id
    newApplication.adoptablePetId = petId

    const persistedApp = await newApplication.save()
    res.status(201)
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

export default adoptablePetsRoute