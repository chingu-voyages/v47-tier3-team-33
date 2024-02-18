import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ScrollingTags from '../components/ScrollingTags';
import EventCard from 'components/EventCard';
import axios from 'axios';
import { IEvent } from 'interface';

const EventsPage = () => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

	useEffect(() => {
		const getAllEvents = async () => {
			await axios
				.get('https://omnievents-ab5a3a5ddba2.herokuapp.com/events')
				.then((response) => {
					setEvents(response.data.events);
					setFilteredEvents(response.data.events); // Initially set to all events
				});
		};
		getAllEvents();
	}, []);

	const handleSearch = (query: string) => {
		const filtered = events.filter((event) =>
			event.title.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredEvents(filtered);
	};

	return (
		<div className='justify-center h-full m-8 mb-72'>
			<div className='flex justify-center pt-32 text-black text-4xl '>
				Explore Events
			</div>
			<div className='flex items-center pt-20 '>
				<SearchBar onSearch={handleSearch} />
			</div>
			<ScrollingTags />
			<div className='h-full'>
				<h3 className='text-black text-2xl font-medium mb-8 mt-12'>
					Upcoming events
				</h3>
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
					{filteredEvents?.map((event, idx) => (
						<EventCard key={idx} event={event} />
					))}
				</div>
			</div>
		</div>
	);
};

export default EventsPage;
