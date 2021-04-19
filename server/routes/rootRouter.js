import express from "express"
import clientRouter from "./clientRouter.js"
import adoptablePetsRouter from "./api/v1/adoptablePetsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/adoptable-pets", adoptablePetsRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
