import { createClient } from "@supabase/supabase-js";
import { getStringEnv } from "./env-variable";

export const supabase = createClient(getStringEnv("SUPABASE_PUBLIC_URL"), getStringEnv("SUPABASE_SECRET_KEY"));