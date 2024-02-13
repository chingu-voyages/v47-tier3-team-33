import AccountSidebar from 'components/AccountSidebar';
import { useEffect, useState } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { motion } from 'framer-motion';
import Dashboard from '../components/dashboard/Dashboard';
import MessageDashboard from '../components/dashboard/MessageDashboard';
import CreateEventPage from './CreateEventPage';
import { useAuth } from 'context/AuthContext';
import YourCreatedEvents from './YourCreatedEventsPage';
const variants = {
	expanded: { width: '25%' },
	nonExpanded: { width: '8%' },
};

const ComponentsArray = [
	{
		name: 'dashboard',
		component: <Dashboard />,
	},
	{
		name: 'messages',
		component: <MessageDashboard />,
	},
	{
		name: 'your-created-events',
		component: <YourCreatedEvents />
	},
	{
		name: '',
	},
	{
		name: 'create-event',
		component: <CreateEventPage />,
	},
];
const AccountDashboard = () => {
	const { text } = useAuth();
	const [isExpanded, setIsExpanded] = useState<boolean>(true);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className='h-full w-full flex relative z-50'>
			<motion.div
				animate={isExpanded ? 'expanded' : 'nonExpanded'}
				variants={variants}
				className='w-[25%] border border-r-1'
			>
				<AccountSidebar isExpanded={isExpanded} />
			</motion.div>
			<div
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
				className={`bg-pink w-5 h-5 rounded-full absolute ${
					isExpanded ? 'left-[22%]' : 'left-[7%]'
				} top-12 text-white font-bold pl-[5px] pt-[1px] cursor-pointer`}
			>
				{!isExpanded ? <MdArrowForwardIos /> : <MdArrowBackIos />}
			</div>
			<div className='w-[85%] h-full'>
				{ComponentsArray.map((comp, idx) => (
					<div className='' key={idx}>
						{comp.name === text && comp.component}
					</div>
				))}
			</div>
		</div>
	);
};

export default AccountDashboard;
