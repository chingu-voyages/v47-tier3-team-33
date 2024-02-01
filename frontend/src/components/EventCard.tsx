import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventsDetailPage from 'pages/EventsDetailPage';
import { FiShare } from 'react-icons/fi';
import RSVPButton from './RSVPButton';

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

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	height: '100%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function EventCard({ event }: EventCardProps) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<div
				onClick={handleOpen}
				className='cursor-pointer h-[370px] md:h-[430px] lg:h-[370px] xl:h-[430px] w-full border flex flex-grow rounded-md shadow-md'
			>
				<div className='w-full flex flex-col justify-between relative'>
					<div className='relative'>
						<img
							src={
								!event.image
									? 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
									: event.image
							}
							alt='event image'
							className='h-[200px] md:h-[250px] lg:h-[190px] xl:h-[250px] w-full'
						/>
						<p className='absolute bg-white text-black py-1 px-4 rounded-sm top-0 mt-2 ml-2'>
							Free
						</p>
						<div className='p-2 text-lg'>
							<p className='font-medium md:text-lg'>{event.title}</p>
							<p className=''>Date: Saturday, January 13, 2024</p>
							<p className=''>Time: 2:00pm - 3:00pm</p>
							<p className=''>Location: {event.location}</p>
						</div>
					</div>
					<div className='flex justify-between p-2 w-full'>
						<p className=''>Attendees: 20</p>
						<div className='space-x-3'>
							<div
								onClick={(event) => {
									event.stopPropagation();
								}}
							>
								<RSVPButton />
							</div>
							<button className='absolute top-2 right-2 hover:text-white text-gray-300 opacity-20 hover:opacity-100 text-3xl flex flex-col items-center'>
								<FiShare />
								<p className='text-white text-sm opacity-0 hover:opacity-100'>
									Share
								</p>
							</button>
							{/* <button className='bg-pink text-white rounded-md px-4'>
								Share
							</button> */}
						</div>
					</div>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<EventsDetailPage close={handleClose} event={event} />
				</Box>
			</Modal>
		</div>
	);
}
