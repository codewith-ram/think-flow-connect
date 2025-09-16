'use client';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '../lib/supabase';

export default function App({ Component, pageProps }: any) {
  const supabaseClient = createClient();
  
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
