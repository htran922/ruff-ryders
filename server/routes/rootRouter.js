import express from "express"
import clientRouter from "./clientRouter.js"
import petTypeRouter from "./api/v1/petTypeRouter.js"
import adoptablePetsRouter from "./api/v1/adoptablePetsRouter.js"
import surrenderRouter from "./api/v1/surrenderRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/pet-types", petTypeRouter)
rootRouter.use("/api/v1/adoptable-pets", adoptablePetsRouter)
rootRouter.use("/api/v1/adoptions", surrenderRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
