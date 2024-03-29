import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';
import { useSocket } from '../context/SocketContext';
interface RSVPButtonProps {
	id?: string;
	organizerId: string;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const RSVPButton: React.FC<RSVPButtonProps> = ({ id, organizerId }) => {
	const socket = useSocket();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { user } = useAuth();

	const userId = user?._id ? user?._id : user?.user?._id;

	const eventId = id;

	const handleBookingEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			await axios.post(
				'https://omni-events-571e671c7a3f.herokuapp.com/events/rsvp',
				{
					userId,
					eventId,
				}
			);

			toast('You have successfully RSVPed to the event!', {
				style: {
					color: 'green',
				},
			});

			if (socket) {
				socket.emit('sendNotification', {
					sender: userId,
					recipient: organizerId,
				});
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div>
			<button
				onClick={handleOpen}
				className='bg-pink text-white rounded-md px-4'
			>
				RSVP
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Interested in this event?
					</Typography>
					<div className=' flex items-center space-x-4'>
						<button
							className='bg-pink px-4 rounded-sm'
							onClick={(e) => {
								handleBookingEvent(e);
								handleClose();
							}}
						>
							YES
						</button>
						<button className='bg-pink px-4 rounded-sm' onClick={handleClose}>
							NO
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default RSVPButton;
