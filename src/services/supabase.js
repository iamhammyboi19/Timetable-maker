import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./supabaseUrl";

// supbase connection refer to docs
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdGlqZnVpdXV4anJxdmlwcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0OTgzMDcsImV4cCI6MjAxNjA3NDMwN30.Kjg2AvmEXKb8bHV9TAaoCePMiRQvGDsr_OP4emTYQiY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
