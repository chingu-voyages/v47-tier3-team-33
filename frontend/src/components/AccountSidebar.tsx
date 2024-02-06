import { useState } from 'react';
import { MdManageAccounts } from 'react-icons/md';
import { LuMessageSquare } from 'react-icons/lu';
import { IoCreate } from 'react-icons/io5';
import { TbStackFront } from 'react-icons/tb';
import { TbStackMiddle } from 'react-icons/tb';
import { BiLogOutCircle } from 'react-icons/bi';

interface SidebarProps {
	isExpanded: boolean;
	setText: (text: string) => void;
}

const AccountSidebar = ({ isExpanded, setText }: SidebarProps) => {
	const [activeLink, setActiveLink] = useState<number>(0);

	return (
		<div className='h-screen w-full px-10 py-12'>
			<div
				className={`hidden text-3xl font-medium mb-10 ${
					!isExpanded && 'hidden'
				}`}
			>
				My Dashboard
			</div>

			<div className='space-y-8'>
				{NavLinks.map((link, idx) => (
					<div
						className={`font-medium text-xl cursor-pointer space-x-3 py-3 pl-2 flex items-center ${
							activeLink === idx && 'bg-pink rounded-md text-white'
						}   rounded-sm`}
						key={idx}
						onClick={() => {
							setActiveLink(idx);
							setText(link.main);
						}}
					>
						<p className='pr-2 text-2xl'>{link.icon}</p>
						{isExpanded && <div className='hidden md:block'>{link.name}</div>}
					</div>
				))}
			</div>
			{/* <button className='mt-8 font-medium text-xl bg-pink text-white px-6 py-2 rounded-md flex items-center justify-between space-x-2'>
				<BiLogOutCircle />
				{isExpanded && <p className=''>Logout</p>}
			</button> */}
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
		main: 'my-events',
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