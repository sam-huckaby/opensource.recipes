'use client';

import { useEffect, useState } from 'react';

export type Recipe = {
  id: string;
  title: string;
  description: string;
}

export const useGetRecipes = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipesFound = await (await fetch('/api/recipes')).json();
      setRecipes(recipesFound);
      setLoading(false);
    };
    // Start the search
    getRecipes();
  }, []);
  
  return {
    recipes,
    loading,
  };
};

export const useGetRecipe = ({ recipeId }: { recipeId: string }) => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);

  useEffect(() => {
    const getRecipe = async () => {
      console.log(recipeId);
      const recipe = await (await fetch(`/api/recipes/${recipeId}`)).json();
      setRecipe(recipe);
      setLoading(false);
    };
    // Start the search
    getRecipe();
  }, []);
  
  return {
    recipe,
    loading,
  };
};

