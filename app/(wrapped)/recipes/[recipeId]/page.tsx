import { SaveToWorkbook } from "components/SaveToWorkbook";

type PageParams = {
	params: {
		recipeId: string;
	}
}

 //	Warning: You can use async/await in layouts and pages, which are Server Components. Using async/await inside other components, with TypeScript, can cause errors from the response type from JSX. We are working with the TypeScript team to resolve this upstream. As a temporary workaround, you can use {/* @ts-expect-error Server Component */} to disable type checking for the component.

const RecipeDetail = async ({ params }: PageParams) => {
	const recipe = await (await fetch(`${process.env.APP_HOST}/api/recipes/${params.recipeId}`)).json();

	return (
		<div className="px-8 mt-16 flex flex-col">
			<div className="flex flex-row items-center justify-center border-b border-solid">
				<h1 className="text-4xl mt-4 pb-2">{ recipe.title }</h1>
			</div>
			<p className="italic mt-2">{ recipe.description }</p>
			<div className="flex flex-row mt-4">
				<SaveToWorkbook />
			</div>
		</div>
	);
}

export default RecipeDetail;
