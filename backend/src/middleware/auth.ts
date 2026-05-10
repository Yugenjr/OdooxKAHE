import { Request, Response, NextFunction } from "express";
import { supabaseClient } from "../config/database";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    user_metadata?: Record<string, any>;
  };
  auth_token?: string;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token with Supabase
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = {
      id: user.id,
      email: user.email || "",
      user_metadata: user.user_metadata,
    };
    req.auth_token = token;

    next();
  } catch (err) {
    return res.status(500).json({ error: "Authentication error" });
  }
};

// Helper function to ensure user can only access their own data
export const ensureOwnership = (userIdFromDb: string, userIdFromAuth: string) => {
  return userIdFromDb === userIdFromAuth;
};

export default authenticateToken;
