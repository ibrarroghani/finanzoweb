import React from 'react';
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { product_sans } from '@/assets/fonts/google-font';
import './globals.css';
import ProviderWrapper from './provider';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finanzo',
  description: 'Home page',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body className={`${product_sans.className} font-sans`}>
        <ProviderWrapper>
          <DashboardLayout>{children}</DashboardLayout>
        </ProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
