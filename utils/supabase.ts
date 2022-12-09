import { createClient } from '@supabase/supabase-js';
import { NextApiRequest } from 'next';
import { getToken, JWT } from 'next-auth/jwt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL not found');
}
if (!supabaseKey) {
  throw new Error('Supabase key not found');
}

export const init = async (req: NextApiRequest) => {
  // Get the Supabase JWT from next-auth
  // Inspired by: https://medium.com/@gracew/using-supabase-rls-with-a-custom-auth-provider-b31564172d5d
  // Get the session token from Next-Auth
  const token = await getToken({ req });

  // Create a Supabase instance using the supabase token stored in the next-auth token
  // Users not logged in will pass null here
  return Supabase(token?.supaToken as JWT);
};

export const Supabase = (authToken: JWT | null) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    },
  });
};
