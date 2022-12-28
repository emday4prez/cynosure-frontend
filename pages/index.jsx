import Head from 'next/head';
import Hero from '../components/hero';
import Info from '../components/info';
import { fetcher } from '../utils/api';
import { Inter } from '@next/font/google';
import AllFasts from '../components/allFasts';
const inter = Inter({ subsets: ['latin'] });

export default function Home({ allFasts }) {
  return (
    <>
      <Head>
        <title>Intermittent Fasting</title>
        <meta
          name="description"
          content="cynosure is a website for keeping track of intermittent fasting"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Info />
      <AllFasts fasts={allFasts} />
    </>
  );
}

export async function getStaticProps() {
  const allFastsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/fasts/`
  );

  return {
    props: {
      allFasts: allFastsResponse,
    },
  };
}
