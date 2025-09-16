'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabaseClient] = useState(() => createClientComponentClient());
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabaseClient]);

  return (
    <html lang="en">
      <head>
        <title>Think Flow Connect</title>
        <meta name="description" content="Collaborative coding and learning platform" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <SessionContextProvider supabaseClient={supabaseClient}>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}
