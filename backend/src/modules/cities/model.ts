import { supabaseClient } from "../../config/database";

export class CitiesModel {
  static async searchCities(query: string) {
    const { data, error } = await supabaseClient
      .from("cities")
      .select("*")
      .or(`name.ilike.%${query}%,country.ilike.%${query}%`)
      .limit(20);

    if (error) throw error;
    return data;
  }

  static async getCityDetails(cityId: string) {
    const { data, error } = await supabaseClient
      .from("cities")
      .select("*")
      .eq("id", cityId)
      .single();

    if (error) throw error;
    return data;
  }

  static async getCitiesByCountry(country: string) {
    const { data, error } = await supabaseClient
      .from("cities")
      .select("*")
      .eq("country", country)
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  }

  static async getPopularCities() {
    const { data, error } = await supabaseClient
      .from("cities")
      .select("*")
      .eq("popular", true)
      .order("popularity_score", { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  }
}
