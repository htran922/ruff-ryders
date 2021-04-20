import express from "express"

import AdoptablePet from "../../../models/AdoptablePet.js"

const adoptablePetsRouter = new express.Router()

adoptablePetsRouter.get('/:type', async (req,res)=>{
  try {
    const adoptablePets= await AdoptablePet.findByType(req.params.type)
    res.json({adoptablePets})
  }catch(error) {
    console.log("Router Error")
    console.error(error)
    res.status(500).json({ errors: error })
  }

})

export default adoptablePetsRouter