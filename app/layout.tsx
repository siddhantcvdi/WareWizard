import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WareWizard - Intelligent Warehouse Management',
  description: 'Created with WareWizard',
  generator: 'WareWizard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
