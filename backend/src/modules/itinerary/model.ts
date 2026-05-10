import { supabaseClient } from "../../config/database";

export class ItineraryModel {
  static async addStop(tripId: string, userId: string, stopData: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("trip_stops")
      .insert([
        {
          trip_id: tripId,
          user_id: userId,
          ...stopData,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getStopsByTrip(tripId: string, userId: string) {
    const { data, error } = await supabaseClient
      .from("trip_stops")
      .select("*")
      .eq("trip_id", tripId)
      .eq("user_id", userId)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data;
  }

  static async updateStop(stopId: string, userId: string, updates: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("trip_stops")
      .update(updates)
      .eq("id", stopId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteStop(stopId: string, userId: string) {
    const { error } = await supabaseClient
      .from("trip_stops")
      .delete()
      .eq("id", stopId)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }

  static async reorderStops(tripId: string, userId: string, stops: Array<{ id: string; order: number }>) {
    try {
      for (const stop of stops) {
        await supabaseClient
          .from("trip_stops")
          .update({ sort_order: stop.order })
          .eq("id", stop.id)
          .eq("user_id", userId);
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
