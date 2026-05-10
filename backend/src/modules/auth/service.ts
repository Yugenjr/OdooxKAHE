import { supabaseClient } from "../../config/database";
import { AuthModel } from "./model";

export class AuthService {
  static async signup(email: string, password: string, name?: string) {
    try {
      // Create user in Supabase Auth
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split("@")[0],
          },
        },
      });

      if (error) throw error;

      // Create user profile in users table
      if (data.user) {
        await AuthModel.createUserProfile(data.user.id, email, name);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async login(email: string, password: string) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async logout(token: string) {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      return { message: "Logged out successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async getCurrentUser(userId: string) {
    try {
      return await AuthModel.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(userId: string, updates: Record<string, any>) {
    try {
      // Ensure user can only update their own profile
      return await AuthModel.updateUserProfile(userId, updates);
    } catch (error) {
      throw error;
    }
  }
}
