import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'utils/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { data: recipes, error } = await supabase.from('recipes').select('*');

  if (error) {
    res.status(500).send(error);
  }

  res.status(200).json(recipes);
};
