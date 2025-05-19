import { createClient } from '@supabase/supabase-js'; // ✅ CERTO


const supabaseUrl = 'https://hfjosywhuxsjgdnlvuse.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam9zeXdodXhzamdkbmx2dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjk4NjcsImV4cCI6MjA2MjEwNTg2N30.6nW9aGeLkTNH3INhSekAPStNnSLpSPsWaou25ckPRrg'; // Anon Key pública, Configurações > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
