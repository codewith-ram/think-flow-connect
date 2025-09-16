import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Default values that will be replaced at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cefksoosqhkkcibecdnj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disable for static export
  },
  global: {
    // Disable real-time subscriptions for static export
    fetch: (url, options = {}) => {
      return fetch(url, { ...options, cache: 'no-store' });
    },
  },
});

// Client-side only Supabase client
export function createClient() {
  // In the browser, we need to get the URL and key from the environment
  const clientSupabaseUrl = typeof window !== 'undefined' 
    ? window.ENV?.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl
    : supabaseUrl;
    
  const clientSupabaseKey = typeof window !== 'undefined'
    ? window.ENV?.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey
    : supabaseAnonKey;

  return createSupabaseClient(clientSupabaseUrl, clientSupabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // Disable for static export
    },
  });
}

// Helper to get server-side client for API routes
export function getServerClient(context: any) {
  return createClient();
}
