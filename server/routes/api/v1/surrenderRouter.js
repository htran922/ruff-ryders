import express from "express"
import SurrenderApplication from "../../../models/SurrenderApplication.js"
import AdoptablePet from "../../../models/AdoptablePet.js"
import PetType from "../../../models/PetType.js"

const surrenderRouter = new express.Router()


surrenderRouter.post('/', async (req, res) => {

  try {
    const surrenderData = req.body
    const petData = req.body
    const petId = await PetType.getTypeNameID(req.body.petType)
  
    const newSurrender = new SurrenderApplication({ name:surrenderData.name, phoneNumber: surrenderData.phoneNumber, email: surrenderData.email})
    
    const newAdoptablePet = new AdoptablePet({name: petData.petName, imgUrl: petData.petImage, age: petData.petAge, vaccinationStatus: petData.vaccinationStatus, petTypeId: petId.id})
 
    debugger
    await newSurrender.save()
    await newAdoptablePet.save()

    res.status(201).json({ surrender: newSurrender })

  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})



export default surrenderRouter
