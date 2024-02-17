import AccountSidebar from 'components/AccountSidebar';
import { useEffect, useState } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { motion } from 'framer-motion';
import Dashboard from '../components/dashboard/Dashboard';
import MessageDashboard from '../components/dashboard/MessageDashboard';
import CreateEventPage from './CreateEventPage';
import { useAuth } from 'context/AuthContext';
import YourCreatedEvents from '../components/YourCreatedEvents';
import { Navigate } from 'react-router';

const variants = {
	expanded: { width: '14%' },
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
		component: <YourCreatedEvents />,
	},
	{
		name: 'booked-events',
	},
	{
		name: 'create-event',
		component: <CreateEventPage />,
	},
];
const AccountDashboard = () => {
	const { text, user } = useAuth();
	const [isExpanded, setIsExpanded] = useState<boolean>(true);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	if (!user) {
		return <Navigate to='/' />;
	}
	return (
		<div className='w-screen h-full  flex relative z-50 mb-80 overflow-x-hidden'>
			<motion.div
				animate={isExpanded ? 'expanded' : 'nonExpanded'}
				variants={variants}
				className=''
			>
				<AccountSidebar isExpanded={isExpanded} />
			</motion.div>
			<div
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
				className={`bg-pink w-5 h-5 rounded-full absolute ${
					isExpanded ? 'left-[16%]' : 'left-[7%]'
				} top-80 md:top-12 text-white font-bold pl-[5px] pt-[1px] cursor-pointer`}
			>
				{!isExpanded ? <MdArrowForwardIos /> : <MdArrowBackIos />}
			</div>
			<div className='w-full md:w-[95%] h-full pr-10 ml-20 border border-l-1'>
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
