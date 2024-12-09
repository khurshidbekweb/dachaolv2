'use client'
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChildProps } from '@/types';
import {Crete_Round, Work_Sans} from 'next/font/google'
import Head from 'next/head';
import { Toaster } from 'sonner';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

const creteRound = Crete_Round({
    weight: ['400'],
    variable: '--font-creteRound',
    subsets: ['latin']
  })
  
  const workSans = Work_Sans({
    weight: ['500', '600'],
    variable: '--font-workSans',
    subsets: ['latin']
  })
  
  const RootLayoutClient = ({children}: ChildProps) => {
    const queryClient = new QueryClient();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);  // Klientda ekanligimizni belgilaymiz
      if (!safeLocalStorage.getItem("language")) safeLocalStorage.setItem("language", "uz");
    }, []);

    if (!isClient) {
      return null; // serverda bo'lgan paytda hech narsa render qilmaydi
    }

    return (
        <>
        <Head>
          <title>Dacha Ol</title>
        </Head>
        <div
          className={`antialiased ${workSans.variable} ${creteRound.variable}`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <QueryClientProvider client={queryClient}>
                <I18nextProvider i18n={i18n}>{children}</I18nextProvider>                
              </QueryClientProvider>
              <Toaster position='top-center'/>
          </ThemeProvider>
        </div>
      </>
    );
};

export default RootLayoutClient;
