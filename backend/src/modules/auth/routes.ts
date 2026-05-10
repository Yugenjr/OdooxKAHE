import { Router } from "express";
import { AuthController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", authenticateToken, AuthController.logout);
router.get("/me", authenticateToken, AuthController.getCurrentUser);
router.put("/profile", authenticateToken, AuthController.updateProfile);

export default router;
