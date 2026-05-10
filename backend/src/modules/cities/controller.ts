import { Response } from "express";
import { CitiesService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class CitiesController {
  static async searchCities(req: any, res: Response) {
    try {
      const { q } = req.query;

      if (!q) {
        return sendError(res, "Search query is required", 400);
      }

      const cities = await CitiesService.searchCities(q as string);
      sendSuccess(res, cities, "Cities found");
    } catch (error: any) {
      sendError(res, error.message || "Failed to search cities", 400, error);
    }
  }

  static async getCityDetails(req: any, res: Response) {
    try {
      const { cityId } = req.params;
      const city = await CitiesService.getCityDetails(cityId);
      sendSuccess(res, city, "City details retrieved");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get city details", 400, error);
    }
  }

  static async getCitiesByCountry(req: any, res: Response) {
    try {
      const { country } = req.query;

      if (!country) {
        return sendError(res, "Country is required", 400);
      }

      const cities = await CitiesService.getCitiesByCountry(country as string);
      sendSuccess(res, cities, "Cities retrieved");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get cities", 400, error);
    }
  }

  static async getPopularCities(req: any, res: Response) {
    try {
      const cities = await CitiesService.getPopularCities();
      sendSuccess(res, cities, "Popular cities retrieved");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get popular cities", 400, error);
    }
  }
}
