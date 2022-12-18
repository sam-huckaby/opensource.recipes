'use client';

import { FC } from "react";
import { BookmarkBook } from "iconoir-react";

export const SaveToWorkbook: FC = () => {
  return (
    <>
      <button className="flex flex-row justify-around items-center whitespace-nowrap border rounded p-2 h-12 hover:bg-orange-400 hover:border-orange-400 hover:bg-opacity-50">
        <BookmarkBook height={20} width={20} /><span className="text-md ml-1">Save To Workbook</span>
      </button>
    </>
  );
};
