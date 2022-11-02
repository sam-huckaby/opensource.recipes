import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Credential } from 'utils/beyondidentity';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    (async () => {
      const BeyondIdentity = await import('utils/beyondidentity');
      const embedded = new BeyondIdentity.default();
      const credList = await embedded.getCredentials();
      setCredentials(credList);
      console.log(credList);
    })();
  }, []);

  const register = async () => {
    const BeyondIdentity = await import('utils/beyondidentity');
    const embedded = new BeyondIdentity.default();

    const result = await (
      await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@opensource.recipes' }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    ).json();

    console.log(result);

    if (await embedded.isBindCredentialUrl(result.url)) {
      await embedded.bindCredential(result.url);
      window.postMessage('update-credentials', '*');
      signIn('beyondidentity');
    }

    // ???
    // http://localhost:3000/bind?api_base_url=https%3A%2F%2Fauth-us.beyondidentity.com&identity_id=825fc386dcc96041&job_id=6873928a4c1d7125&realm_id=0b56f4a3dc66617c&tenant_id=0001bb06bb5ec191&token=xAxckRwnBjzMVlqOoN45tcD_1puYoioVVXQkjMgTlGivgXHK6WWR9A2ePIxBE9mm

    // Make a request to /api/auth/register with the user's email
    // --- IN register.ts
    // call BeyondIdentity developer API create identity endpoint (https://developer.beyondidentity.com/api/v1#tag/Identities/operation/CreateIdentity)
    // call BeyondIdentity developer API create credential binding job endpoint (https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs/operation/CreateCredentialBindingJob)
    // Let user click on the email they receive in their email to bind the credential?
    // navigate the user back to the home page?
  };

  const authButton = session ? (
    <button
      className="whitespace-nowrap border rounded p-2 h-12 hover:bg-orange-400 hover:border-orange-400 hover:bg-opacity-50"
      onClick={() => signOut()}>
      Sign Out
    </button>
  ) : credentials.length > 0 ? (
    <button
      className="whitespace-nowrap border rounded p-2 h-12 hover:bg-orange-400 hover:border-orange-400 hover:bg-opacity-50"
      onClick={() => signIn()}>
      Sign In
    </button>
  ) : (
    <button
      className="whitespace-nowrap border rounded p-2 h-12 hover:bg-orange-400 hover:border-orange-400 hover:bg-opacity-50"
      onClick={() => register()}>
      Sign Up
    </button>
  );

  const recipes = [
    {
      title: 'A safer git rebase',
      description: 'A little more work, but a lot more piece of mind',
    },
    {
      title: 'Quick NextJs playground',
      description:
        'Setting up a Nextjs playground in Vercel from the ground up',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col py-8">
      <Head>
        <title>OpenSource Recipes</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine"
        />
      </Head>

      <main className="flex w-full flex-1 flex-col px-20">
        <div className="flex flex-row">
          <div
            id="logo_container"
            className="flex flex-col w-full justify-start">
            <h1 className="text-4xl font-bold">Open Source</h1>
            <span className="italic font-cursive-lettering -mt-4 text-6xl text-orange-600">
              Recipes
            </span>
          </div>
          <div className="flex flex-row" id="account_container">
            {authButton}
          </div>
        </div>

        <div className="mt-6 flex w-full flex-col items-center">
          {recipes.map(({ title, description }, index) => (
            <div
              key={index}
              id="notecard"
              className="flex flex-col w-11/12 max-w-[900px] mb-4">
              <div id="notecard_tab" className="flex flex-row justify-end mr-4">
                <a
                  href=""
                  className="border-t border-r border-l rounded-t-xl pt-1 px-4 bg-white z-10 -mb-[1px]">
                  Check it out
                </a>
              </div>
              <div
                id="notecard_body"
                className="border rounded-xl w-full relative p-6">
                <span className="text-4xl">{title}</span>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
