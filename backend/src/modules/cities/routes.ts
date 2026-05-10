import { Router } from "express";
import { CitiesController } from "./controller";

const router = Router();

router.get("/search", CitiesController.searchCities);
router.get("/popular", CitiesController.getPopularCities);
router.get("/:cityId", CitiesController.getCityDetails);
router.get("/country/:country", CitiesController.getCitiesByCountry);

export default router;
