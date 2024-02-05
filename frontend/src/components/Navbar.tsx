import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import omnilogo from '../assets/omni-logo.png';
import LRbutton from './LRbutton';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import SideDrawer from '../navagation/SideDrawer';


const NavBar: React.FC = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
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

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const renderHamburgerMenu = () => (
		<button
			className='tham tham-e-squeeze tham-w-7 bg-pink w-[60px] h-[60px] text-center flex justify-start items-center pl-4 z-50'
			onClick={toggleMenu}
		>
			<div className='tham-box'>
				<div className='tham-inner bg-white' />
			</div>
		</button>
	);

	const renderCloseIcon = () => (
		<button className='bg-pink pl-4 cursor-pointer z-50' onClick={toggleMenu}>
			<span className='text-white text-4xl'>
				<IoClose />
			</span>
		</button>
	);









	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };
    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };
	return (
		<nav className='bg-pink flex items-center justify-between relative py-8 w-full'>
			

			<div className='flex items-center justify-center absolute z-20' onClick={openDrawerHandler}>
				<a href='/' className='text-white '>
					<img className='object-contain h-60' src={omnilogo} alt='Omni logo' />
				</a>
			</div>

			{drawerIsOpen && user && 
			<div className="absolute right-1 bg-white h-[600px] text-black top-20 z-50 p-10">
			Hello
			</div>
			}
			
			<div className="rounded-lg absolute right-1 bg-gray-100 h-[400px] w-[250px] text-black top-20 z-50 p-4 ">
				<SideDrawer/>
			</div>

			{/* Navigation Links or Hamburger Menu */}
			{isMobile ? (
				<>
					{menuOpen ? renderCloseIcon() : renderHamburgerMenu()}

					{menuOpen && (
						<div className='absolute top-[90px] bg-pink w-full h-screen flex flex-col space-y-16 items-center pt-20 text-xl z-50 text-white font-medium'>
							{navLinks.map((link, idx) => (
								<div
									className=''
									key={idx}
									onClick={() => {
										setMenuOpen(false);
									}}
								>
									<Link to={link.href}>{link.text}</Link>
									<div className='bg-yellow border-2 border-yellow absolute bottom-0 left-0 w-full h-1 bg-yellow-300 transform translate-x-full transition-transform duration-300 ease-in-out hover:translate-x-0 z-50'></div>
								</div>
							))}
						</div>
					)}
				</>
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
