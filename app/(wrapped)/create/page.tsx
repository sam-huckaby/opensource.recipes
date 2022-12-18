'use client';

import { FC, useState} from 'react';

const Create: FC = () => {
  const [ rendered, setRendered ] = useState('');
  
  const markupChanged = (newText: string) => {
  //const converted = newText.split('```')
  //                            .reduce((acc, cur, idx) => 
  //                              idx % 2 === 0 ?
  //                                `${acc}${cur}` :
  //                                `${acc}<pre><code>${cur.trim().replace(/(\r\n|\r|\n)/g, '<br>')}</pre></code>`, '');
    setRendered(newText);
  };

  return (
    <div className="flex flex-col grow">
      <main className="flex w-full flex-1 flex-col px-5">
        <div className="flex flex-row justify-between items-center py-2">
          <label htmlFor='recipe_title' className="font-bold mr-2 text-xl">Title</label>
          <input id="recipe_title" name="recipe_title" type="text" className="border border-solid rounded w-full p-1" />
        </div>
        <div className="flex flex-row w-full">
          <div className='basis-1/2 grow border border-1 border-solid bg-red-500 h-full'>
            <textarea className='w-full h-full p-2'onChange={(e) => markupChanged(e.target.value)} />
          </div>
          <div className='basis-1/2 grow border border-1 border-solid bg-green-500 h-full whitespace-pre-wrap'>
            {rendered }
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
