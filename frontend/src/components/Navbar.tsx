import React from 'react';
import omnilogo from "../assets/omni-logo.png"

const NavBar = () => {
  return (
    <nav className="bg-pink p-6 items-center flex-wrap">
      <div className="flex items-center flex-shrink-0 mr-6">
        {/* Logo */}
        <div className="fill-current flex-shrink-0 items-center absolute">
            <img 
                className="object-contain h-48 w-auto"
                src={omnilogo} alt="Omni logo"/>
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-4 md:space-x-7 items-center mx-auto ">
          <li><a href="/about" className="text-white">About</a></li>
          <li><a href="/events" className="text-white">Events</a></li>
          <li><a href="/categories" className="text-white">Categories</a></li>
          <li><a href="/contact" className="text-white">Contact Us</a></li>
        </ul>
        <div>
        {/* Login Button*/}
            <button className="bg-white hover:bg-darkTeal text-black font-bold py-2 px-4 border border-blue-700 rounded">
                Login
            </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;