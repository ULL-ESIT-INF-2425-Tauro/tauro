import { AppProps } from 'next/app';
import React from 'react'

export default function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}