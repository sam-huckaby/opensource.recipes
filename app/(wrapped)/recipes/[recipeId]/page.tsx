type PageParams = {
	params: {
		recipeId: string;
	}
}

 //	Warning: You can use async/await in layouts and pages, which are Server Components. Using async/await inside other components, with TypeScript, can cause errors from the response type from JSX. We are working with the TypeScript team to resolve this upstream. As a temporary workaround, you can use {/* @ts-expect-error Server Component */} to disable type checking for the component.

const RecipeDetail = async ({ params }: PageParams) => {
	const recipe = await (await fetch(`${process.env.APP_HOST}/api/recipes/${params.recipeId}`)).json();

	return (
		<div>
			<h1 className="text-2xl">{ recipe.title }</h1>
			<p className="italic">{ recipe.description }</p>
		</div>
	);
}

export default RecipeDetail;
