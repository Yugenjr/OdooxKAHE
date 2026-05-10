import { PackingModel } from "./model";

export class PackingService {
  static async addItem(tripId: string, userId: string, itemData: Record<string, any>) {
    try {
      const { name, category } = itemData;

      if (!name) {
        throw new Error("Item name is required");
      }

      return await PackingModel.addItem(tripId, userId, {
        name,
        category: category || "General",
        packed: false,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getItems(tripId: string, userId: string) {
    try {
      return await PackingModel.getItemsByTrip(tripId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateItem(itemId: string, userId: string, updates: Record<string, any>) {
    try {
      return await PackingModel.updateItem(itemId, userId, updates);
    } catch (error) {
      throw error;
    }
  }

  static async deleteItem(itemId: string, userId: string) {
    try {
      return await PackingModel.deleteItem(itemId, userId);
    } catch (error) {
      throw error;
    }
  }
}
