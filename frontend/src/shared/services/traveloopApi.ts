import { apiService } from '@/shared/services/apiService'

const apiGet = apiService.get.bind(apiService)
const apiPost = apiService.post.bind(apiService)
const apiPut = apiService.put.bind(apiService)
const apiDelete = apiService.delete.bind(apiService)

export const traveloopApi = {
  getMyTrips: () => apiGet('/trips'),
  getPublicTrips: () => apiGet('/trips/public'),
  createTrip: (payload: Record<string, unknown>) => apiPost('/trips', payload),
  updateTrip: (tripId: string, payload: Record<string, unknown>) => apiPut(`/trips/${tripId}`, payload),
  deleteTrip: (tripId: string) => apiDelete(`/trips/${tripId}`),

  getTripStops: (tripId: string) => apiGet(`/itinerary/${tripId}/stops`),
  addTripStop: (tripId: string, payload: Record<string, unknown>) => apiPost(`/itinerary/${tripId}/stops`, payload),
  updateTripStop: (tripId: string, stopId: string, payload: Record<string, unknown>) =>
    apiPut(`/itinerary/${tripId}/stops/${stopId}`, payload),
  deleteTripStop: (tripId: string, stopId: string) => apiDelete(`/itinerary/${tripId}/stops/${stopId}`),
  reorderTripStops: (tripId: string, stops: Array<{ id: string; order: number }>) =>
    apiPost(`/itinerary/${tripId}/reorder`, { stops }),

  getTripExpenses: (tripId: string) => apiGet(`/budget/${tripId}/expenses`),
  addExpense: (tripId: string, payload: Record<string, unknown>) => apiPost(`/budget/${tripId}/expenses`, payload),
  updateExpense: (tripId: string, expenseId: string, payload: Record<string, unknown>) =>
    apiPut(`/budget/${tripId}/expenses/${expenseId}`, payload),
  deleteExpense: (tripId: string, expenseId: string) => apiDelete(`/budget/${tripId}/expenses/${expenseId}`),
  getBudgetBreakdown: (tripId: string) => apiGet(`/budget/${tripId}/breakdown`),

  getPackingItems: (tripId: string) => apiGet(`/packing/${tripId}/packing`),
  addPackingItem: (tripId: string, payload: Record<string, unknown>) => apiPost(`/packing/${tripId}/packing`, payload),
  updatePackingItem: (tripId: string, itemId: string, payload: Record<string, unknown>) =>
    apiPut(`/packing/${tripId}/packing/${itemId}`, payload),
  deletePackingItem: (tripId: string, itemId: string) => apiDelete(`/packing/${tripId}/packing/${itemId}`),

  getNotes: (tripId: string) => apiGet(`/notes/${tripId}/notes`),
  addNote: (tripId: string, payload: Record<string, unknown>) => apiPost(`/notes/${tripId}/notes`, payload),
  updateNote: (tripId: string, noteId: string, payload: Record<string, unknown>) =>
    apiPut(`/notes/${tripId}/notes/${noteId}`, payload),
  deleteNote: (tripId: string, noteId: string) => apiDelete(`/notes/${tripId}/notes/${noteId}`),

  getProfile: () => apiGet('/profile'),
  updateProfile: (payload: Record<string, unknown>) => apiPut('/profile', payload),
  getPreferences: () => apiGet('/profile/preferences'),
  updatePreferences: (payload: Record<string, unknown>) => apiPut('/profile/preferences', payload),
  getSavedDestinations: () => apiGet('/profile/destinations'),
  addSavedDestination: (payload: Record<string, unknown>) => apiPost('/profile/destinations', payload),

  searchCities: (query: string) => apiGet(`/cities/search?q=${encodeURIComponent(query)}`),
  getPopularCities: () => apiGet('/cities/popular'),
  getCitiesByCountry: (country: string) => apiGet(`/cities/country/${encodeURIComponent(country)}`),

  searchActivities: (query: string) => apiGet(`/activities/search?q=${encodeURIComponent(query)}`),
}