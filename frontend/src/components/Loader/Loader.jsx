import React from "react";

const Loader = () => {
  return (
    <div class="flex gap-2">
      <div class="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
      <div class="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
      <div class="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
    </div>
  );
};

export default Loader;
