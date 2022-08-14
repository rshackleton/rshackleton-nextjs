import type { AppProps } from 'next/app';
import { useStoryblokBridge } from '~/storyblok/useStoryblokBridge';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useStoryblokBridge();
  return <Component {...pageProps} />;
}

export default MyApp;
