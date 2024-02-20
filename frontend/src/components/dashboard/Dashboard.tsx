import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Dashboard: React.FC = () => {
	const { user } = useAuth();
	const userId = user?._id ? user?._id : user?.user?._id;

	const [contactInfo, setContactInfo] = useState({
		name: user?.user?.name,
		surname: user?.user?.surname,
		email: user?.user?.email,
	});

	const [profileImg, setProfileImg] = useState<File | null>(null);

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProfileImg(e.target.files[0]);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('name', contactInfo?.name ?? '');
			formData.append('surname', contactInfo?.surname ?? '');
			formData.append('email', contactInfo?.email ?? '');

			if (profileImg) {
				try {
					formData.append('profile_img', profileImg);

					const response = await axios.put(
						`https://omni-events-571e671c7a3f.herokuapp.com/users/${userId}/profileImg`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					);

					const updatedProfileImg = response.data.profile_img;

					// Get the current user from localStorage
					const userString = localStorage.getItem('user');

					if (userString) {
						const currentUser = JSON.parse(userString);

						// Update the profile_img property
						currentUser.profile_img = `https://omni-events-571e671c7a3f.herokuapp.com/${updatedProfileImg}`;

						// Save the updated user back to localStorage
						localStorage.setItem('user', JSON.stringify(currentUser));
					}
				} catch (error) {
					console.error('Error updating profile image:', error);
				}
			}

			const response = await axios.put(
				`https://omni-events-571e671c7a3f.herokuapp.com/users/${userId}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log(response.data);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<div className='bg-gray-100 h-full md:min-h-screen flex justify-center items-center'>
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
							name='profile_img'
							onChange={handlePhotoChange}
						/>
					</div>

					{/* Name and Last Name */}
					<div className='mb-8 grid grid-cols-2 gap-4'>
						<div>
							<h2 className='text-lg font-semibold mb-2'>Name</h2>
							<input
								type='text'
								placeholder='First Name'
								className='input'
								name='name'
								value={contactInfo.name}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<h2 className='text-lg font-semibold mb-2'>Last Name</h2>
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

					{/* Email */}
					<div className='mb-8'>
						<h2 className='text-lg font-semibold mb-2'>Email</h2>
						<input
							type='email'
							placeholder='Email'
							className='input'
							name='email'
							value={contactInfo.email}
							onChange={handleInputChange}
						/>
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
