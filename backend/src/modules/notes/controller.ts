import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { NotesService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class NotesController {
  static async addNote(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const note = await NotesService.addNote(tripId, req.user.id, req.body);
      sendSuccess(res, note, "Note added successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Failed to add note", 400, error);
    }
  }

  static async getNotes(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const notes = await NotesService.getNotes(tripId, req.user.id);
      sendSuccess(res, notes, "Notes retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get notes", 400, error);
    }
  }

  static async updateNote(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const noteId = Array.isArray(req.params.noteId)
        ? req.params.noteId[0]
        : req.params.noteId;
      const note = await NotesService.updateNote(noteId, req.user.id, req.body);
      sendSuccess(res, note, "Note updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update note", 400, error);
    }
  }

  static async deleteNote(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const noteId = Array.isArray(req.params.noteId)
        ? req.params.noteId[0]
        : req.params.noteId;
      const result = await NotesService.deleteNote(noteId, req.user.id);
      sendSuccess(res, result, "Note deleted successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to delete note", 400, error);
    }
  }
}
