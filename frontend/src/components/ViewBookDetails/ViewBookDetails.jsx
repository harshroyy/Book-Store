import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { IoMdHeart } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewDataDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id, 
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      {headers}
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      {headers}
    );
    alert(response.data.message);
  };

  return (
    <>
      {Data ? (
        <div className="px-4 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-center md:items-start relative">
          <div className="bg-zinc-800 rounded-lg p-6 w-full md:w-1/2 relative overflow-hidden">
            <div
              className="absolute inset-0 rounded-lg z-0"
              style={{
                backgroundImage: `url(${Data.url})`,
                filter: "blur(50px)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
              }}
            ></div>

            <div className="relative z-10 flex justify-center mt-4">
              <img
                src={Data.url}
                alt="/"
                className="h-48 md:h-[50vh] lg:h-[70vh] rounded-xl object-cover"
              />
            </div>

            {isLoggedIn && role === "user" && (
              <div className="z-20 flex gap-2 flex-row mt-4 justify-center md:absolute md:top-4 md:right-4 md:flex-col md:gap-4">
                <button
                  className="bg-white rounded-full text-2xl lg:text-3xl p-2 text-red-500 transition transform hover:scale-110 hover:bg-red-500 hover:text-white duration-200"
                  onClick={handleFavourite}
                >
                  <IoMdHeart />
                  <span className="ml-2 block lg:hidden text-sm">
                    Favourites
                  </span>
                </button>
                <button className="bg-white rounded-full text-2xl lg:text-3xl p-2 text-zinc-800 transition transform hover:scale-110 hover:bg-zinc-700 hover:text-white duration-200"
                   onClick={handleCart}
                >
                  <BsCart2 />
                  <span className="ml-2 block lg:hidden text-sm">
                    Add to cart
                  </span>
                </button>
              </div>
            )}
            {isLoggedIn && role === "admin" && (
              <div className="z-20 flex gap-2 flex-row mt-4 justify-center md:absolute md:top-4 md:right-4 md:flex-col md:gap-4">
                <button className="bg-white rounded-full text-2xl lg:text-3xl p-2 text-red-500 transition transform hover:scale-110 hover:bg-red-500 hover:text-white duration-200">
                  <FaEdit />
                  <span className="ml-2 block lg:hidden text-sm">
                    Edit Book
                  </span>
                </button>
                <button className="bg-white rounded-full text-2xl lg:text-3xl p-2 text-red-600 transition transform hover:scale-110 hover:bg-zinc-700 hover:text-white duration-200">
                  <MdDelete />
                  <span className="ml-2 block lg:hidden text-sm">
                    Delete Book
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="p-4 w-full md:w-1/2">
            <h1 className="text-2xl md:text-4xl text-red-600 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1 text-sm md:text-base">
              by {Data.author}
            </p>
            <p className="text-zinc-500 mt-4 text-base md:text-xl font-thin">
              {Data.desc}
            </p>
            <p className="flex mt-4 items-center text-zinc-400 text-sm md:text-base">
              <GrLanguage className="mr-2" /> {Data.language}
            </p>
            <p className="mt-4 text-red-600 text-xl md:text-3xl font-semibold">
              Price: ₹ {Data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewDataDetails;
