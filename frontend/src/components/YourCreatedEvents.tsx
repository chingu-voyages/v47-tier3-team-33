import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatedEventsCard from './CreatedEventsCard';
import { useAuth } from '../context/AuthContext';
import animatiedGif from '../assets/florid-task-management.gif';
import { IEvent } from 'interface';

const YourCreatedEvents = () => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const { user, setText } = useAuth();
	const userId = user?.user?._id;

	useEffect(() => {
		const getUserCreatedEvents = async () => {
			const eventsArr = await axios.get(`http://localhost:8000/events`);
			const userEvents = eventsArr.data.events.filter(
				(e: IEvent) => e.organizer === userId
			);
			setEvents(userEvents);
			console.log(userEvents);
		};
		getUserCreatedEvents();
	}, []);

	return (
		<div className='flex flex-col justify-center h-full w-full m-8 mb-72 -ml-2'>
			<div className='h-full'>
				{events.length > 0 ? (
					<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5'>
						{events.map((event, idx) => (
							<CreatedEventsCard key={idx} event={event} />
						))}
					</div>
				) : (
					<div className='flex flex-col justify-center items-center pt-6'>
						<h2 className='text-2xl md:text-4xl mb-4 font-medium'>
							Nothing to see here!
						</h2>
						<img src={animatiedGif} alt='' className='w-[600px]' />
						<button
							className='mt-8 bg-pink text-white px-6 py-3 text-lg rounded-md'
							onClick={() => setText('create-event')}
						>
							Create an Event
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
export default YourCreatedEvents;
