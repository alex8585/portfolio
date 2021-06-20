import express from "express"
const router = express.Router()
import {
  getTags,
  getTagById,
  deleteTag,
  createTag,
  updateTag,
  getTagsByIds,
} from "../controllers/tagController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").get(protect, admin, getTags).post(protect, admin, createTag)

router.route("/by-ids").get(getTagsByIds)

router
  .route("/:id")
  .get(protect, admin, getTagById)
  .delete(protect, admin, deleteTag)
  .put(protect, admin, updateTag)

export default router
