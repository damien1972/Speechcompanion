// _app.tsx - Main application wrapper for Speech Therapy Companion

import React from 'react';
import { SessionProvider } from '../contexts/SessionContext';
import { AccessibilityProvider } from '../components/AccessibilityProvider';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AccessibilityProvider>
        <Component {...pageProps} />
      </AccessibilityProvider>
    </SessionProvider>
  );
}

export default MyApp;
