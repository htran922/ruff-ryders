import express from "express"
import clientRouter from "./clientRouter.js"
import petTypeRouter from "./api/v1/petTypeRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/pet-types", petTypeRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
