'use client'

import { Providers } from './providers'

export function Layout({
  children
}) {
  return (
    (<html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>)
  );
}