import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { ItineraryService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class ItineraryController {
  static async addStop(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const stop = await ItineraryService.addStop(tripId, req.user.id, req.body);
      sendSuccess(res, stop, "Stop added successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Failed to add stop", 400, error);
    }
  }

  static async getItinerary(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const itinerary = await ItineraryService.getItinerary(tripId, req.user.id);
      sendSuccess(res, itinerary, "Itinerary retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get itinerary", 400, error);
    }
  }

  static async updateStop(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const stopId = String(req.params.stopId);
      const stop = await ItineraryService.updateStop(stopId, req.user.id, req.body);
      sendSuccess(res, stop, "Stop updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update stop", 400, error);
    }
  }

  static async deleteStop(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const stopId = String(req.params.stopId);
      const result = await ItineraryService.deleteStop(stopId, req.user.id);
      sendSuccess(res, result, "Stop deleted successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to delete stop", 400, error);
    }
  }

  static async reorderStops(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const { stops } = req.body;
      const result = await ItineraryService.reorderStops(tripId, req.user.id, stops);
      sendSuccess(res, result, "Stops reordered successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to reorder stops", 400, error);
    }
  }
}
