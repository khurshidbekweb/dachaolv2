import React from 'react';
import RootLayoutClient from './root-layout';
import NextTopLoader from 'nextjs-toploader';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n'
import { ChildProps } from '@/types';

const RootClientProvider = ({children}: ChildProps) => {
    return (
        <RootLayoutClient>
        <NextTopLoader showSpinner={false} />
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </RootLayoutClient>
    );
};

export default RootClientProvider;