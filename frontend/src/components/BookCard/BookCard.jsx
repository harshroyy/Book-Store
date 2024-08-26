import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col transform transition-transform duration-300 ease-out hover:scale-105">
        <div
            className="bg-red-950 rounded flex items-center justify-center"
            style={{
              backgroundImage: `url('/bg4.jpg')`,
              backgroundSize: 'cover', // or 'contain' depending on your preference
              backgroundPosition: 'center',
            }}
          >
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl font-thin">{data.title}</h2>
          <p className="mt-4 text-red-600 font-thin text-sm">by {data.author}</p>
          <p className="mt-4 text-zinc-200 font-thin text-xl"> ₹ {data.price} </p>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
