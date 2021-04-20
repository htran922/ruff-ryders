import express from "express"

const router = new express.Router()

const clientRoutes = ["/", "/pets", '/adoptionForm']
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
