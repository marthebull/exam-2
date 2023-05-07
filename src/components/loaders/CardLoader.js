import React from "react";

const CardLoader = () => {
  return (
    <div
      role="status"
      className="full-w rounded overflow-hidden shadow-md animate-pulse"
    >
      <div className="relative overflow-hidden bg-no-repeat h-80 bg-gray-200 dark:bg-gray-700"></div>
      <div className="px-3 py-4">
        <h3 className="mb-4 h3 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700">
          &nbsp;
        </h3>
        <p className="mb-2 rounded-md w-1/3 bg-gray-200 dark:bg-gray-700">
          &nbsp;
        </p>
        <p className="mb-2 rounded-md w-1/3 bg-gray-200 dark:bg-gray-700">
          &nbsp;
        </p>
      </div>
    </div>
  );
};

export default CardLoader;
