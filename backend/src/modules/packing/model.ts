import { supabaseClient } from "../../config/database";

export class PackingModel {
  static async addItem(tripId: string, userId: string, itemData: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("packing_items")
      .insert([
        {
          trip_id: tripId,
          user_id: userId,
          ...itemData,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getItemsByTrip(tripId: string, userId: string) {
    const { data, error } = await supabaseClient
      .from("packing_items")
      .select("*")
      .eq("trip_id", tripId)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  }

  static async updateItem(itemId: string, userId: string, updates: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("packing_items")
      .update(updates)
      .eq("id", itemId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteItem(itemId: string, userId: string) {
    const { error } = await supabaseClient
      .from("packing_items")
      .delete()
      .eq("id", itemId)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }
}
