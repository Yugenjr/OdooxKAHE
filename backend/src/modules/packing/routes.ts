import { Router } from "express";
import { PackingController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.post("/:tripId/packing", authenticateToken, PackingController.addItem);
router.get("/:tripId/packing", authenticateToken, PackingController.getItems);
router.put("/:tripId/packing/:itemId", authenticateToken, PackingController.updateItem);
router.delete("/:tripId/packing/:itemId", authenticateToken, PackingController.deleteItem);

export default router;
