'use client';

import Head from 'next/head';
import { FC } from 'react';
import { useGetRecipes } from 'hooks/useRecipes';
import { RecipeTiles } from 'components/RecipeTiles';

const Home: FC = () => {
  const { recipes, loading: recipesLoading } = useGetRecipes();

  return (
    <div className="flex flex-col grow">
      <Head>
        <title>OpenSource Recipes</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine"
        />
      </Head>

      <main className="flex w-full flex-1 flex-col px-20">
        <div className="mt-6 flex w-full flex-col items-center">
          { recipesLoading && 
              <div className="flex flex-row text-4xl">
                <span className="bouncing-dot">.</span>
                <span className="bouncing-dot">.</span>
                <span className="bouncing-dot">.</span>
              </div>
          }
          <RecipeTiles recipes={recipes} />
        </div>
      </main>
    </div>
  );
};

export default Home;
