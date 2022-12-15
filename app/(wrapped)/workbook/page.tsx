import { FC } from 'react';

const Workbook: FC = () => {

  return (
    <div className="flex flex-col grow">
      <main className="flex w-full flex-1 flex-col px-20">
        <div className="mt-6 flex w-full flex-col items-center">
          <div className="flex flex-row text-4xl">
            <span className="bouncing-dot">.</span>
            <span className="bouncing-dot">.</span>
            <span className="bouncing-dot">.</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workbook;
