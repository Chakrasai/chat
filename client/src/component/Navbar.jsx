import React from "react";
import { useNavigate } from "react-router-dom";
const apiurl = import.meta.env.VITE_API_ORIGIN;

function Navbar({ username }) {
  const initials = username ? username.slice(0, 2).toUpperCase() : "ER";
  const navigate = useNavigate();
  const logout = async () => {
    try{
      const response = await fetch(`${apiurl}/logout`, { credentials: 'include' });
      
      if(response.ok){
        navigate('/');
      }
    }
    catch(err){
      console.error('Error logging out:',err)
    }
  }

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

        {/* Dropdown on Hover */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-800 text-white text-sm py-2 px-4 rounded-md shadow-lg">
          <p className="mb-2">{username || "Guest"}</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
