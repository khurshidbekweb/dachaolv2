'use client'
import React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChildProps } from '@/types';
import {Crete_Round, Work_Sans} from 'next/font/google'
import Head from 'next/head';

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
  
  const RootLayoutClient = ({children}:ChildProps) => {
    if (!localStorage.getItem("language")) localStorage.setItem("language", "uz");
    const queryClient = new QueryClient()
    return (
        <html lang="en" suppressHydrationWarning>
        <Head>
          <title>Dacha Ol</title>
        </Head>
        <body
          className={`antialiased ${workSans.variable} ${creteRound.variable}`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    );
};

export default RootLayoutClient;