import express from "express"
const router = express.Router()
import {
  getTags,
  getTagById,
  deleteTag,
  createTag,
  updateTag,
} from "../controllers/tagController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").get(protect, admin, getTags).post(protect, admin, createTag)

router
  .route("/:id")
  .get(protect, admin, getTagById)
  .delete(protect, admin, deleteTag)
  .put(protect, admin, updateTag)

export default router
