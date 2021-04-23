import express from "express"

import AdoptionApplication from "../../../models/AdoptionApplication.js"

const adoptionApplicationRouter = new express.Router()

adoptionApplicationRouter.post("/", async (req, res) => { 
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

export default adoptionApplicationRouter
