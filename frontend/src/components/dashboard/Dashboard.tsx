import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Dashboard: React.FC = () => {
	const [photo, setPhoto] = useState<File | null>(null);
	const { user } = useAuth();
	const userId = user?._id ? user?._id : user?.user?._id;

	const [prefix, setPrefix] = useState('');
	const [contactInfo, setContactInfo] = useState({
		name: user?.user?.name,
		surname: user?.user?.surname,
		email: user?.user?.email,
		profile_img: user?.user?.profile_img,
	});

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	};

	const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPrefix(e.target.value);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`http://localhost:8000/users/${userId}`,
				contactInfo
			);

			console.log(response.data);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<div className='bg-gray-100 min-h-screen flex justify-center items-center'>
			<div className='bg-white rounded-md shadow-md p-8 space-y-8 max-w-4xl w-full overflow-y-auto'>
				<h1 className='text-3xl font-semibold mb-4 text-center'>
					Account Information
				</h1>
				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Upload Photo */}
					<div className='mb-8'>
						<h1 className='text-xl font-semibold text-black mb-4'>
							Upload Photo
						</h1>
						<input
							type='file'
							accept='image/*'
							className='input'
							onChange={handlePhotoChange}
						/>
					</div>

					{/* First and Last Name */}
					<div className='mb-8'>
						<h2 className='text-lg font-semibold mb-2'>Name</h2>
						<div className='grid grid-cols-2 gap-4'>
							<input
								type='text'
								placeholder='First Name'
								className='input'
								name='name'
								value={contactInfo.name}
								onChange={handleInputChange}
							/>
							<input
								type='text'
								placeholder='Last Name'
								className='input'
								name='surname'
								value={contactInfo.surname}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					{/* Contact Information */}
					<div className='mb-8'>
						<div className='grid grid-cols-2 gap-4'>
							{/* Add contact fields */}
							<input
								type='email'
								placeholder='Email'
								className='input'
								name='email'
								value={contactInfo.email}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className='flex justify-center'>
						<button
							type='submit'
							className='w-full bg-pink text-white py-2 px-4 rounded hover:bg-pink-600'
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Dashboard;
