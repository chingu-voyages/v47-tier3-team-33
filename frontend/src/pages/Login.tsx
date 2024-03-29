import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';

const Login = () => {
	const { loginUser, handleLogin, handleClose } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const message = await loginUser(formData);
			toast.success(message);
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data.error);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='w-[50%] md:w-full bg-white rounded-lg shadow dark:border mt-28 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-50 dark:border-gray-700'>
				<div
					className='text-lg absolute bg-pink p-2 text-white'
					onClick={handleClose}
				>
					<IoClose />
				</div>
				<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h1 className='text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900'>
						Welcome Back!
					</h1>

					<form
						className='space-y-4 md:space-y-6'
						action='#'
						onSubmit={handleLoginSubmit}
					>
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
							<div className='bg-gray-50 border border-gray-300 flex justify-between items-center w-full pr-1'>
								<input
									type={showPassword ? 'text' : 'password'}
									name='password'
									id='password'
									value={formData.password}
									onChange={handleChange}
									placeholder='••••••••'
									className=' sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[94%] p-2.5 selection:dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
						<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
							Don’t have an account yet?{' '}
							<button
								className='font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									handleLogin();
								}}
							>
								Sign up
							</button>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
