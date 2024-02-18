import { useState, useEffect } from 'react';
import { useAuth } from 'context/AuthContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface INotification {
	_id: string;
	type: string;
	message: string;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{}}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function NotificationTabs() {
	const { user } = useAuth();
	const userId = user?._id;

	const [notifications, setNotifications] = useState<INotification[]>([]);
	const [value, setValue] = useState(0);

	// const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	// 	setValue(newValue);
	// };

	const fetchAllNotifications = async () => {
		await axios
			.get(`http://localhost:8000/notifications/${userId}`)
			.then((response) => {
				setNotifications(response.data);
			});
	};

	const markAsRead = async (notificationId: string) => {
		try {
			await axios.patch(
				`http://localhost:8000/notifications/${notificationId}`,
				{
					status: 'read',
				}
			);

			setNotifications((prevNotifications) =>
				prevNotifications.map((notification) =>
					notification._id === notificationId
						? { ...notification, read: true }
						: notification
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteNotification = async (notificationId: string) => {
		try {
			await axios.delete(
				`http://localhost:8000/notifications/${notificationId}`
			);

			setNotifications((prevNotifications) =>
				prevNotifications.filter(
					(notification) => notification._id !== notificationId
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchAllNotifications();
	}, []);

	return (
		<Box sx={{ width: '100%', zIndex: 100, backgroundColor: 'white' }}>
			<CustomTabPanel value={value} index={0}>
				{notifications
					.slice(notifications.length - 1, notifications.length)
					.reverse()
					.map((note, idx) => (
						<div className='' key={idx}>
							<div className='flex items-center justify-between shadow-md border border-b-gray-300 w-full p-4 py-8'>
								<div className='text-black text-md font-medium'>
									{note?.type === 'new_inbox_message' && 'New inbox message'}
									{note?.type === 'event_booked' && 'New event reservation'}
									{note?.type === 'event_cancelled' &&
										'An event you rsvp for has been cancelled.'}
									{note?.type === 'event_updated' &&
										'An event you rsvp for has been updated.'}
								</div>
								<div className='text-red-600 flex'>
									<p className=''>Mark as read</p>
								</div>
							</div>
						</div>
					))}
			</CustomTabPanel>
		</Box>
	);
}
