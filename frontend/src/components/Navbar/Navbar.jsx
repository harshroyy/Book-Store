import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All-Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  return (
    <div className="flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
      <div className="flex items-center">
        <img className="h-10 me-4" src="/logo.png" alt="logo" />
        <h1 className="text-2xl font-thin">Hellscript</h1>
      </div>

      <div className="nav-links-hellscript flex items-center gap-4">
        <div className=" flex font-thin gap-4">
          {links.map((items, i) => (
            <Link
              to={items.link}
              className="hover:text-red-600 transition-all duration-300"
              key={i}
            >
              {items.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <Link
            to="/Login"
            className="px-4 py-1 font-thin border border-red-600 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/SignUp"
            className="px-4 py-1 font-thin bg-red-600 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
