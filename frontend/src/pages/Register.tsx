import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { MdRemoveRedEye } from 'react-icons/md';
import { IoEyeOff } from 'react-icons/io5';

const Register = () => {
	const { handleLogin } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		first_name: '',
		sur_name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await axios
				.post('http://localhost:8000/users', {
					name: formData.first_name,
					surname: formData.sur_name,
					email: formData.email,
					password: formData.password,
				})
				.then((response) => {
					localStorage.setItem('user', JSON.stringify(response.data));
					window.location.reload();
				});
		} catch (error: any) {
			console.error('Registration failed:', error.message);
		}
	};
	return (
		<section>
			<div className='w-[50%] flex justify-center items-center mx-auto md:w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-50 dark:border-gray-700'>
				<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h2 className=' text-center text-xl font-bold leading-tight tracking-tight text-red-400 md:text-2xl dark:text-red-400'>
						Event Planner
					</h2>
					<h1 className='text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900'>
						Create an Account
					</h1>
					<form
						className='space-y-4 md:space-y-6'
						action='#'
						onSubmit={handleRegister}
					>
						<div className='columns-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900'>
									First Name
								</label>
								<input
									type='text'
									name='first_name'
									id='first_name'
									value={formData.first_name}
									onChange={handleChange}
									className='bg-gray-50 border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900'>
									Last Name
								</label>
								<input
									type='text'
									name='sur_name'
									id='sur_name'
									value={formData.sur_name}
									onChange={handleChange}
									className='bg-gray-50 border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
								/>
							</div>
						</div>
						<div>
							<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900'>
								Email Address
							</label>
							<input
								type='email'
								name='email'
								id='email'
								value={formData.email}
								onChange={handleChange}
								className='bg-gray-50 border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='name@company.com'
							/>
						</div>
						<div>
							<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900'>
								Password
							</label>
							<div className='flex bg-gray-50 border border-gray-300 justify-between items-center pr-2'>
								<input
									type={showPassword ? 'text' : 'password'}
									name='password'
									id='password'
									value={formData.password}
									onChange={handleChange}
									placeholder='••••••••'
									className='sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[94%] p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
								{showPassword ? (
									<MdRemoveRedEye
										onClick={() => {
											setShowPassword(false);
										}}
									/>
								) : (
									<IoEyeOff
										onClick={() => {
											setShowPassword(true);
										}}
									/>
								)}
							</div>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='remember'
										aria-describedby='remember'
										type='checkbox'
										className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label className='text-gray-500 dark:text-gray-300'>
										Remember me
									</label>
								</div>
							</div>
							<a
								href='#'
								className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
							>
								Forgot password?
							</a>
						</div>
						<button
							type='submit'
							className='w-full text-white bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
						>
							Sign in
						</button>
						<p className='text-sm font-light text-gray-500 dark:text-gray-400 w-full'>
							Already have an account?{' '}
							<p
								onClick={handleLogin}
								className='font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer'
							>
								Sign In
							</p>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Register;
