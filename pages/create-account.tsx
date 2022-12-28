import { useFetchUser } from '../utils/authContext';
import { default as RegisterComponent } from '../components/register';
import Head from 'next/head';
export default function CreateAccount() {
  const { user, loading } = useFetchUser();
  return (
    <>
      <Head>
        <title>Create Account</title>
        <meta name="description" content="create an account with cynosure" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegisterComponent />
    </>
  );
}
