import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatedEventsCard from './CreatedEventsCard';
import { useAuth } from '../context/AuthContext';

interface IEvent {
	_id: string;
	title: string;
	category: string;
	location: string;
	description: string;
	image: string;
	organizer?: string;
	tickets: [];
}

const YourCreatedEvents = () => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const { user } = useAuth();
	const userId = user?.user?._id;

	useEffect(() => {
		const getUserCreatedEvents = async () => {
			const eventsArr = await axios.get(`http://localhost:8000/events`);
			const userEvents = eventsArr.data.events.filter(
				(e: IEvent) => e.organizer === userId
			);
			setEvents(userEvents);
		};
		getUserCreatedEvents();
	}, []);

	return (
		<div className=' justify-center h-full m-8 mb-72'>
			<div className='h-full'>
				{events.length > 0 ? (
					<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5'>
						{events.map((event, idx) => (
							<CreatedEventsCard key={idx} event={event} />
						))}
					</div>
				) : (
					<div>
						<h2 className=''>Nothing to see here! creatw an event</h2>
					</div>
				)}
			</div>
		</div>
	);
};
export default YourCreatedEvents;
