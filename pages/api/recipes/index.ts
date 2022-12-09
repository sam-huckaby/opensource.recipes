import type { NextApiRequest, NextApiResponse } from 'next';
// Get the supabase constructor
import { init as initSupabase } from 'utils/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = await initSupabase(req);

  let { data: recipes, error } = await supabase.from('recipes').select('*');

  if (error) {
    return res.status(500).send(error);
  }

  return res.status(200).json(recipes);
};
