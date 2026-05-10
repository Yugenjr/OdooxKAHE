import { NotesModel } from "./model";

export class NotesService {
  static async addNote(tripId: string, userId: string, noteData: Record<string, any>) {
    try {
      const { title, content, stop_id, note_date, day_label } = noteData;

      if (!title || !content) {
        throw new Error("Title and content are required");
      }

      return await NotesModel.addNote(tripId, userId, {
        title,
        content,
        stop_id: stop_id || null,
        note_date: note_date || null,
        day_label: day_label || null,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getNotes(tripId: string, userId: string) {
    try {
      return await NotesModel.getNotesByTrip(tripId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateNote(noteId: string, userId: string, updates: Record<string, any>) {
    try {
      return await NotesModel.updateNote(noteId, userId, updates);
    } catch (error) {
      throw error;
    }
  }

  static async deleteNote(noteId: string, userId: string) {
    try {
      return await NotesModel.deleteNote(noteId, userId);
    } catch (error) {
      throw error;
    }
  }
}
