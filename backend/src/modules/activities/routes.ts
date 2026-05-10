import { Router } from "express";
import { ActivitiesController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.post("/:stopId/activities", authenticateToken, ActivitiesController.addActivity);
router.get("/:stopId/activities", authenticateToken, ActivitiesController.getActivities);
router.put("/:stopId/activities/:activityId", authenticateToken, ActivitiesController.updateActivity);
router.delete("/:stopId/activities/:activityId", authenticateToken, ActivitiesController.deleteActivity);
router.get("/search", ActivitiesController.searchActivities);

export default router;
