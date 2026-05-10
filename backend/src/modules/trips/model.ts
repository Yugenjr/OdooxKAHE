import { supabaseClient } from "../../config/database";

export class TripsModel {
  static async createTrip(userId: string, tripData: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("trips")
      .insert([
        {
          user_id: userId,
          ...tripData,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getTripsByUserId(userId: string) {
    const { data, error } = await supabaseClient
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getTripById(tripId: string, userId: string) {
    const { data, error } = await supabaseClient
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTrip(tripId: string, userId: string, updates: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("trips")
      .update(updates)
      .eq("id", tripId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteTrip(tripId: string, userId: string) {
    const { error } = await supabaseClient
      .from("trips")
      .delete()
      .eq("id", tripId)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }

  static async getPublicTrips() {
    const { data, error } = await supabaseClient
      .from("trips")
      .select("id, name, destination, description, start_date, end_date, cover_photo, budget_limit, created_at, user_id, users(name)")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
}
