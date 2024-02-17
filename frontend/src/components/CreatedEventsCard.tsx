import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventModifyPage from 'pages/EventModifyPage';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ShareModal from './ShareModal';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
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
	width: '50%',
	height: '70%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function CreatedEventCard({ event, id }: EventCardProps) {
	console.log('event event:', event);
	const [cardEvent, setCardEvent] = useState<IEvent | null>(null);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const { user } = useAuth();
	const userId = user?._id ? user?._id : user?.user?._id;

	const eventId = event?._id;

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const fetchEvent = async () => {
		const event = await axios.get(
			`https://omnievents.vercel.app/events/${eventId}`
		);
		console.log('evve', event.data);
		setCardEvent(event.data);
	};

	const deleteEvent = async () => {
		try {
			const event = await axios.delete(
				`https://omnievents.vercel.app/events/${eventId}`,
				{
					data: {
						userId: userId,
					},
				}
			);

			toast(`Event was deleted successfully!`, {
				style: {
					color: 'green',
				},
			});

			window.location.reload();
		} catch (error: any) {
			toast('There was an error!', {
				style: {
					color: 'red',
				},
			});
			console.log(error);
		}
	};

	useEffect(() => {
		fetchEvent();
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
							src={cardEvent ? cardEvent?.image : event?.image}
							alt='event image'
							className='h-[200px] md:h-[250px] lg:h-[190px] xl:h-[250px] w-full'
							onError={(e) => {
								const imgElement = e.target as HTMLImageElement;
								imgElement.src =
									'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
							}}
						/>
						{/* {event?.tickets.length > 1 ? (
							<div className=''>{event?.tickets[0][0]?.price}</div>
						) : (
							<p className='absolute bg-white text-black py-1 px-4 rounded-sm top-0 mt-2 ml-2'>
								{event?.tickets[0][0]?.price}
							</p>
						)} */}
						<div className='p-2 text-lg'>
							<p className='font-medium md:text-lg'>
								{cardEvent ? cardEvent.title : event.title}
							</p>
							<p className=''>
								Date:{' '}
								<Moment format='ddd, MMM DD YYYY'>{event.startDate}</Moment>
							</p>
							<p className=''>
								Time: <Moment format='h:mma'>{event.startDate}</Moment> -
								<Moment format='h:mma'>{event.endDate}</Moment>
							</p>
							<p className=''>
								Location: {cardEvent ? cardEvent.location : event.location}
							</p>
						</div>
					</div>
					<div className='flex justify-between p-2 w-full'>
						<div className='flex items-center text-gray-500 space-x-2'>
							<FaUserAlt />{' '}
							<p>
								{cardEvent
									? cardEvent?.attendees?.length
									: event?.attendees?.length}
							</p>
						</div>
						<div className='flex'>
							<div className='flex w-full space-x-4'>
								<button
									onClick={(event) => {
										event.stopPropagation();
										setOpen(true);
									}}
									className='bg-pink rounded-md px-4 hover:text-white text-gray-300  hover:opacity-100 flex flex-col items-center'
								>
									Edit
								</button>
								<button
									onClick={(event) => {
										event.stopPropagation();
										setIsShareModalOpen(true);
									}}
									className='bg-pink rounded-md px-4 hover:text-white text-gray-300  hover:opacity-100 flex flex-col items-center'
								>
									<p>Share</p>
								</button>
								<button
									onClick={(event) => {
										event.stopPropagation();
										deleteEvent();
									}}
									className='bg-pink rounded-md px-4 hover:text-white text-gray-300  hover:opacity-100 flex flex-col items-center'
								>
									<p>Delete</p>
								</button>
							</div>
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
					<EventModifyPage
						close={handleClose}
						event={cardEvent ? cardEvent : event}
					/>
				</Box>
			</Modal>
			{isShareModalOpen && (
				<ShareModal
					onClose={() => setIsShareModalOpen(false)}
					url={window.location.href}
				/>
			)}
		</div>
	);
}
