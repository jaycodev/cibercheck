import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'

import { ThemeScript } from '@/components/shared/theme-script'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: {
    default: 'CiberCheck',
    template: '%s - CiberCheck',
  },
  description:
    'CiberCheck es una plataforma de gestión de asistencia para eventos y clases, diseñada para facilitar el control de presencia de estudiantes y profesores mediante check-ins rápidos y reportes en tiempo real.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export function generateViewport() {
  return {
    themeColor: [{ color: 'oklch(1 0 0)' }],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableColorScheme
        >
          <NextTopLoader color="var(--primary)" height={3} easing="linear" showSpinner={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
