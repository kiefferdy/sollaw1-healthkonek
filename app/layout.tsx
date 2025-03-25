import './globals/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HealthKonek - Telehealth Platform',
  description: 'Connect with healthcare professionals, manage your health records, and access medical services anytime, anywhere.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="healthkonek">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}