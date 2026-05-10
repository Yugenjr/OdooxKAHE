-- Traveloop Database Schema for Supabase PostgreSQL
-- Run these SQL commands in your Supabase SQL editor to set up the database

-- ============================================================================
-- 1. USERS TABLE (User Profiles)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can only update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- 2. USER PREFERENCES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  language TEXT DEFAULT 'en',
  currency TEXT DEFAULT 'USD',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- 3. TRIPS TABLE (Main trip data)
-- ============================================================================
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  destination TEXT,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cover_photo TEXT,
  budget_limit DECIMAL(10, 2),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trips" ON trips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create trips" ON trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips" ON trips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips" ON trips
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public trips" ON trips
  FOR SELECT USING (is_public = TRUE);

-- ============================================================================
-- 4. TRIP STOPS TABLE (Cities/Stops in itinerary)
-- ============================================================================
CREATE TABLE IF NOT EXISTS trip_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  country TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE trip_stops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stops" ON trip_stops
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own stops" ON trip_stops
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 5. ACTIVITIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stop_id UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  cost DECIMAL(8, 2) DEFAULT 0,
  duration INTEGER DEFAULT 1,
  description TEXT,
  time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own activities" ON activities
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 6. ACTIVITY TEMPLATES TABLE (Predefined activities for search)
-- ============================================================================
CREATE TABLE IF NOT EXISTS activity_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  average_cost DECIMAL(8, 2),
  duration_hours INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Allow public access to activity templates
ALTER TABLE activity_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view activity templates" ON activity_templates
  FOR SELECT USING (TRUE);

-- ============================================================================
-- 7. EXPENSES TABLE (Budget tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own expenses" ON expenses
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 8. PACKING ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS packing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  packed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own packing items" ON packing_items
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 9. TRIP NOTES TABLE (Journal/Notes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS trip_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stop_id UUID REFERENCES trip_stops(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  note_date DATE,
  day_label TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE trip_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notes" ON trip_notes
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 10. SAVED DESTINATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS saved_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  country TEXT,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved destinations" ON saved_destinations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own saved destinations" ON saved_destinations
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 11. CITIES TABLE (City search database)
-- ============================================================================
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  popular BOOLEAN DEFAULT FALSE,
  popularity_score INTEGER DEFAULT 0,
  estimated_cost_per_day DECIMAL(8, 2),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Allow public access to cities
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cities" ON cities
  FOR SELECT USING (TRUE);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- User queries
CREATE INDEX idx_users_email ON users(email);

-- Trip queries
CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_trips_date_range ON trips(start_date, end_date);

-- Stop queries
CREATE INDEX idx_stops_trip_id ON trip_stops(trip_id);
CREATE INDEX idx_stops_user_id ON trip_stops(user_id);
CREATE INDEX idx_stops_dates ON trip_stops(start_date, end_date);

-- Activity queries
CREATE INDEX idx_activities_stop_id ON activities(stop_id);
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_category ON activities(category);

-- Expense queries
CREATE INDEX idx_expenses_trip_id ON expenses(trip_id);
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_category ON expenses(category);

-- Packing queries
CREATE INDEX idx_packing_trip_id ON packing_items(trip_id);
CREATE INDEX idx_packing_user_id ON packing_items(user_id);

-- Notes queries
CREATE INDEX idx_notes_trip_id ON trip_notes(trip_id);
CREATE INDEX idx_notes_user_id ON trip_notes(user_id);

-- City search
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_cities_country ON cities(country);
CREATE INDEX idx_cities_popular ON cities(popular);

-- ============================================================================
-- SAMPLE DATA (CITIES)
-- ============================================================================

INSERT INTO cities (name, country, region, popular, popularity_score, estimated_cost_per_day, description) VALUES
('Paris', 'France', 'Europe', TRUE, 95, 150.00, 'The City of Light - iconic landmarks, museums, and cuisine'),
('Tokyo', 'Japan', 'Asia', TRUE, 90, 120.00, 'Modern and traditional culture blend in Japan''s capital'),
('New York', 'United States', 'North America', TRUE, 95, 180.00, 'The city that never sleeps with world-class attractions'),
('Barcelona', 'Spain', 'Europe', TRUE, 85, 100.00, 'Gaudí''s architectural masterpieces and Mediterranean beaches'),
('Bali', 'Indonesia', 'Asia', TRUE, 80, 60.00, 'Tropical paradise with temples, beaches, and rice terraces'),
('London', 'United Kingdom', 'Europe', TRUE, 90, 140.00, 'Historic capital with royalty, museums, and modern culture'),
('Dubai', 'United Arab Emirates', 'Asia', TRUE, 85, 150.00, 'Luxurious shopping, desert adventures, and modern architecture'),
('Sydney', 'Australia', 'Oceania', TRUE, 80, 130.00, 'Iconic Opera House and beautiful coastal scenery'),
('Rome', 'Italy', 'Europe', TRUE, 92, 110.00, 'Ancient history, Vatican, and Renaissance art'),
('Bangkok', 'Thailand', 'Asia', TRUE, 80, 50.00, 'Vibrant street life, temples, and street food paradise')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- UPDATED AT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stops_updated_at BEFORE UPDATE ON trip_stops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON trip_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packing_updated_at BEFORE UPDATE ON packing_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
