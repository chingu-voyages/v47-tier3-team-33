import { useAuth } from '../context/AuthContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';

import Login from '../pages/Login';
import Register from '../pages/Register';

const style = {
	position: 'absolute' as 'absolute',
	top: '65%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	height: 800,
	width: 600,
};

const LRbutton = () => {
	const { login, setLogin } = useAuth();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button
				onClick={() => {
					handleOpen();
					setLogin(true);
				}}
			>
				Login
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>{login ? <Login /> : <Register />}</Box>
			</Modal>
		</div>
	);
};
export default LRbutton;
