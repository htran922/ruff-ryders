import express from "express"
import SurrenderApplication from "../../../models/SurrenderApplication.js"

const surrenderRouter = new express.Router()


surrenderRouter.post('/', async (req, res) => {
  try {
    const surrenderData = req.body
    const newSurrender = new SurrenderApplication(surrenderData)
    await newSurrender.saveAdopt()
    await newSurrender.saveSurrender()

    res.status(201).json({ surrender: newSurrender })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default surrenderRouter
