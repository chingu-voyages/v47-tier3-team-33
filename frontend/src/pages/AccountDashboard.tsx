import AccountSidebar from 'components/AccountSidebar';
import { useEffect } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import MessageDashboard from '../components/dashboard/MessageDashboard';
import CreateEventPage from './CreateEventPage';
import { useAuth } from 'context/AuthContext';
import YourCreatedEvents from '../components/YourCreatedEvents';
import { Navigate } from 'react-router';

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!user) {
		return <Navigate to='/' />;
	}
	return (
		<div className='w-screen h-full flex relative z-40 mb-80 overflow-x-hidden'>
			<div className='flex justify-center items-center px-8 md:px-40'>
				<AccountSidebar />
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
