/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventsDetailPage from '../pages/EventsDetailPage';
import { FiShare } from 'react-icons/fi';
import RSVPButton from './RSVPButton';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';
import Moment from 'react-moment';
import 'moment-timezone';
import { IEvent } from 'interface';

interface EventCardProps {
	id?: {
		_id: string;
	};
	event: IEvent;
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

export default function EventCard({ event, id }: EventCardProps) {
	const socket = useSocket();
	const [cardEvent, setCardEvent] = useState<IEvent | null>(null);
	const [open, setOpen] = React.useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	console.log('event:', event);
	const handleOpen = () => setOpen(true);
	const handleClose: () => void = () => setOpen(false);

	const startDateString = event.startDate;
	const endDateString = event.endDate;

	useEffect(() => {
		if (startDateString) {
			const startDateObject = new Date(startDateString);
			const startformattedTime = startDateObject.toLocaleTimeString();
			const startFormattedDate = startDateObject.toLocaleDateString();
			setStartDate(startFormattedDate);

			setStartTime(startformattedTime);
		}

		if (endDateString) {
			const endDateObject = new Date(endDateString);
			const endFormattedTime = endDateObject.toLocaleTimeString();
			const endFormattedDate = endDateObject.toLocaleDateString();
			setEndDate(endFormattedDate);
			setEndTime(endFormattedTime);
		}
	}, [startDate, endDate, startTime, endTime]);

	console.log('sd', startDate);

	const fetchEvent = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/events/${event._id}`
			);
			setCardEvent(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id !== undefined) {
			fetchEvent();
		}
	}, [id]);

	useEffect(() => {
		socket &&
			socket.on(`eventUpdate:${event?._id}`, (data) => {
				setCardEvent((prevEvent) => {
					if (prevEvent) {
						return { ...prevEvent, attendees: data.attendees };
					}
					return prevEvent;
				});
			});
	}, [socket, event?._id]);

	console.log('event:', event);

	return (
		<div>
			<div
				onClick={handleOpen}
				className='cursor-pointer h-[370px] md:h-[430px] lg:h-[370px] xl:h-[430px] w-full border flex flex-grow rounded-md shadow-md'
			>
				<div className='w-full flex flex-col justify-between relative'>
					<div className='relative'>
						<img
							src={cardEvent ? cardEvent?.image : event?.image}
							alt='event image'
							className='h-[200px] md:h-[250px] lg:h-[190px] xl:h-[250px] w-full object-cover'
							onError={(e) => {
								const imgElement = e.target as HTMLImageElement;
								imgElement.src =
									'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
							}}
						/>

						

						<div className='p-2 text-lg'>
							<p className='font-medium md:text-lg'>
								{cardEvent ? cardEvent.title : event.title}
							</p>
							<p className=''>
								Date:{' '}
								<Moment format='ddd, MMM DD YYYY'>
									{cardEvent ? cardEvent.startDate : event.startDate}
								</Moment>
							</p>
							<p className=''>
								Time:{' '}
								<Moment format='h:mma'>
									{cardEvent ? cardEvent.startDate : event.startDate}
								</Moment>{' '}
								-
								<Moment format='h:mma'>
									{cardEvent ? cardEvent.endDate : event.endDate}
								</Moment>
							</p>
							<p className=''>
								Location: {cardEvent ? cardEvent.location : event.location}
							</p>
						</div>
					</div>
					<div className='flex justify-between p-2 w-full'>
						<p className=''>
							Attendees:{' '}
							{cardEvent
								? cardEvent?.attendees?.length
								: event?.attendees?.length}{' '}
						</p>
						<div className='space-x-3'>
							<div
								onClick={(event) => {
									event.stopPropagation();
								}}
							>
								<RSVPButton
									id={cardEvent ? cardEvent._id : event._id}
									organizerId={cardEvent?.organizer || event.organizer || ''}
								/>
							</div>
							<button className='absolute top-2 right-2 hover:text-white text-gray-300 opacity-20 hover:opacity-100 text-3xl flex flex-col items-center'>
								<FiShare />
								<p className='text-white text-sm opacity-0 hover:opacity-100'>
									Share
								</p>
							</button>
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
					<EventsDetailPage
						event={cardEvent ? cardEvent : event}
						handleClose={handleClose}
					/>
				</Box>
			</Modal>
		</div>
	);
}
