import NextAuth from 'next-auth';

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
    async jwt({ token, account, profile }) {
      return token;
    },
  },
});
