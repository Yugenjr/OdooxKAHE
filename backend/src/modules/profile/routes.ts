import { Router } from "express";
import { ProfileController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.get("/", authenticateToken, ProfileController.getProfile);
router.put("/", authenticateToken, ProfileController.updateProfile);
router.get("/preferences", authenticateToken, ProfileController.getPreferences);
router.put("/preferences", authenticateToken, ProfileController.updatePreferences);
router.get("/destinations", authenticateToken, ProfileController.getSavedDestinations);
router.post("/destinations", authenticateToken, ProfileController.addSavedDestination);

export default router;
