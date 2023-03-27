import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">

      <span className="relative flex h-20 w-20">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-20 w-20 bg-sky-500"></span>
      </span>
    </div>
  );
};

export default Loading;
