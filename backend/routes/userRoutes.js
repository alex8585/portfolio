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

router.route("/").post(registerUser).get(getUsers)
router.post("/login", authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route("/by-ids").get(getUsersByIds)

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
