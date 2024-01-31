import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function RSVPButton() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
						<button className='bg-pink px-4 rounded-sm'>YES</button>
						<button className='bg-pink px-4 rounded-sm'>NO</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
