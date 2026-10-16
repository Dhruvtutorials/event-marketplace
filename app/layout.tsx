import type { Metadata } from 'next';
import './globals.css';
import { MarketplaceProvider } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Amdavad Utsav | Event Planning Marketplace (Ahmedabad)',
  description:
    'Ahmedabad’s two-sided event marketplace. Compare verified party plots, caterers, decorators, and photographers with smart checklist, single checkout, and 100% date-lock guarantee.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between selection:bg-orange-500 selection:text-white">
        <MarketplaceProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
