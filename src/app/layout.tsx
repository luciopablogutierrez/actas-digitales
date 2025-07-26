import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Figtree, Plus_Jakarta_Sans } from 'next/font/google'

const fontSans = Figtree({ 
  subsets: ['latin'], 
  variable: '--font-figtree',
  display: 'swap',
});

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Actas Digitales',
  description: 'Gestión de sesiones del Concejo Deliberante',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className="min-h-screen bg-background font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
