import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useFetchUser } from '../utils/authContext';
export default function App({ Component, pageProps }: AppProps) {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <Component {...pageProps} />
    </Layout>
  );
}
