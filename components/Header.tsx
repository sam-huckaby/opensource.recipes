'use client';

import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react';
import { RoundedSpinner } from "./loaders";
import { FormEvent, MouseEvent, useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [registerDialogOpen, setRegisterDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const BeyondIdentity = await import('utils/beyondidentity');
      const embedded = new BeyondIdentity.default();
      const credList = await embedded.getCredentials();
      setLoading(false);
      setCredentials(credList);
    })();
  }, []);

  const register = async (e: FormEvent | MouseEvent) => {
    // Stop the overzealous form from resubmitting
    e.preventDefault();
    setErrorMessage(undefined);

    // If the button was clicked for the first time, just open the input
    if (!registerDialogOpen) {
      setRegisterDialogOpen(true);
      return;
    }

    // If the email is bad, notify the user
    if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      // This email is not good.
      setErrorMessage('Not a valid e-mail address');
      return;
    }

    // Setup the Beyond Identity SDK
    const BeyondIdentity = await import('utils/beyondidentity');
    const embedded = new BeyondIdentity.default();

    // Make the signup request to the custom register API handler
    const req = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // If the status code is anything other than OK, display the message
    if (req.status >= 300) {
      const message = await req.text();
      setErrorMessage(message);
      return;
    }

    // Reset the form after submission.
    // This may be unnecessary, since they should leave the page during auth
    setEmail(undefined);
    setRegisterDialogOpen(false);

    // Convert the response (which should be valid to reach this point) to JSON for redirect
    const result = await req.json();

    // Check if the URL is a valid bind URL and then use next-auth to sign in.
    if (await embedded.isBindCredentialUrl(result.url)) {
      await embedded.bindCredential(result.url);
      window.postMessage('update-credentials', '*');
      signIn('beyondidentity');
    }
  };

  const authButton = session ? (
    <button
      className="whitespace-nowrap border rounded p-2 h-12 hover:bg-orange-400 hover:border-orange-400 hover:bg-opacity-50"
      onClick={() => signOut()}>
      Sign Out
    </button>
  ) : loading ? (
    <RoundedSpinner />
  ) : credentials.length > 0 ? (
    <button
      className="whitespace-nowrap border rounded p-2 h-12 hover:bg-orange-400 hover:border-orange-400 hover:bg-opacity-50"
      onClick={() => signIn()}>
      Sign In
    </button>
  ) : (
    // This is a bad dumb form that I need to rebuild with almost literally anything better
    <form className="flex flex-row" onSubmit={(e) => register(e)}>
      {errorMessage && (
        <span className="absolute -mt-4 text-sm">{errorMessage}</span>
      )}
      {registerDialogOpen && (
        <input
          type="email"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          onChange={(e) => setEmail(e.target.value)}
          className={`rounded border border-gray-600 h-12 pl-2 pr-2 invalid:bg-red-200 ${
            errorMessage ? 'bg-red-200' : ''
          }`}
        />
      )}
      <button
        className="relative whitespace-nowrap border rounded p-2 h-12 hover:bg-orange-400 hover:border-orange-400 hover:bg-opacity-50"
        onClick={(e) => register(e)}>
        Sign Up
      </button>
    </form>
  );

  return <div className="flex flex-row pt-8 px-4">
          <Image
            src="/OSR_Logo_vector.svg"
            height={64}
            width={64}
            alt="Opensource Recipes Logo"
          />
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
        </div>;
}
