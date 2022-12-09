import { useEffect, useState } from 'react';
import { Credential } from '@beyondidentity/bi-sdk-js';
import { RoundedSpinner } from 'components/loaders';
import Image from 'next/image';

const BIAuthenticate = () => {
  const [biAuthenticateResult, setBiAuthenticateResult] = useState('');
  const [credentialList, setCredentialList] = useState<Credential[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authUrl, setAuthUrl] = useState<string>('');

  useEffect(() => {
    // Define an authentication handler
    const authenticate = async () => {
      // Import the BI SDK
      const BeyondIdentityEmbeddedSdk = await import(
        '@beyondidentity/bi-sdk-js'
      );
      // Initialize the Embedded SDK before proceeding
      const embedded = await BeyondIdentityEmbeddedSdk.Embedded.initialize();

      // If we are on the bi-authenticate page, continue on
      if (embedded.isAuthenticateUrl(window.location.href)) {
        // Get the url with the app's TLD
        setAuthUrl(window.location.href);

        // Retrieve a list of available credentials on this device
        const credentials: Credential[] = await embedded.getCredentials();
        // Populate the list of credentials to select from
        setCredentialList(credentials);
        // Mark loading complete
        setLoading(false);
      }
    };
    // Attempt to authenticate a user
    authenticate().catch(console.error);
  }, []);

  const startAuth = async (selectedId: number) => {
    // Re-show the loading panel
    setLoading(true);
    // Import the BI SDK
    const BeyondIdentityEmbeddedSdk = await import('@beyondidentity/bi-sdk-js');
    // Initialize the Embedded SDK before proceeding
    const embedded = await BeyondIdentityEmbeddedSdk.Embedded.initialize();

    // Perform authentication using selected credential's ID
    const { redirectURL } = await embedded.authenticate(authUrl, selectedId);

    // Move the user on to the app
    window.location.href = redirectURL;
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="pb-4 text-xl">Login as:</h1>
        <div className="relative flex flex-col overflow-scroll w-[400px] min-h-[400px] max-h-[400px] shadow-inner pr-4 pl-4 pb-4">
          {loading && (
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-300 opacity-50 flex justify-center items-center">
              <RoundedSpinner />
            </div>
          )}
          {credentialList.map((cred) => (
            <button
              key={cred.id}
              className="border rounded p-4 flex flex-row items-center hover:bg-gray-100 mt-4"
              onClick={() => startAuth(cred.id)}>
              <Image
                src={cred.theme.logoUrlLight}
                alt="Open Source Recipe logo"
                height={50}
                width={50}
              />
              <span className="pl-4 font-bold">
                {cred.identity.displayName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BIAuthenticate;
