import './SideDrawer.css';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/profile icon.png';
import { useAuth } from 'context/AuthContext';
import { CgProfile } from 'react-icons/cg';

interface SideDrawerProps {
	setDrawerIsOpen: (string: boolean) => void;
}

const SideDrawer = ({ setDrawerIsOpen }: SideDrawerProps) => {
	const { setText, user } = useAuth();
	const navigate = useNavigate();

	if (!user) {
		return null;
	}
	return (
		<div className='text-left z-60 h-full z-50'>
			<h1 className='text-center pb-6'>
				{user?.profile_img ? (
					<img
						src={user?.profile_img}
						alt='profile image'
						className='h-20 w-20 flex items-center justify-center mx-auto mb-1 rounded-full'
					/>
				) : user?.user?.profile_img ? (
					<img
						src={`https://omnievents.vercel.app/${user?.user?.profile_img}`}
						alt='profile image'
						className='h-20 w-20 flex items-center justify-center mx-auto mb-1 rounded-full'
					/>
				) : (
					<CgProfile />
				)}
				<p className='font-semibold'>
					Hi, {user?.user?.name} {user?.user?.surname}
				</p>
			</h1>

			<hr />

			<button
				className='flex w-full bg-pink hover:bg-black text-white font-bold py-2 px-4 rounded my-2'
				onClick={() => setDrawerIsOpen(false)}
			>
				<Link to='/events'>Browse Events</Link>
			</button>
			<hr />
			<button
				className='flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded my-2'
				onClick={() => {
					setText('your-created-events');
					navigate('/my-account');
					setDrawerIsOpen(false);
				}}
			>
				<p>Manage My Events</p>
			</button>
			<hr />
			<button
				className='flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded my-2'
				onClick={() => setDrawerIsOpen(false)}
			>
				<Link to='./dashboard'>My Booked Events</Link>
			</button>
			<hr />
			<button
				className='flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded my-2'
				onClick={() => {
					setText('dashboard');
					navigate('/my-account');
					setDrawerIsOpen(false);
				}}
			>
				Account Settings
			</button>

			<hr />

			<button
				className='flex bg-red-500 w-full hover:bg-black text-white font-bold py-2 px-4 rounded my-2'
				onClick={() => {
					localStorage.clear();
					setDrawerIsOpen(false);
					window.location.reload();
				}}
			>
				Log Out
			</button>
		</div>
	);
};

export default SideDrawer;
