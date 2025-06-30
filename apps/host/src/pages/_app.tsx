import { AppProps } from 'next/app';
import '../styles/tailwind.css';

function TauroApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default TauroApp;
