import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gufjdunknccihloutfyt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZmpkdW5rbmNjaWhsb3V0Znl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NzA5OTksImV4cCI6MjEwNDQ0Njk5OX0.V0Af7YypgVcYrwS0kBjSKTrhRMQR_jmAxQEoAUimICM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
