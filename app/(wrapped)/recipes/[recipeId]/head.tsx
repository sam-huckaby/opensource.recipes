// TODO: MOVE THIS TO AN UPPER TYPING FILE
type RecipeParams = {
	params: {
		recipeId: string
	},
};

async function getRecipe(uuid: string) {
  const res = await fetch(`${process.env.APP_HOST}/api/recipes/${uuid}`);
  return res.json();
}

export default async function Head({ params }: RecipeParams) {
  const { title } = await getRecipe(params.recipeId);
console.log(title);
  return (
    <>
      <title>{ title }</title>
    </>
  )
}
