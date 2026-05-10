import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from "./modules/auth/routes";
import tripsRoutes from "./modules/trips/routes";
import itineraryRoutes from "./modules/itinerary/routes";
import activitiesRoutes from "./modules/activities/routes";
import budgetRoutes from "./modules/budget/routes";
import packingRoutes from "./modules/packing/routes";
import profileRoutes from "./modules/profile/routes";
import notesRoutes from "./modules/notes/routes";
import citiesRoutes from "./modules/cities/routes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "Traveloop API is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/cities", citiesRoutes);

// Error handling middleware
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const error = err instanceof Error ? err : new Error("Internal Server Error");
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Traveloop API running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   - Authentication: POST /api/auth/*`);
  console.log(`   - Trips: /api/trips`);
  console.log(`   - Itinerary: /api/itinerary`);
  console.log(`   - Activities: /api/activities`);
  console.log(`   - Budget: /api/budget`);
  console.log(`   - Packing: /api/packing`);
  console.log(`   - Profile: /api/profile`);
  console.log(`   - Notes: /api/notes`);
  console.log(`   - Cities: /api/cities`);
});

export default app;
