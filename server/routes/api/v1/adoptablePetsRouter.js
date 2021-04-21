import express from "express"

import AdoptablePet from "../../../models/AdoptablePet.js"
import AdoptionApplication from "../../../models/AdoptionApplication.js"

const adoptablePetsRouter = new express.Router()

adoptablePetsRouter.get("/:type", async (req, res) => {
  try {
    const adoptablePets = await AdoptablePet.findByType(req.params.type)
    res.status(200).json({ adoptablePets })
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

adoptablePetsRouter.get("/:type/:id", async (req, res) => {
  try {
    const adoptablePet = await AdoptablePet.findById(req.params.id)
    res.json({ adoptablePet })
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

adoptablePetsRouter.post("/:type/:id", async (req, res) => {
  try {
    const newAdoptionApplication = new AdoptionApplication(req.body)
    if (await newAdoptionApplication.save()) {
      res.status(201).json({ adoptionApplication: newAdoptionApplication })
    } else {
      res.status(422).json({ errors: newAdoptionApplication.errors })
    }
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})


export default adoptablePetsRouter
