import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Classic Books - Orçamento',
  description: 'Sistema de orçamento para impressão de livros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
