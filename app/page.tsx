'use client';

import Head from 'next/head';
import Image from 'next/image';
import { FC } from 'react';
import { useGetRecipes } from 'hooks/useRecipes';
import Link from 'next/link';

const Home: FC = () => {
  const { recipes, loading: recipesLoading } = useGetRecipes();

  return (
    <div className="flex flex-col">
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
          {recipes.map(({ id, title, description }, index) => (
            <div
              key={index}
              id="notecard"
              className="flex flex-col w-11/12 max-w-[900px] mb-4">
              <div id="notecard_tab" className="flex flex-row justify-end mr-4">
                <Link
                  href={`/recipes/${id}`}
                  className="border-t border-r border-l rounded-t-xl pt-1 px-4 bg-white z-10 -mb-[1px]">
                  Check it out
                </Link>
              </div>
              <div
                id="notecard_body"
                className="border rounded-xl w-full relative p-6">
                <span className="text-4xl">{title}</span>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
