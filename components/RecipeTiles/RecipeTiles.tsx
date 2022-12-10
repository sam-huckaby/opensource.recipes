import Link from "next/link";
import { FC, ReactNode } from "react";

type RecipeTilesProps = {
  recipes: any[];
}

export const RecipeTiles: FC<RecipeTilesProps> = ({ recipes }: RecipeTilesProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-start w-full">
      {
        recipes.map(({ id, title, description}, idx) => (
          <Link href={`/recipes/${id}`} key={idx}>
            <div className="flex flex-col h-64 w-64 border border-solid rounded border-gray-300 m-4 p-4 cursor-pointer hover:bg-gray-50">
              <div className="font-bold w-full">{title}</div>
              <div className="grow">{description}</div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

