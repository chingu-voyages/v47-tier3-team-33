import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import omnilogo from '../assets/omni-logo.png';
import LRbutton from './LRbutton';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import SideDrawer from '../navigation/SideDrawer';
import { FaRegBell } from 'react-icons/fa';
import NotificationTabs from './notificationTabs';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

const NavBar: React.FC = () => {
	const socket = useSocket();
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [showNotifications, setShowNotifications] = useState<boolean>(false);
	const [newNotifications, setNewNotifications] = useState<boolean>(false);
	const [profileImage, setProfileImage] = useState('');
	const { user } = useAuth();
	const userId = user?._id ? user?._id : user?.user?._id;
	const currentUser = localStorage.getItem('user');

	useEffect(() => {
		if (currentUser) {
			const localUser = JSON.parse(currentUser);
			setProfileImage(localUser.profile_img);
		}
	}, [currentUser]);

	const fetchPendingNotifications = async () => {
		try {
			const response = await axios.get(
				`https://omni-events-571e671c7a3f.herokuapp.com/notifications/pending/${userId}`
			);
			const pendingNotifications = response.data;
			setNewNotifications(true);
		} catch (error) {
			console.error('Error fetching pending notifications:', error);
		}
	};

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

	useEffect(() => {
		socket &&
			socket.on('getNotification', () => {
				setNewNotifications((prevNotifications) => !prevNotifications);
			});
	}, [socket]);

	useEffect(() => {
		fetchPendingNotifications();
	}, [socket, user]);

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
			className='tham tham-e-squeeze tham-w-7 bg-pink w-[50px] md:w-[60px] md:h-[60px] text-center flex justify-start items-center pl-4 z-30'
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
		setDrawerIsOpen(!drawerIsOpen);
	};
	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};
	return (
		<nav className='bg-pink flex items-center justify-between relative py-6 md:py-8 w-full'>
			<div className='flex items-center justify-center absolute z-20'>
				<a href='/' className='text-white'>
					<img
						className='object-contain h-40 ml-6 md:h-60'
						src={omnilogo}
						alt='Omni logo'
					/>
				</a>
			</div>

			{drawerIsOpen && user && (
				<div className='rounded-lg absolute right-1 bg-gray-100 h-[440px] w-[250px] text-black top-20 z-50 p-4 '>
					<SideDrawer setDrawerIsOpen={setDrawerIsOpen} />
				</div>
			)}

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
										closeDrawerHandler();
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
					<div className='bg-white hover:bg-yellow text-darkTeal font-bold py-1.25 px-3 border border-white rounded'>
						<LRbutton />
					</div>
				) : (
					<div className='flex text-2xl space-x-6 text-white'>
						<div className='text-yellow cursor-pointer text-[22px] md:text-md'>
							<FaRegBell
								onClick={() => {
									setShowNotifications(!showNotifications);
									// BUG: Needs to persist new notifications to false across all pages after first click
									// Could use Context... investigating possible backend solutions first...
									setNewNotifications(false);
								}}
							/>
							{newNotifications && (
								<div className='w-2 h-2 bg-red-600 rounded-full absolute right-[80px] top-5 md:top-7'></div>
							)}
							{showNotifications && (
								<div>
									<div
										className='absolute h-6 w-9 z-50 top-16 bg-white right-[70px]'
										style={{
											borderTopLeftRadius: '50px',
											borderTopRightRadius: '50px',
										}}
									></div>
									<div className='absolute right-10 top-20 h-[100px] w-[440px] p-0 bg-white z-50 rounded'>
										<NotificationTabs />
									</div>
								</div>
							)}
						</div>
						<div onClick={openDrawerHandler}>
							{profileImage ? (
								<img
									src={profileImage}
									alt='profile image'
									className='h-7 w-7 md:h-7 md:w-12 rounded-full'
								/>
							) : user?.user?.profile_img ? (
								<img
									src={`https://omni-events-571e671c7a3f.herokuapp.com/${user?.user?.profile_img}`}
									alt='profile image'
									className='h-7 w-7 md:h-7 md:w-12 rounded-full'
								/>
							) : (
								<CgProfile />
							)}
						</div>
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
	{ href: '/contact', text: 'Contacts' },
];

export default NavBar;
