import { ActivitiesModel } from "./model";

export class ActivitiesService {
  static async addActivity(stopId: string, userId: string, activityData: Record<string, any>) {
    try {
      const { name, category, cost, duration, description } = activityData;

      if (!name || !category) {
        throw new Error("Name and category are required");
      }

      return await ActivitiesModel.addActivity(stopId, userId, {
        name,
        category,
        cost: cost || 0,
        duration: duration || 1,
        description: description || "",
      });
    } catch (error) {
      throw error;
    }
  }

  static async getActivities(stopId: string, userId: string) {
    try {
      return await ActivitiesModel.getActivitiesByStop(stopId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateActivity(activityId: string, userId: string, updates: Record<string, any>) {
    try {
      return await ActivitiesModel.updateActivity(activityId, userId, updates);
    } catch (error) {
      throw error;
    }
  }

  static async deleteActivity(activityId: string, userId: string) {
    try {
      return await ActivitiesModel.deleteActivity(activityId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async searchActivities(query: string, filters?: Record<string, any>) {
    try {
      if (!query) {
        throw new Error("Search query is required");
      }

      return await ActivitiesModel.searchActivities(query, filters);
    } catch (error) {
      throw error;
    }
  }
}
