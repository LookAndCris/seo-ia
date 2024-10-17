import { DataProvider } from '@/context/DataContext'
import './globals.css'
import { Inter } from 'next/font/google'
import { ProcessingProvider } from '@/context/ProcessingContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SEO + IA',
  description: 'Generated by DDB',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-procolombia.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={inter.url} rel="stylesheet" />
      </head>

      <body className={inter.className}>
        <DataProvider>
          <ProcessingProvider>
            <main>{children}</main>
          </ProcessingProvider>
        </DataProvider>
      </body>
    </html>
  )
}