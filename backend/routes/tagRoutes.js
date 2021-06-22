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
import uploadMiddleware from "../middleware/uploadMiddleware.js"

router
  .route("/")
  .get(protect, admin, getTags)
  .post(protect, admin, uploadMiddleware.single("img"), createTag)

router.route("/by-ids").get(getTagsByIds)

router
  .route("/:id")
  .get(protect, admin, getTagById)
  .delete(protect, admin, deleteTag)
  .put(protect, admin, uploadMiddleware.single("img"), updateTag)

export default router
