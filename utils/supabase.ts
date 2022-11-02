import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL not found');
}
if (!supabaseKey) {
  throw new Error('Supabase key not found');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
