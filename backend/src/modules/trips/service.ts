import { TripsModel } from "./model";

export class TripsService {
  static async createTrip(userId: string, tripData: Record<string, any>) {
    try {
      const { name, destination, start_date, end_date, description, cover_photo, budget_limit, is_public } = tripData;

      if (!name || !start_date || !end_date) {
        throw new Error("Name, start_date, and end_date are required");
      }

      return await TripsModel.createTrip(userId, {
        name,
        destination: destination || "",
        start_date,
        end_date,
        description: description || "",
        cover_photo: cover_photo || null,
        budget_limit: budget_limit || null,
        is_public: is_public || false,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getUserTrips(userId: string) {
    try {
      return await TripsModel.getTripsByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  static async getTripDetails(tripId: string, userId: string) {
    try {
      return await TripsModel.getTripById(tripId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateTrip(tripId: string, userId: string, updates: Record<string, any>) {
    try {
      return await TripsModel.updateTrip(tripId, userId, updates);
    } catch (error) {
      throw error;
    }
  }

  static async deleteTrip(tripId: string, userId: string) {
    try {
      return await TripsModel.deleteTrip(tripId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async getPublicTrips() {
    try {
      return await TripsModel.getPublicTrips();
    } catch (error) {
      throw error;
    }
  }
}
