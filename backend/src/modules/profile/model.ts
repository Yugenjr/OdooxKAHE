import { supabaseClient } from "../../config/database";

export class ProfileModel {
  static async getUserProfile(userId: string) {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", userId)
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

  static async updateUserPreferences(userId: string, preferences: Record<string, any>) {
    const existing = await this.getUserPreferences(userId);

    if (existing) {
      const { data, error } = await supabaseClient
        .from("user_preferences")
        .update(preferences)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabaseClient
        .from("user_preferences")
        .insert([{ user_id: userId, ...preferences }])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  static async getSavedDestinations(userId: string) {
    const { data, error } = await supabaseClient
      .from("saved_destinations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async addSavedDestination(userId: string, destination: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("saved_destinations")
      .insert([{ user_id: userId, ...destination, created_at: new Date() }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
