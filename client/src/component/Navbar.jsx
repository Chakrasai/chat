import React from "react";

function Navbar({ username }) {
  const initials = username ? username.slice(0, 2).toUpperCase() : "ER";

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      {/* Empty div to balance the layout */}
      <div className="w-10"></div>

      {/* Chat Name in Center */}
      <h1 className="text-xl font-bold tracking-wide">Chat App</h1>

      {/* User Avatar on the Right */}
      <div className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 font-semibold rounded-full shadow-md">
        {initials}
      </div>
    </nav>
  );
}

export default Navbar;
