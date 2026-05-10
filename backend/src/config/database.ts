import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
  );
}

// Client for authenticated users (with RLS)
export const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: WebSocket as any,
  },
});

// Service role client for admin operations (bypasses RLS)
export const supabaseServiceClient = createClient(
  supabaseUrl,
  supabaseServiceRole,
  {
    realtime: {
      transport: WebSocket as any,
    },
  }
);

export default supabaseClient;
