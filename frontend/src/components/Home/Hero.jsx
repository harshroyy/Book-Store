import React from "react";
import { Link } from "react-router-dom"; 

function Hero() {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-red-500 text-center lg:text-left">
          Summon Your Next Hellish Read
        </h1>
        <p className="mt-4 md:mb-0 lg:text-xl text-zinc-300 font-thin text-center lg:text-left typing-effect">
          Unveil twisted tales, forbidden knowledge, and dark inspiration in our
          haunted collection of volumes
        </p>
        <div className="mt-8">
          <Link to="/all-books" className="text-red-500 text-xl lg:text-2xl font-semibold border border-red-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Explore Reads
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-2/5 h-auto flex items-center justify-center lg:ml-20 lg:pl-10 p-4">
  <img
    src="/rep1.png"
    alt="hero"
    className="w-full h-auto lg:w-auto lg:h-[100%] object-contain"
  />
</div>
    </div>
  );
}

export default Hero;
