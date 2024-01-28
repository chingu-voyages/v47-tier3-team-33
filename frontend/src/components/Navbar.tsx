import React, { useState, useEffect } from 'react';
import omnilogo from '../assets/omni-logo.png';
import LRbutton from './LRbutton';

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1068);
    };

    handleResize(); // Set initial state based on window width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className='bg-pink p-6 items-center flex-wrap'>
      <div className='flex items-center flex-shrink-0 mr-6'>
        {/* Logo */}
        <div className='fill-current flex-shrink-0 items-center absolute'>
          <a href='/' className='text-white'>
            <img
              className='object-contain h-48 w-auto'
              src={omnilogo}
              alt='Omni logo'
            />
          </a>
        </div>

        {/* Navigation Links or Hamburger Menu */}
        {isMobile ? (
          // Hamburger Menu
          <button className='tham tham-e-squeeze tham-w-7 bg-pink'>
            <div className="tham-box">
    			<div className="tham-inner bg-white" />
  			</div>

          </button>
        ) : (
          // Regular Navigation Links
          <ul className='flex md:space-x-7 justify-content items-center mx-auto'>
            <li>
              <a href='/about' className='text-white'>
                About
              </a>
            </li>
            <li>
              <a href='/events' className='text-white'>
                Events
              </a>
            </li>
            <li>
              <a href='/categories' className='text-white'>
                Categories
              </a>
            </li>
            <li>
              <a href='/contact' className='text-white'>
                Contact Us
              </a>
            </li>
          </ul>
        )}

        {/* Login Button*/}
        <div className='ml-auto'>
          <button className='bg-white hover:bg-yellow text-darkTeal font-bold py-1.25 px-4 border border-white rounded '>
            <LRbutton />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;