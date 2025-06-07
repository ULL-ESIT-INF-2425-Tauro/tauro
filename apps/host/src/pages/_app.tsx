import { AppProps } from 'next/app';
import './styles.css';

function TauroApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="app">
        <Component {...pageProps}/>
      </main>
    </>
  );
};

export default TauroApp;
