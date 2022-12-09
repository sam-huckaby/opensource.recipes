'use client';

import { useGetRecipe } from "hooks/useRecipes";
import { FC } from "react";

type PageProps = {
	params: any;
}

const RecipeDetail: FC<PageProps> = ({ params }) => {
	// Destructure the params and grab the id of the current recipe
	const { recipeId } = params;
	// Retrieve the recipe from the DB by id.
	const { recipe, loading } = useGetRecipe({ recipeId });
	
	if (loading) {
		return <div>Loading 2</div>;
	}

	return <div>
		<h1 className="text-2xl">{ recipe.title }</h1>
		<p className="italic">{ recipe.description }</p>
	</div>;
}

export default RecipeDetail;
