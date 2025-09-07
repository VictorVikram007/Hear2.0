import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://ogcvpzwrcmmcjbbyexhq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nY3ZwendyY21tY2piYnlleGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2OTY2NTMsImV4cCI6MjA3MTI3MjY1M30.B1eSq7zFLSsdYchTsQdPeBSB8VBRK04UsS6UxQB8yi8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
