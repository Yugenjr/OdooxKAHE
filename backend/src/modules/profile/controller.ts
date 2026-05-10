import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { ProfileService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class ProfileController {
  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const profile = await ProfileService.getUserProfile(req.user.id);
      sendSuccess(res, profile, "Profile retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get profile", 400, error);
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const profile = await ProfileService.updateProfile(req.user.id, req.body);
      sendSuccess(res, profile, "Profile updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update profile", 400, error);
    }
  }

  static async getPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const preferences = await ProfileService.getPreferences(req.user.id);
      sendSuccess(res, preferences, "Preferences retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get preferences", 400, error);
    }
  }

  static async updatePreferences(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const preferences = await ProfileService.updatePreferences(req.user.id, req.body);
      sendSuccess(res, preferences, "Preferences updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update preferences", 400, error);
    }
  }

  static async getSavedDestinations(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const destinations = await ProfileService.getSavedDestinations(req.user.id);
      sendSuccess(res, destinations, "Saved destinations retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get saved destinations", 400, error);
    }
  }

  static async addSavedDestination(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const destination = await ProfileService.addSavedDestination(req.user.id, req.body);
      sendSuccess(res, destination, "Destination saved successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Failed to save destination", 400, error);
    }
  }
}
