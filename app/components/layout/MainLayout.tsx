'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

// Dynamically import components that use client-side hooks
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
const Header = dynamic(() => import('./Header'), { ssr: false });

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <Header />
        <main className="flex-1">
          <div className="py-6">
            {title && (
              <div className="px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
            )}
            <div className="px-4 sm:px-6 md:px-8 mt-6">{children}</div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}