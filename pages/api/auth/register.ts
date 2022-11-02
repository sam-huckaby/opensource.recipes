import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'utils/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  console.log(req.body.email);
  if (!email) {
    return res.status(422).send('Missing email for registration');
  }

  /*
 	{
		"id": "e372db224c06e850",
		"realm_id": "8f5bec58229e6f29",
		"tenant_id": "0001f1f460b1ace6",
		"display_name": "Test Identity",
		"create_time": "2022-04-12T05:53:07.119Z",
		"update_time": "2022-06-16T14:31:03.770Z",
		"traits": {
			"type": "traits_v0",
			"username": "test",
			"primary_email_address": "test@example.com"
		}
	} 
  */
  const identity = await (
    await fetch(
      `https://api-us.beyondidentity.com/v1/tenants/${process.env.TENANT_ID}/realms/${process.env.REALM_ID}/identities`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + process.env.API_TOKEN,
        },
        body: JSON.stringify({
          identity: {
            display_name: req.body.email,
            traits: {
              type: 'traits_v0',
              username: req.body.email,
              primary_email_address: req.body.email,
            },
          },
        }),
      }
    )
  ).json();

  console.log(identity);

  const credentialBindingJob = await (
    await fetch(
      `https://api-us.beyondidentity.com/v1/tenants/${process.env.TENANT_ID}/realms/${process.env.REALM_ID}/identities/${identity.id}/credential-binding-jobs`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + process.env.API_TOKEN,
        },
        body: JSON.stringify({
          job: {
            delivery_method: 'RETURN',
            post_binding_redirect_uri: 'http://localhost:3000/',
            authenticator_config_id: process.env.AUTHENTICATOR_CONFIG_ID,
          },
        }),
      }
    )
  ).json();

  console.log(credentialBindingJob.credential_binding_link);

  return res
    .status(200)
    .json({ url: credentialBindingJob.credential_binding_link });
};
