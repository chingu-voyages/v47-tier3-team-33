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

  const renderNavLinks = () => (
    <ul className='flex justify-center md:space-x-7 items-center mx-auto'>
      {navLinks.map((link) => (
        <li key={link.href}>
          <a href={link.href} className='text-white hover:underline'>
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );

  const renderHamburgerMenu = () => (
    <button className='tham tham-e-squeeze tham-w-7 bg-pink'>
      <div className="tham-box">
        <div className="tham-inner bg-white" />
      </div>
    </button>
  );

  return (
    <nav className='bg-pink flex items-center flex-wrap pb-10'>
      {/* Logo */}
      <div className='flex items-center  space-x-0 '>
        <a href='/' className='text-white'>
          <img className='object-contain h-48 w-auto' src={omnilogo} alt='Omni logo' />
        </a>
      </div>

      {/* Navigation Links or Hamburger Menu */}
      {isMobile ? renderHamburgerMenu() : renderNavLinks()}

      {/* Login Button */}
      <div className='ml-auto mr-8'>
        <button className='bg-white hover:bg-yellow text-darkTeal font-bold py-1.25 px-3 border border-white rounded'>
          <LRbutton />
        </button>
      </div>
    </nav>
  );
};

// Define navigation links
const navLinks = [
  { href: '/about', text: 'About' },
  { href: '/events', text: 'Events' },
  { href: '/categories', text: 'Categories' },
  { href: '/contact', text: 'Contact Us' },
];

export default NavBar;
