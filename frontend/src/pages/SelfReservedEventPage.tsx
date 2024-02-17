import { MdKeyboardArrowLeft } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { IEvent } from 'interface';
interface EventCardProps {
	event: IEvent;
}

const tagsData = [
	'Conference',
	'Workshop',
	'Seminar',
	'Networking',
	'Party',
	'Exhibition',
];

const EventsDetailPage = ({
	close,
	event,
}: {
	close: () => void;
	event: IEvent;
}) => {
	const { user, setText, setConversationId } = useAuth();

	const eventId = event?._id;
	console.log('eventID*:', eventId);
	const eventOrganizerId = event?.organizer;
	console.log('event organizer*:', eventOrganizerId);
	const userId = user?.user?._id;
	console.log('userID*:', userId);

	const socket = useSocket();
	console.log('socket:', socket);
	console.log('eventt: ', event);
	console.log('userId:: ', userId);
	const navigate = useNavigate();

	const handleBookingEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await axios.post('https://omnievents.vercel.app/events/rsvp', {
				userId: userId,
				eventId: eventId,
			});

			if (socket) {
				socket.emit('rsvp', {
					type: 'rsvp', // Notification type
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
			.post('https://omnievents.vercel.app/conversations', {
				userId,
				eventOrganizerId,
			})
			.then((response) => {
				setConversationId(response.data.conversationId);
			});
	};
	return (
		<div className='h-full w-full overflow-y-auto md:px-[200px]'>
			<div className='text-xl mb-2'>
				<span className='flex items-center cursor-pointer' onClick={close}>
					<MdKeyboardArrowLeft />
					Go Back
				</span>
			</div>
			<div className='relative flex flex-col justify-center items-center mx-auto'>
				<img
					src={event.image}
					alt=''
					className='h-[350px]  md:h-[400px] w-full'
				/>
				<h1 className='font-medium md:text-4xl absolute top-40 text-white ml-4 w-[300px]'>
					{event.title}
				</h1>
				<div className='bg-white  md:w-34 h-[290px] fixed md:absolute bottom-0 md:top-20 right-0 py-8 px-8 mx-auto rounded md:mr-8 shadow-5xl'>
					<p className='font-semibold text-xl text-black'>Date & Time</p>
					<p className='text-gray-400'>Saturday, Sep 14, 2019 at 20:30 PM</p>
					<div className='flex flex-col space-y-2 text-white text-lg mt-4'>
						<button className='bg-pink py-2 rounded-md font-medium'>
							Remove Reservation
						</button>
						<button className='bg-darkTeal py-2 rounded-md font-medium'>
							Share this event
						</button>
						<button
							className='bg-teal py-2 rounded-md font-medium'
							onClick={() => {
								navigate('/my-account');

								// Open the messages tab and set the text to indicate MessageDashboard
								setText('messages');
								handContactOrganizer();
							}}
						>
							Contact event organizer
						</button>
					</div>
				</div>
				<div className='flex flex-col md:flex-row'>
					<div className='w-full md:w-[70%] p-8'>
						<div className=''>
							<p className='font-semibold text-black'>Description</p>
							<p className=''>{event.description}</p>
						</div>
						<div className='mt-20'>
							<p className='font-semibold text-black'>Agenda</p>
							<p className=''>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
								s!
							</p>
						</div>
						<div className='mt-20'>
							<p className='font-semibold text-black'>
								How can I contact the organizer with any question?
							</p>
							<p className=''>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
								s!
							</p>
						</div>
					</div>
					<div className='w-[35%] p-8 space-y-10'>
						<div className=''>
							<p className='font-semibold text-black'>Event Location</p>
							<div className='border rounded-md w-full h-40'></div>
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
						<div className=''>
							<p className='font-semibold text-black'>Share with friends</p>
							<ul className='flex space-x-2 mt-4 text-xl'>
								<li className=''>
									<FaFacebook />
								</li>
								<li className=''>
									<FaSquareXTwitter />
								</li>
								<li className=''>
									<FaLinkedin />
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventsDetailPage;
