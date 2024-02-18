import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { FaRegClock } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import ShareModal from '../components/ShareModal';
import { IEvent } from 'interface';
import Moment from 'react-moment';
interface EventCardProps {
	event: IEvent;
	handleClose: () => void;
}

const tagsData = [
	'Conference',
	'Workshop',
	'Seminar',
	'Networking',
	'Party',
	'Exhibition',
];

const EventsDetailPage = ({ event, handleClose }: EventCardProps) => {
	const { user, setText, setConversationId } = useAuth();

	const [eventHost, setEventHost] = useState('');

	const eventId = event?._id;
	const eventOrganizerId = event?.organizer;
	const userId = user?._id ? user?._id : user?.user?._id;

	const socket = useSocket();
	const navigate = useNavigate();

	const handleBookingEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8000/events/rsvp', {
				userId: userId,
				eventId: eventId,
			});

			if (socket) {
				socket.emit('rsvp', {
					type: 'rsvp',
					eventId: eventId,
					userId: userId,
					organizerId: eventOrganizerId,
				});
				console.log('RSVP socket event emitted successfully');
			}

			toast('You have successfully RSVPed to the event!', {
				style: {
					color: 'green',
				},
			});
		} catch (error: any) {
			console.log(error);
		}
	};

	const handContactOrganizer = async () => {
		await axios
			.post('http://localhost:8000/conversations', {
				userId,
				eventOrganizerId,
			})
			.then((response) => {
				setConversationId(response.data.conversationId);
			});
	};

	useEffect(() => {
		const response = axios
			.get(`http://localhost:8000/users/${event?.organizer}`)
			.then((res) => setEventHost(res.data.name + ' ' + res.data.surname));
	}, []);

	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	return (
		<div className='h-full w-full overflow-y-auto md:px-[100px]'>
			<div className='text-xl mb-2'>
				<span
					className='flex items-center cursor-pointer'
					onClick={handleClose}
				>
					<MdKeyboardArrowLeft />
					Go Back
				</span>
			</div>
			<div className='relative flex flex-col justify-center items-center mx-auto'>
				<img
					src={event.image}
					alt=''
					className='h-[350px]  md:h-[500px] w-full object-cover'
				/>
				<h1 className='font-medium md:text-4xl absolute top-40 text-white ml-4 w-[300px]'>
					{event.title}
				</h1>
				<div className='bg-white  md:w-34 h-[290px] fixed md:absolute bottom-0 md:top-20 right-0 py-8 px-8 mx-auto rounded md:mr-8 shadow-5xl'>
					<p className='font-semibold text-xl text-black'>Date & Time</p>
					<p className='text-gray-400'>
						<Moment format='dddd, MMM DD, YYYY'>{event.startDate}</Moment> at{' '}
						<Moment format='h:mm a'>{event.startDate}</Moment>
					</p>
					<div className='flex flex-col space-y-2 text-white text-lg mt-4'>
						<button
							className='bg-pink py-2 rounded-md font-medium'
							onClick={handleBookingEvent}
						>
							Book Now (Free)
						</button>
						<button
							className='bg-darkTeal py-2 rounded-md font-medium'
							onClick={() => setIsShareModalOpen(true)}
						>
							Share this event
						</button>
						<button
							className='bg-teal py-2 rounded-md font-medium'
							onClick={() => {
								navigate('/my-account');
								setText('messages');
								handContactOrganizer();
							}}
						>
							Contact event organizer
						</button>
					</div>
				</div>
				<div className='flex flex-col md:flex-row'>
					<div className='w-full md:w-[70%] p-8 space-y-10'>
						<div className=''>
							<p className='font-semibold text-black'>Description</p>
							<p className=''>{event.description}</p>
						</div>
						<div className=''>
							<p className='font-semibold text-black'>Event Location</p>
							<div className=''>{event.location}</div>
						</div>
						<div className='w-full'>
							<p className='font-semibold text-black'>Tags</p>
							<div className='text-xs flex flex-wrap space-x-2 space-y-2 items-center mt-4 w-full'>
								{tagsData.map((tag, idx) => (
									<div className='bg-gray-100 p-2 px-3 rounded-lg' key={idx}>
										{tag}
									</div>
								))}
							</div>
						</div>
						<div className='mt-20'>
							<p className='font-semibold text-black'>Refund Policy</p>
							<p className=''>Contact the organizer to request a refund.</p>
						</div>
						<div className=''>
							<p className='text-black font-semibold'>Hosted by:</p>
							<p className=''>{eventHost}</p>
						</div>
					</div>
					<div className='w-[35%] p-8 space-y-10'>
						<div className='w-full h-fyll py-6'>
							<p className='font-semibold text-black'>
								Get Tickets (Pay at the door){' '}
							</p>
							<div className='space-y-4'>
								{event?.tickets?.map((ticket, id) => (
									<div className='' key={id}>
										<div className=''>
											<p className=''>{ticket[0]?.type}</p>
											<p className=''>${ticket[0]?.price}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			{isShareModalOpen && (
				<ShareModal
					onClose={() => setIsShareModalOpen(false)}
					url={window.location.href}
				/>
			)}
		</div>
	);
};

export default EventsDetailPage;
