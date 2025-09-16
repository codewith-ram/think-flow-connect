import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Make environment variables available in the browser
              window.ENV = {
                NEXT_PUBLIC_SUPABASE_URL: '${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cefksoosqhkkcibecdnj.supabase.co'}',
                NEXT_PUBLIC_SUPABASE_ANON_KEY: '${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}'
              };
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
