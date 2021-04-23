import express from "express"

import AdoptablePet from "../../../models/AdoptablePet.js"

const adoptablePetsRouter = new express.Router()

adoptablePetsRouter.get("/:type/:id", async (req, res) => {
  try {
    const allPetsOfAType = await AdoptablePet.findByType(req.params.type)

    let adoptablePet
    allPetsOfAType.forEach((pet) => {

      if (pet.id == req.params.id){
         adoptablePet = pet
      }
    })
    res.status(200).json({ adoptablePet })
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

export default adoptablePetsRouter
