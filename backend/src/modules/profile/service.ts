import { ProfileModel } from "./model";

export class ProfileService {
  static async getUserProfile(userId: string) {
    try {
      return await ProfileModel.getUserProfile(userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(userId: string, updates: Record<string, any>) {
    try {
      // Only allow specific fields to be updated
      const allowedFields = ["name", "photo_url", "bio", "phone", "location"];
      const filteredUpdates = Object.keys(updates)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {} as Record<string, any>);

      return await ProfileModel.updateUserProfile(userId, filteredUpdates);
    } catch (error) {
      throw error;
    }
  }

  static async getPreferences(userId: string) {
    try {
      return await ProfileModel.getUserPreferences(userId);
    } catch (error) {
      throw error;
    }
  }

  static async updatePreferences(userId: string, preferences: Record<string, any>) {
    try {
      return await ProfileModel.updateUserPreferences(userId, preferences);
    } catch (error) {
      throw error;
    }
  }

  static async getSavedDestinations(userId: string) {
    try {
      return await ProfileModel.getSavedDestinations(userId);
    } catch (error) {
      throw error;
    }
  }

  static async addSavedDestination(userId: string, destination: Record<string, any>) {
    try {
      return await ProfileModel.addSavedDestination(userId, destination);
    } catch (error) {
      throw error;
    }
  }
}
