import { useState } from 'react';
import { MdManageAccounts } from 'react-icons/md';
import { LuMessageSquare } from 'react-icons/lu';
import { IoCreate } from 'react-icons/io5';
import { TbStackFront } from 'react-icons/tb';
import { TbStackMiddle } from 'react-icons/tb';
import { useAuth } from '../context/AuthContext';

const AccountSidebar = () => {
	const [activeLink, setActiveLink] = useState<number>(0);

	const { setText, text } = useAuth();

	return (
		<div className='h-screen flex flex-col items-center absolute top-10 md:top-0 md:py-12 md:px-10 -ml-1 '>
			<div className='hidden md:block text-3xl font-medium mb-10'>
				My Dashboard
			</div>

			<div className='space-y-4 md:space-y-12 '>
				{NavLinks.map((link, idx) => (
					<div
						className={`font-medium text-xl cursor-pointer md:space-x-3 py-2 md:pl-2 flex md:items-center px-3 ${
							text === link.main && 'bg-pink text-white'
						}  rounded-md`}
						key={idx}
						onClick={() => {
							setActiveLink(idx);
							setText(link.main);
						}}
					>
						<p className='text-2xl'>{link.icon}</p>
						<div className='hidden md:block'>{link.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AccountSidebar;

const NavLinks = [
	{
		name: 'Account info',
		main: 'dashboard',
		icon: <MdManageAccounts />,
	},
	{
		name: 'Messages',
		main: 'messages',
		icon: <LuMessageSquare />,
	},
	{
		name: 'My events',
		main: 'your-created-events',
		icon: <TbStackFront />,
	},
	{
		name: 'Booked Events',
		main: 'booked-events',
		icon: <TbStackMiddle />,
	},
	{
		name: 'Create an event',
		main: 'create-event',
		icon: <IoCreate />,
	},
];
