import { supabaseClient } from "../../config/database";

export class ActivitiesModel {
  static async addActivity(stopId: string, userId: string, activityData: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("activities")
      .insert([
        {
          stop_id: stopId,
          user_id: userId,
          ...activityData,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getActivitiesByStop(stopId: string, userId: string) {
    const { data, error } = await supabaseClient
      .from("activities")
      .select("*")
      .eq("stop_id", stopId)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  }

  static async updateActivity(activityId: string, userId: string, updates: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("activities")
      .update(updates)
      .eq("id", activityId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteActivity(activityId: string, userId: string) {
    const { error } = await supabaseClient
      .from("activities")
      .delete()
      .eq("id", activityId)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }

  static async searchActivities(query: string, filters?: Record<string, any>) {
    const baseQuery = supabaseClient.from("activity_templates").select("*").limit(20)

    const { data, error } = !query
      ? await baseQuery
      : await baseQuery.ilike("name", `%${query}%`)

    if (error) throw error;
    return data;
  }
}
