import React, { ReactElement } from 'react';

export const RoundedSpinner = (): ReactElement => {
  return (
    <div>
      <span className="block h-8 w-8 animate-spin border rounded-full border-r-2 border-r-orange-600 border-t-0 border-b-0 border-l-0">
        &nbsp;
      </span>
    </div>
  );
};
