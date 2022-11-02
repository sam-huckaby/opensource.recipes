import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Credential } from '@beyondidentity/bi-sdk-js';

const BIAuthenticate = () => {
  const [biAuthenticateResult, setBiAuthenticateResult] = useState('');

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
        const biAuthenticateUrl = window.location.href;

        // Begin the authentication handshake
        biAuthenticate(biAuthenticateUrl)
          .then((redirectURL) => {
            // Redirect to the redirectURL after authentication sucessfull completes
            window.location.href = redirectURL;
          })
          .catch((error) => {
            // Catch and set the error to the page's result
            setBiAuthenticateResult(error.toString());
          });
      }
    };
    // Attempt to authenticate a user
    authenticate().catch(console.error);
  }, []);

  // Actual authentication handler
  async function biAuthenticate(url: string): Promise<string> {
    // Import the BI SDK again
    const BeyondIdentityEmbeddedSdk = await import('@beyondidentity/bi-sdk-js');
    // Initialize the SDK... again..?
    const embedded = await BeyondIdentityEmbeddedSdk.Embedded.initialize();

    // Retrieve a list of available credentials on this device
    const credentials: Credential[] = await embedded.getCredentials();

    // Display a text prompt with a list of credentials the user can select from by entering a number
    let promptText = credentials
      .map((credential, index) => {
        return `${index}: ${credential.identity.username}`;
      })
      .join('\n');

    // Parse the user's response into a number
    const selectedIndex = parseInt(prompt(promptText, 'index')!!);
    // If the user selects a real credential from the list
    if (selectedIndex >= 0 && selectedIndex < credentials.length) {
      // Get the ID of the selected credential
      const selectedId = credentials[selectedIndex].id;
      // Perform authentication using selected credential's ID
      const result = await embedded.authenticate(url, selectedId);
      // Return the redirectURL returned by the SDK so that the app can navigate there
      return Promise.resolve(result.redirectURL);
    } else {
      // Otherwise, panic and hose the whole process
      return Promise.resolve('unknown_id');
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
        <div className="row">
          {biAuthenticateResult.length > 0 && (
            <div className="row row-cols-1 row-cols-md-1 mt-3">
              <div className="col">
                <code>{JSON.stringify(biAuthenticateResult, null, 2)}</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BIAuthenticate;
