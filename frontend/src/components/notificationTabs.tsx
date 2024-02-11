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
	console.log(notifications);
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const fetchAllNotifications = async () => {
		await axios
			.get(`http://localhost:8000/notifications/${userId}`)
			.then((response) => {
				setNotifications(response.data);
			});
	};

	useEffect(() => {
		fetchAllNotifications();
	}, []);

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs example'
				>
					<Tab label='All' {...a11yProps(0)} />å
					<Tab label='Unread' {...a11yProps(1)} />
					<Tab label='Read' {...a11yProps(2)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				{notifications.map((note, idx) => (
					<div className='' key={idx}>
						<div className='flex items-center justify-between shadow-md border border-b-gray-300 w-full p-4 py-8'>
							<p className=''>{note.message}</p>
							<p className='text-red-600 flex'>
								<p className=''>Mark as read</p>
							</p>
						</div>
					</div>
				))}
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				Item Two
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				Item Three
			</CustomTabPanel>
		</Box>
	);
}
