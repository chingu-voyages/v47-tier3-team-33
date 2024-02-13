import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventModifyPage from 'pages/EventModifyPage';
import { FiShare } from 'react-icons/fi';
import axios from 'axios';

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
	id?: {
		_id: string;
	};
	event: Event;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	height: '70%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,

};

export default function CreatedEventCard({ event, id }: EventCardProps) {
	const [cardEvent, setCardEvent] = useState<Event | null>(null);

	const eventId = id && typeof id === 'object' ? id._id : id;

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const fetchEvent = async () => {
		{
			const event = await axios.get(`http://localhost:8000/events/${eventId}`);
			console.log('eve', event.data);
			setCardEvent(event.data);
		}
	};
	useEffect(() => {
		if (id !== undefined) {
			fetchEvent();
		}
	}, []);

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
								cardEvent
									? !cardEvent.image
										? 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
										: cardEvent.image
									: !event.image
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
							<p className='font-medium md:text-lg'>
								{cardEvent ? cardEvent.title : event.title}
							</p>
							<p className=''>Date: Saturday, January 13, 2024</p>
							<p className=''>Time: 2:00pm - 3:00pm</p>
							<p className=''>
								Location: {cardEvent ? cardEvent.location : event.location}
							</p>
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
							</div>
							<button 
							onClick={(event) => {
								event.stopPropagation();
								setOpen(true);
								}}
							className='bg-blue-500  rounded-md px-4 hover:text-white text-gray-300  hover:opacity-100 flex flex-col items-center '>
							Edit
							</button>
							<button className='bg-blue-500  rounded-md px-4 hover:text-white text-gray-300  hover:opacity-100 flex flex-col items-center '>
								<div className="grid grid-cols-3 justify-items-center items-center">
								<FiShare />
								<p>
									Share
								</p>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* <div onClick={handleOpen} className='cursor-pointer h-[370px] md:h-[430px] lg:h-[370px] xl:h-[430px] w-full border flex flex-grow rounded-md shadow-md'>
				<div className="md:flex-shrink-0">
				<img className="h-48 w-full object-cover md:w-48" src={
					cardEvent
									? !cardEvent.image
										? 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
										: cardEvent.image
									: !event.image
									? 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
									: event.image} alt="Event image"/>
				</div>
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Event Name: {cardEvent ? cardEvent.title : event.title}</div>
					<p className="block mt-1 text-lg leading-tight font-medium text-black">Location: {cardEvent ? cardEvent.location : event.location}</p>
					<p className="block mt-1 text-lg leading-tight font-medium text-black"></p>
					<div className='space-x-3'>

						<div >
							<button 
							onClick={(event) => {
								event.stopPropagation();
								setOpen(true);
								}}
							className='bg-blue-500  rounded-md px-4 hover:text-white text-gray-300  hover:opacity-100 flex flex-col items-center '>
							Edit
							</button>
							<button className='bg-blue-500  rounded-md px-4 hover:text-white text-gray-300  hover:opacity-100 flex flex-col items-center '>
								<div className="grid grid-cols-3 justify-items-center items-center">
								<FiShare />
								<p>
									Share
								</p>
								</div>
							</button>
						</div>
						
					</div>
				</div>

			</div> */}
			
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'

			>
				<Box sx={style}>
					<EventModifyPage
						close={handleClose}
						event={cardEvent ? cardEvent : event}

					/>
				</Box>
			</Modal>
		</div>
	);
}
