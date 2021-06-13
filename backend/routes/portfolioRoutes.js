import express from "express"
const router = express.Router()
import {
  getPortfolios,
  getPortfolioById,
  deletePortfolio,
  createPortfolio,
  updatePortfolio,
} from "../controllers/portfolioController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
//protect, admin,
router
  .route("/")
  .get(protect, admin, getPortfolios)
  .post(protect, admin, createPortfolio)

router
  .route("/:id")
  .get(protect, admin, getPortfolioById)
  .delete(protect, admin, deletePortfolio)
  .put(protect, admin, updatePortfolio)

export default router
