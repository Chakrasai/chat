import React from "react";

function Navbar({ username }) {
  const initials = username ? username.slice(0, 2).toUpperCase() : "ER";

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between shadow-xl">
      {/* Brand Logo */}
      <h1 className="text-2xl font-extrabold tracking-wider">
        <span className="text-yellow-300">Ech</span>oo
      </h1>

      {/* Navbar Links (Optional) */}
      <ul className="hidden md:flex space-x-6">
        <li className="hover:text-yellow-300 transition duration-300 cursor-pointer">
          <a href="/home">Home</a>
        </li>
        <li className="hover:text-yellow-300 transition duration-300 cursor-pointer">
          <a href="/about">About</a>
        </li>
        <li className="hover:text-yellow-300 transition duration-300 cursor-pointer">
          <a href="/contact">Contact</a>
        </li>
      </ul>

      {/* User Avatar */}
      <div className="relative group">
        <div className="w-12 h-12 flex items-center justify-center bg-white text-blue-600 font-semibold rounded-full border-2 border-yellow-300 shadow-md transform transition duration-300 group-hover:scale-105">
          {initials}
        </div>

        {/* Tooltip on Hover */}
        <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-800 text-white text-xs py-1 px-3 rounded-md shadow-lg">
          {username || "Guest"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
