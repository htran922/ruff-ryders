import express from "express"
import clientRouter from "./clientRouter.js"
import petTypeRouter from "./api/v1/petTypeRouter.js"
import adoptablePetsRouter from "./api/v1/adoptablePetsRouter.js"
import adoptionApplicationRouter from "./api/v1/adoptionApplicationRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/pet-types", petTypeRouter)
rootRouter.use("/api/v1/adoptable-pets", adoptablePetsRouter)
rootRouter.use("/api/v1/adoption-application", adoptionApplicationRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
