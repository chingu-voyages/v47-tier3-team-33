import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatedEventsCard from './CreatedEventsCard';

interface IEvent {
	_id: string;
	title: string;
	category: string;
	location: string;
	description: string;
	image: string;
	tickets: [];
}

const YourCreatedEvents = () => {
	const [events, setEvents] = useState<IEvent[]>([]);

	useEffect(() => {
		const getAllEvents = async () => {
			await axios.get('http://localhost:8000/events').then((response) => {
				setEvents(response.data.events);
			});
		};
		getAllEvents();
	}, []);

	return (
		<div className=' justify-center h-full m-8 mb-72'>
			<div className='flex justify-center pt-32 text-black text-4xl '>
				Explore Events
			</div>
			
			<div className='h-full'>
				<h3 className='text-black text-2xl font-medium mb-8 mt-12'>
					Upcoming events
				</h3>
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
					{events.map((event, idx) => (
						<CreatedEventsCard key={idx} event={event} />
					))}
				</div>
			</div>
			{/* Add other components or content here */}
		</div>
	);
};
export default YourCreatedEvents;
