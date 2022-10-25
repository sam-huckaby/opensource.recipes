import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  const recipes = [
    {
      title: "A safer git rebase",
      description: "A little more work, but a lot more piece of mind",
    },
    {
      title: "Quick NextJs playground",
      description: "Setting up a Nextjs playground in Vercel from the ground up",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col py-8">
      <Head>
        <title>OpenSource Recipes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine" />
      </Head>

      <main className="flex w-full flex-1 flex-col px-20">
        <div className="flex flex-col w-full">
          <h1 className="text-6xl font-bold self-start">
            Open Source
          </h1>
          <span className="italic font-cursive-lettering -mt-8 text-8xl text-orange-600 self-end">Recipes</span>
        </div>

        <div className="mt-6 flex w-full flex-col items-center">
          {
            recipes.map(
              ({title, description}) => <div className="border rounded-xl w-11/12 mt-16 relative p-6">
                <a href="" className="border-t border-r border-l rounded-t-xl absolute -top-2 right-4">Check it out</a>
                <span className="text-4xl">{title}</span>
                <p>{description}</p>
              </div>
            )
          }
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
