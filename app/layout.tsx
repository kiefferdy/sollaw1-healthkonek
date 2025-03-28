import './globals/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './utils/ThemeProvider';
import Script from 'next/script';

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
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
          (function() {
            // On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Apply dark theme if:
            // 1. User explicitly set theme to dark, or
            // 2. Theme is 'system' and system prefers dark, or
            // 3. No saved theme and system prefers dark
            if (savedTheme === 'dark' || 
               (savedTheme === 'system' && systemPrefersDark) ||
               (!savedTheme && systemPrefersDark)) {
              document.documentElement.classList.add('dark');
              document.documentElement.classList.remove('light');
              document.documentElement.setAttribute('data-theme', 'healthkonek_dark');
            } else {
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.add('light');
              document.documentElement.setAttribute('data-theme', 'healthkonek');
            }
          })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}