import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook = async () => {
    const response  = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
    );
    alert(response.data.message);
  }
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col transform transition-transform duration-300 ease-out hover:scale-105">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div
            className="bg-red-950 rounded flex items-center justify-center"
            style={{
              backgroundImage: `url('/bg4.jpg')`,
              backgroundSize: "cover", // or 'contain' depending on your preference
              backgroundPosition: "center",
            }}
          >
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl font-thin">{data.title}</h2>
          <p className="mt-4 text-red-600 font-thin text-sm">
            by {data.author}
          </p>
          <p className="mt-4 text-zinc-200 font-thin text-xl">
            {" "}
            ₹ {data.price}{" "}
          </p>
        </div>
      </Link>
      {favourite && (
            <button
              className="bg-red-950 font-thin px-4 py-2 rounded border border-red-950 text-red-50"
              onClick={handleRemoveBook}
            >
              Remove from favourites
            </button>
          )}
    </div>
  );
};

export default BookCard;
