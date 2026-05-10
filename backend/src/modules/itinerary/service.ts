import { ItineraryModel } from "./model";

export class ItineraryService {
  static async addStop(tripId: string, userId: string, stopData: Record<string, any>) {
    try {
      const { city, start_date, end_date, order } = stopData;

      if (!city || !start_date || !end_date) {
        throw new Error("City, start_date, and end_date are required");
      }

      return await ItineraryModel.addStop(tripId, userId, {
        city,
        start_date,
        end_date,
        sort_order: order || 0,
        description: stopData.description || "",
      });
    } catch (error) {
      throw error;
    }
  }

  static async getItinerary(tripId: string, userId: string) {
    try {
      return await ItineraryModel.getStopsByTrip(tripId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateStop(stopId: string, userId: string, updates: Record<string, any>) {
    try {
      return await ItineraryModel.updateStop(stopId, userId, updates);
    } catch (error) {
      throw error;
    }
  }

  static async deleteStop(stopId: string, userId: string) {
    try {
      return await ItineraryModel.deleteStop(stopId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async reorderStops(tripId: string, userId: string, stops: Array<{ id: string; order: number }>) {
    try {
      return await ItineraryModel.reorderStops(tripId, userId, stops);
    } catch (error) {
      throw error;
    }
  }
}
