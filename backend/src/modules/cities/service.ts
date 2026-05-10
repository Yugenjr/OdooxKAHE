import { CitiesModel } from "./model";

export class CitiesService {
  static async searchCities(query: string) {
    try {
      if (!query) {
        throw new Error("Search query is required");
      }

      return await CitiesModel.searchCities(query);
    } catch (error) {
      throw error;
    }
  }

  static async getCityDetails(cityId: string) {
    try {
      if (!cityId) {
        throw new Error("City ID is required");
      }

      return await CitiesModel.getCityDetails(cityId);
    } catch (error) {
      throw error;
    }
  }

  static async getCitiesByCountry(country: string) {
    try {
      if (!country) {
        throw new Error("Country is required");
      }

      return await CitiesModel.getCitiesByCountry(country);
    } catch (error) {
      throw error;
    }
  }

  static async getPopularCities() {
    try {
      return await CitiesModel.getPopularCities();
    } catch (error) {
      throw error;
    }
  }
}
