import { createClient } from '@supabase/supabase-js';

// These placeholders should be replaced with actual values at build time or
// provided through environment variables in the hosting application.
const SUPABASE_URL = (process.env.SUPABASE_URL as string) || 'SUPABASE_URL';
const SUPABASE_ANON_KEY = (process.env.SUPABASE_ANON_KEY as string) || 'SUPABASE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
