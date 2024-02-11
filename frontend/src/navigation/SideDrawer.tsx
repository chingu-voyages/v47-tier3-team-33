import './SideDrawer.css'; //12
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import '../assets/profile icon.png';
import { useAuth } from 'context/AuthContext';

const SideDrawer = () => {
	const { setText } = useAuth();
	const navigate = useNavigate();

	return (
		<div className='text-left'>
			<h1 className='text-center'>Name</h1>
			<h2 className='text-center'>ss.id{}</h2>
			<br />
			<hr />
			<br />
			<button className='flex w-full bg-pink hover:bg-black text-white font-bold py-2 px-4 rounded'>
				<Link to='./dashboard'>Browse Events</Link>
			</button>
			<hr />
			<button className='flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded'>
				<Link to='./dashboard'>Manage My Events</Link>
			</button>
			<hr />
			<button className='flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded'>
				<Link to='./dashboard'>My joined Events</Link>
			</button>
			<hr />
			<button
				className='flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded'
				onClick={() => {
					setText('dashboard');
					navigate('/my-account');
				}}
			>
				Account Settings
			</button>
			<br />
			<hr />
			<br />
			<button className='flex bg-red-500 w-full hover:bg-black text-white font-bold py-2 px-4 rounded'>
				<Link to='./'>Log Out</Link>
			</button>
		</div>
	);
};

export default SideDrawer;