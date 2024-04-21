import { createClient } from "@supabase/supabase-js";
import { Database } from "../constants/types";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

declare module "bun" {
  interface Env {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
  }
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
