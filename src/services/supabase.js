import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://abbdezywmmfssredrfim.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYmRlenl3bW1mc3NyZWRyZmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNzAyNDcsImV4cCI6MjAzMDY0NjI0N30.WZX4_FVY5iZ4DoGo75SwJQTgkfOIq0NZ1x2D7EESAtA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
