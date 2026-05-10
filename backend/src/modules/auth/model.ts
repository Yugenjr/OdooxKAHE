import { supabaseClient } from "../../config/database";

export class AuthModel {
  static async getUserById(userId: string) {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async createUserProfile(userId: string, email: string, name?: string) {
    const { data, error } = await supabaseClient
      .from("users")
      .insert([
        {
          id: userId,
          email,
          name: name || email.split("@")[0],
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUserProfile(userId: string, updates: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserPreferences(userId: string) {
    const { data, error } = await supabaseClient
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  }
}
