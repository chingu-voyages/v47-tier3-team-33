import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
interface Event {
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

const EventsDetailPage = ({
	close,
	event,
}: {
	close: () => void;
	event: Event;
}) => {
	console.log('eventtt', event);
	return (
		<div className='h-full w-full overflow-y-auto'>
			<div className='text-xl mb-2'>
				<span className='flex items-center cursor-pointer' onClick={close}>
					<MdKeyboardArrowLeft />
					Go Back
				</span>
			</div>
			<div className='relative'>
				<img src={event.image} alt='' className='h-[350px] w-full' />
				<h1 className='font-medium md:text-4xl absolute top-40 text-white ml-4 w-[300px]'>
					{event.title}
				</h1>
				<div className='bg-white w-34 h-70 absolute top-20 right-0 py-8 px-8 rounded mr-8'>
					<p className='font-semibold text-xl text-black'>Date & Time</p>
					<p className='text-gray-400'>Saturday, Sep 14, 2019 at 20:30 PM</p>
					<div className='flex flex-col space-y-2 text-white text-lg mt-4'>
						<button className='bg-pink py-2 rounded-md font-medium'>
							Book Now (Free)
						</button>
						<button className='bg-darkTeal py-2 rounded-md font-medium'>
							Share this event
						</button>
					</div>
				</div>
				<div className='flex'>
					<div className='w-[70%] p-8'>
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
							<div className='text-xs flex flex-wrap space-x-2 space-y-2 items-center mt-4'>
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
