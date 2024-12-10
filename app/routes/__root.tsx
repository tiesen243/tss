import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import { ThemeProvider } from 'next-themes'

import { ErrorBoundary } from '@/components/error'
import stylesheets from '@/globals.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Yuki' },
    ],
    links: [
      { rel: 'icon', href: 'https://tiesen.id.vn/favicon.ico' },
      { rel: 'apple-touch-icon', href: 'https://tiesen.id.vn/apple-touch-icon.png' },
      { rel: 'shortcut icon', href: 'https://tiesen.id.vn/favicon-16x16.png' },
      { rel: 'manifest', href: 'https://tiesen.id.vn/manifest.webmanifest' },
      { rel: 'stylesheet', href: stylesheets },
    ],
  }),
  errorComponent: (props) => <ErrorBoundary {...props} />,
  component: () => (
    <html lang="en">
      <head>
        <Meta />
      </head>

      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  ),
})
