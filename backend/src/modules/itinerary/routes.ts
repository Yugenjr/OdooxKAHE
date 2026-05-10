import { Router } from "express";
import { ItineraryController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.post("/:tripId/stops", authenticateToken, ItineraryController.addStop);
router.get("/:tripId/stops", authenticateToken, ItineraryController.getItinerary);
router.put("/:tripId/stops/:stopId", authenticateToken, ItineraryController.updateStop);
router.delete("/:tripId/stops/:stopId", authenticateToken, ItineraryController.deleteStop);
router.post("/:tripId/reorder", authenticateToken, ItineraryController.reorderStops);

export default router;
