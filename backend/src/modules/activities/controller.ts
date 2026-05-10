import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { ActivitiesService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class ActivitiesController {
  static async addActivity(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const stopId = String(req.params.stopId);
      const activity = await ActivitiesService.addActivity(stopId, req.user.id, req.body);
      sendSuccess(res, activity, "Activity added successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Failed to add activity", 400, error);
    }
  }

  static async getActivities(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const stopId = String(req.params.stopId);
      const activities = await ActivitiesService.getActivities(stopId, req.user.id);
      sendSuccess(res, activities, "Activities retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get activities", 400, error);
    }
  }

  static async updateActivity(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const activityId = String(req.params.activityId);
      const activity = await ActivitiesService.updateActivity(activityId, req.user.id, req.body);
      sendSuccess(res, activity, "Activity updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update activity", 400, error);
    }
  }

  static async deleteActivity(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const activityId = String(req.params.activityId);
      const result = await ActivitiesService.deleteActivity(activityId, req.user.id);
      sendSuccess(res, result, "Activity deleted successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to delete activity", 400, error);
    }
  }

  static async searchActivities(req: AuthenticatedRequest, res: Response) {
    try {
      const { q } = req.query;
      const activities = await ActivitiesService.searchActivities(q as string);
      sendSuccess(res, activities, "Activities found");
    } catch (error: any) {
      sendError(res, error.message || "Failed to search activities", 400, error);
    }
  }
}
