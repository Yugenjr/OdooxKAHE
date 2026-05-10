import { Router } from "express";
import { TripsController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.get("/public", TripsController.getPublicTrips);
router.post("/", authenticateToken, TripsController.createTrip);
router.get("/", authenticateToken, TripsController.getUserTrips);
router.get("/:tripId", authenticateToken, TripsController.getTripDetails);
router.put("/:tripId", authenticateToken, TripsController.updateTrip);
router.delete("/:tripId", authenticateToken, TripsController.deleteTrip);

export default router;
