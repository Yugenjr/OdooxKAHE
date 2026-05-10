import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { PackingService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class PackingController {
  static async addItem(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const item = await PackingService.addItem(tripId, req.user.id, req.body);
      sendSuccess(res, item, "Item added successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Failed to add item", 400, error);
    }
  }

  static async getItems(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const items = await PackingService.getItems(tripId, req.user.id);
      sendSuccess(res, items, "Items retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get items", 400, error);
    }
  }

  static async updateItem(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const itemId = req.params.itemId as string;
      const item = await PackingService.updateItem(itemId, req.user.id, req.body);
      sendSuccess(res, item, "Item updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update item", 400, error);
    }
  }

  static async deleteItem(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const itemId = req.params.itemId as string;
      const result = await PackingService.deleteItem(itemId, req.user.id);
      sendSuccess(res, result, "Item deleted successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to delete item", 400, error);
    }
  }
}
