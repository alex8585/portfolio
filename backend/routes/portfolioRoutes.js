import express from "express"
const router = express.Router()
//import multer from "multer"
import uploadMiddleware from "../middleware/uploadMiddleware.js"
//var upload = multer({ dest: "uploads/" })
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
  .get(getPortfolios)
  .post(protect, admin, uploadMiddleware.single("img"), createPortfolio)

router
  .route("/:id")
  .get(protect, admin, getPortfolioById)
  .delete(protect, admin, deletePortfolio)
  .put(protect, admin, uploadMiddleware.single("img"), updatePortfolio)

export default router
