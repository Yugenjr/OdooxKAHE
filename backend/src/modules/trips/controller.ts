import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { TripsService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class TripsController {
  static async createTrip(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const trip = await TripsService.createTrip(req.user.id, req.body);
      sendSuccess(res, trip, "Trip created successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Failed to create trip", 400, error);
    }
  }

  static async getUserTrips(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const trips = await TripsService.getUserTrips(req.user.id);
      sendSuccess(res, trips, "Trips retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get trips", 400, error);
    }
  }

  static async getTripDetails(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const trip = await TripsService.getTripDetails(tripId, req.user.id);
      sendSuccess(res, trip, "Trip retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get trip", 400, error);
    }
  }

  static async updateTrip(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const trip = await TripsService.updateTrip(tripId, req.user.id, req.body);
      sendSuccess(res, trip, "Trip updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update trip", 400, error);
    }
  }

  static async deleteTrip(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const result = await TripsService.deleteTrip(tripId, req.user.id);
      sendSuccess(res, result, "Trip deleted successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to delete trip", 400, error);
    }
  }

  static async getPublicTrips(req: any, res: Response) {
    try {
      const trips = await TripsService.getPublicTrips();
      sendSuccess(res, trips, "Public trips retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get public trips", 400, error);
    }
  }
}
