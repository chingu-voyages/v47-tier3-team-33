import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import omnilogo from '../assets/omni-logo.png';
import LRbutton from './LRbutton';
import { CgProfile } from 'react-icons/cg';
import { Navigate } from 'react-router';

const NavBar: React.FC = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const { user } = useAuth();

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
		<ul className='flex justify-center md:space-x-7 items-center mx-auto text-lg'>
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
		<button className='tham tham-e-squeeze tham-w-7 bg-pink pl-4'>
			<div className='tham-box'>
				<div className='tham-inner bg-white' />
			</div>
		</button>
	);

	return (
		<nav className='bg-pink flex items-center justify-between relative py-8'>
			{/* Logo */}
			<div className='flex items-center space-x-0 absolute'>
				<a href='/' className='text-white'>
					<img className='object-contain h-60' src={omnilogo} alt='Omni logo' />
				</a>
			</div>

			{/* Navigation Links or Hamburger Menu */}
			{isMobile ? (
				renderHamburgerMenu()
			) : (
				<div className='text-center w-full ml-32'>{renderNavLinks()}</div>
			)}

			{/* Login Button */}
			<div className='ml-auto mr-8'>
				{!user ? (
					<button className='bg-white hover:bg-yellow text-darkTeal font-bold py-1.25 px-3 border border-white rounded'>
						<LRbutton />
					</button>
				) : (
					<div className=''>
						<CgProfile />
					</div>
				)}
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
