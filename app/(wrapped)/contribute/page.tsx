import { FC } from 'react';

const Contribute: FC = () => {

  return (
    <div className="flex flex-col grow">
      <main className="flex w-full flex-1 flex-col px-20">
        <div className="mt-6 flex w-full flex-col items-center">
          <p>Build OpenSource.Recipes!</p>
          <a href="https://github.com/sam-huckaby/opensource.recipes" className="text-orange-500">Contribute today!</a>
        </div>
      </main>
    </div>
  );
};

export default Contribute;
