import express from "express"

import AdoptablePet from "../../../models/AdoptablePet.js"

const adoptablePetsRouter = new express.Router()

adoptablePetsRouter.get("/:id", async (req, res) => {
  try {
    const adoptablePet = await AdoptablePet.findById(req.params.id)
    res.status(200).json({ adoptablePet })
  } catch (error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

export default adoptablePetsRouter
