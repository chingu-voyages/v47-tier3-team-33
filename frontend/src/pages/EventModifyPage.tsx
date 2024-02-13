import { MdKeyboardArrowLeft } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';

interface Event {
	_id: string;
	title: string;
	category: string;
	date?: Date;
	location: string;
	description: string;
	image: string;
	tickets: {
		type: string;
		price: number;
	}[];
}

interface EventCardProps {
	event: Event;
}

const tagsData = [
	'Conference',
	'Workshop',
	'Seminar',
	'Networking',
	'Party',
	'Exhibition',
];

const EventModifyPage = ({
	close,
	event,
}: {
	close: () => void;
	event: Event;
}) => {
	const { user } = useAuth();

	const eventId = event?._id;
	const userId = user?._id;

	const handleBookingEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8000/events/rsvp', {
				userId: userId,
				eventId: eventId,
			});
			toast('You have successfully RSVPed to the event!', {
				style: {
					color: 'green',
				},
			});
		} catch (error: any) {
			console.log(error);
		}
	};
	return (
		<form className='w-full max-w-2xl content-center mx-auto py-20'>
			<h2 className='flex justify-center items-center text-center text-xl font-bold leading-tight tracking-tight text-red-400 md:text-2xl dark:text-red-400 mb-10'>
				Event Planner
			</h2>
			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Event Name
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
						id='grid-first-name'
						type='text'
						value={event.title}
						
					/>
					<p className='text-red-500 text-xs italic'>
						Please fill out this field.
					</p>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Category
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-last-name'
						type='text'
						value={event.category}
					/>
				</div>
			</div>
			
			{/* <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Agenda
			</label>
			<input
				className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
				id='grid-first-name'
				type='text'
				value={event.agenda}
			/> */}

			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Location/address
			</label>
			<input
				className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
				id='grid-first-name'
				type='text'
			/>
			<p className='text-red-500 text-xs italic'>Please fill out this field.</p>
			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Description
			</label>
			<input
				className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
				id='grid-first-name'
				type='text'
			/>

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</form>


		// <div className='h-full w-full overflow-y-auto'>
		// 	<div className='text-xl mb-2'>
		// 		<span className='flex items-center cursor-pointer' onClick={close}>
		// 			<MdKeyboardArrowLeft />
		// 			Go Back
		// 		</span>
		// 	</div>
		// 	<div className='relative'>
		// 		<img src={event.image} alt='' className='h-[350px] w-full' />
		// 		<h1 className='font-medium md:text-4xl absolute top-40 text-white ml-4 w-[300px]'>
		// 			{event.title}
		// 		</h1>
				
		// 		<div className='flex'>
		// 			<div className='w-[100%] p-8'>
		// 			<div className=''>
		// 					<p className='font-semibold text-black'>Event Title</p>
		// 					<input className='' placeholder={event.title}></input>
		// 				</div>
		// 				<div className=''>
		// 					<p className='font-semibold text-black'>Description</p>
		// 					<input className='' placeholder={event.description}></input>
		// 				</div>
		// 				<div className='mt-20'>
		// 					<p className='font-semibold text-black'>Agenda</p>
		// 					<p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidems!
		// 					</p>
		// 				</div>
		// 				<div className='mt-20'>
		// 					<p className='font-semibold text-black'>
		// 						How can I contact the organizer with any question?
		// 					</p>
		// 					<p className=''>
		// 						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
		// 						s!
		// 					</p>
		// 				</div>
		// 			</div>
		// 			<div className='bg-white w-34 h-70 top-20 right-0 py-8 px-8 rounded mr-8'>
		// 				<p className='font-semibold text-xl text-black'>Date & Time</p>
		// 				<p className='text-gray-400'>Saturday, Sep 14, 2019 at 20:30 PM</p>
		// 				<div className='flex flex-col space-y-2 text-white text-lg mt-4'>
		// 					<button
		// 						className='bg-pink py-2 rounded-md font-medium'
		// 						onClick={handleBookingEvent}
		// 					>
		// 						Book Now (Free)
		// 					</button>
		// 					<button className='bg-darkTeal py-2 rounded-md font-medium'>
		// 						Share this event
		// 					</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default EventModifyPage;
