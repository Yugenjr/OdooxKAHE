import { Router } from "express";
import { NotesController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.post("/:tripId/notes", authenticateToken, NotesController.addNote);
router.get("/:tripId/notes", authenticateToken, NotesController.getNotes);
router.put("/:tripId/notes/:noteId", authenticateToken, NotesController.updateNote);
router.delete("/:tripId/notes/:noteId", authenticateToken, NotesController.deleteNote);

export default router;
