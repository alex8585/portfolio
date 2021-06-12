import express from "express"
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
//protect, admin,
router.route("/").get(getProducts).post(createProduct)
router.route("/:id/reviews").post(createProductReview)
router.get("/top", getTopProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct)

export default router
