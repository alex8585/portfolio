import express from "express"
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUsersByIds,
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.post("/login", authUser)
router
  .route("/profile")
  .get(protect, admin, getUserProfile)
  .put(protect, admin, updateUserProfile)

router.route("/by-ids").get(getUsersByIds)

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
