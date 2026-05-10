import { supabaseClient } from "../../config/database";

export class NotesModel {
  static async addNote(tripId: string, userId: string, noteData: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("trip_notes")
      .insert([
        {
          trip_id: tripId,
          user_id: userId,
          ...noteData,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getNotesByTrip(tripId: string, userId: string) {
    const { data, error } = await supabaseClient
      .from("trip_notes")
      .select("*")
      .eq("trip_id", tripId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async updateNote(noteId: string, userId: string, updates: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("trip_notes")
      .update(updates)
      .eq("id", noteId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteNote(noteId: string, userId: string) {
    const { error } = await supabaseClient
      .from("trip_notes")
      .delete()
      .eq("id", noteId)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }
}
