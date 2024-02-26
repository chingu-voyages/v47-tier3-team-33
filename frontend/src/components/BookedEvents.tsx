import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IEvent } from 'interface';
import Moment from 'react-moment';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';

interface BookedEventsProps {}

const BookedEvents: React.FC<BookedEventsProps> = () => {
	const [bookedEvents, setBookedEvents] = useState<IEvent[]>([]);
	const { user } = useAuth();
	const userId = user?._id ? user?._id : user?.user?._id;

	useEffect(() => {
		const fetchBookedEvents = async () => {
			try {
				const response = await axios.get(
					`https://omni-events-571e671c7a3f.herokuapp.com/events`
				);
				const fetchedEvents = response.data.events;

				const userEvent = fetchedEvents.filter((evnt: any) =>
					evnt.attendees.includes(userId)
				);
				setBookedEvents(userEvent);
			} catch (error) {
				console.error('Error fetching booked events:', error);
			}
		};

		fetchBookedEvents();
	}, []);

	const handleDeleteEvent = async (eventId: string) => {
		try {
			await axios.delete(
				`https://omni-events-571e671c7a3f.herokuapp.com/events/unbook/${eventId}`,
				{
					params: {
						userId,
					},
				}
			);
			// After deletion, fetch the updated list of events
			const response = await axios.get(
				`https://omni-events-571e671c7a3f.herokuapp.com/users/${userId}`
			);
			setBookedEvents(response.data.events);

			toast.success('Event cancelled!');
		} catch (error) {
			console.error('Error deleting event:', error);
			toast.error('There was a problem with unbooking this event');
		}
	};

	return (
		<div className='h-screen'>
			<h2 className='text-2xl font-bold mb-4 pt-12'>Booked Events</h2>
			{bookedEvents.length === 0 ? (
				<p>No booked events</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
					{bookedEvents?.map((event) => (
						<div
							key={event._id}
							className='bg-white rounded-lg shadow-md p-4 relative'
						>
							<h3 className='text-lg font-bold mb-2'>{event.title}</h3>
							<p className='mb-2'>
								<strong>Date:</strong>{' '}
								<Moment format='dddd, MMM DD, YYYY'>{event.startDate}</Moment>
							</p>
							<p className='mb-2'>
								<strong>Time:</strong>{' '}
								<Moment format='h:mm a'>{event.startDate}</Moment>
							</p>
							<p className='mb-2'>
								<strong>Location:</strong> {event.location}
							</p>
							<p className='mb-2'>
								<strong>Description:</strong> {event.description}
							</p>
							<p className='mb-2'>
								<strong>Hosted by:</strong> {event.organizer}
							</p>
							<button
								className='absolute bottom-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600'
								onClick={() => handleDeleteEvent(event._id)}
							>
								Delete Event
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default BookedEvents;
