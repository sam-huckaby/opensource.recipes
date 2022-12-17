import NextAuth from 'next-auth';
import { sign } from 'jsonwebtoken';

import { BI_APPLICATION_ID, BI_REALM_ID, BI_TENANT_ID } from 'constants/auth';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    {
      id: 'beyondidentity',
      name: 'Beyond Identity',
      type: 'oauth',
      wellKnown: `https://auth-us.beyondidentity.com/v1/tenants/${BI_TENANT_ID}/realms/${BI_REALM_ID}/applications/${BI_APPLICATION_ID}/.well-known/openid-configuration`,
      authorization: { params: { scope: 'openid' } },
      clientId: process.env.APP_CLIENT_ID,
      clientSecret: process.env.APP_CLIENT_SECRET,
      idToken: true,
      checks: ['state'],
      profile(profile) {
        return {
          id: profile.sub,
          admin: false,
        };
      },
    },
  ],
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      // Inspired by: https://medium.com/@gracew/using-supabase-rls-with-a-custom-auth-provider-b31564172d5d
      // Create a Supabase-Secret-signed JWT to pass user id to Supabase for auth
      const supaToken = sign(
        { userId: token.sub },
        process.env.SUPABASE_JWT_SECRET || ''
      );
      // Wrap the new Supabase token into the next-auth token
      return {
        supaToken,
        ...token,
      };
    },
    session: async ({session, token}) => {
    // Append the userId to the session, so we can use it on the client side
    session.user.id = token.sub;
    //session.user.email = token.email;

    return session;
    },
  },
});
