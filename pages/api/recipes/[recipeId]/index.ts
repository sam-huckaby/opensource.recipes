import { SupabaseClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';
// Get the supabase constructor
import { init as initSupabase } from 'utils/supabase';

const getHandler = async (recipeId: string, res: NextApiResponse, supabase:SupabaseClient) => {
  let { data: recipe, error } = await supabase.from('recipes').select('*').eq('id', recipeId).limit(1).single();

  if (error) {
    return res.status(500).send(error);
  }

  return res.status(200).json(recipe);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate route params first
  if (!req.query.recipeId || typeof req.query.recipeId !== 'string') {
    return res.status(403).send("Recipe ID not recognized");
  }

  const supabase = await initSupabase(req);

  switch(req.method) {
    case "GET":
      return getHandler(req.query.recipeId, res, supabase);
    default:
      return res.status(404).send("Unrecognized HTTP Request");
  }
};
