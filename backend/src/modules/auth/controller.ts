import { Response } from "express";
import { AuthService } from "./service";
import { AuthenticatedRequest } from "../../middleware/auth";
import { sendSuccess, sendError } from "../../utils";

export class AuthController {
  static async signup(req: any, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return sendError(res, "Email and password are required", 400);
      }

      const result = await AuthService.signup(email, password, name);
      sendSuccess(res, result, "User created successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Signup failed", 400, error);
    }
  }

  static async login(req: any, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendError(res, "Email and password are required", 400);
      }

      const result = await AuthService.login(email, password);
      sendSuccess(res, result, "Login successful");
    } catch (error: any) {
      sendError(res, error.message || "Login failed", 401, error);
    }
  }

  static async logout(req: AuthenticatedRequest, res: Response) {
    try {
      const token = req.auth_token || "";
      const result = await AuthService.logout(token);
      sendSuccess(res, result, "Logout successful");
    } catch (error: any) {
      sendError(res, error.message || "Logout failed", 400, error);
    }
  }

  static async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const user = await AuthService.getCurrentUser(req.user.id);
      sendSuccess(res, user, "User retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get user", 400, error);
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const result = await AuthService.updateProfile(req.user.id, req.body);
      sendSuccess(res, result, "Profile updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update profile", 400, error);
    }
  }
}
