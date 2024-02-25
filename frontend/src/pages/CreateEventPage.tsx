import { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useFormik, FieldArray } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	category: Yup.string().required('Category is required'),
	startDate: Yup.date().required('Start date is required'),
	endDate: Yup.date()
		.required('End date is required')
		.min(Yup.ref('startDate'), 'End date must be later than start date'),
	location: Yup.string().required('Location is required'),
	description: Yup.string().required('Description is required'),
	image: Yup.mixed().required('Image is required'),
	venue: Yup.string().required('Venue is required'),
	tickets: Yup.array().of(
		Yup.object().shape({
			type: Yup.string().required('Ticket type is required'),
			price: Yup.number().required('Ticket price is required'),
		})
	),
});

interface ICategory {
	_id: string;
	name: string;
}

const CreateEventPage = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const { user } = useAuth();

	const formik = useFormik({
		initialValues: {
			title: '',
			category: '',
			startDate: '',
			endDate: '',
			location: '',
			description: '',
			image: '' as any,
			venue: '',
			organizer: user?.user?._id || user?._id || '',
			tickets: [{ type: '', price: 0 }],
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				const formData = new FormData();

				Object.keys(values).forEach((key) => {
					const value = (values as { [key: string]: any })[key];
					if (key === 'image' && value !== '') {
						formData.append(key, value as File);
					} else if (key === 'tickets') {
						(value as { type: string; price: number }[]).forEach(
							(ticket, index) => {
								formData.append(`tickets[${index}].type`, ticket.type);
								formData.append(
									`tickets[${index}].price`,
									ticket.price.toString()
								);
							}
						);
					} else if (typeof value === 'string' || value instanceof Blob) {
						formData.append(key, value as string | Blob);
					}
				});
				formData.append('organizer', user?.user?._id || user?._id || 'ohh');

				await axios.post(
					'https://omni-events-571e671c7a3f.herokuapp.com/events',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				toast('Event created successfully!', {
					style: {
						color: 'green',
					},
				});

				resetForm();
			} catch (error: any) {
				console.error(error);
				toast(error.message, {
					style: {
						color: 'red',
					},
				});
			}
		},
	});

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					'https://omni-events-571e671c7a3f.herokuapp.com/categories'
				);
				setCategories(response.data.categories);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<form
			className='w-full max-w-2xl content-center mx-auto py-20 mb-40 px-6 md:px-0'
			onSubmit={formik.handleSubmit}
		>
			<h2 className='flex justify-center items-center text-center text-xl font-bold leading-tight tracking-tight text-red-400 md:text-2xl dark:text-red-400 mb-10'>
				Event Planner
			</h2>
			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Event Name
					</label>
					<input
						className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
							formik.touched.title && formik.errors.title
								? 'border-red-500'
								: 'border-gray-200'
						} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
						id='title'
						type='text'
						placeholder='Event Name'
						name='title'
						value={formik.values.title}
						onChange={formik.handleChange}
					/>
					{formik.touched.title && formik.errors.title && (
						<p className='text-red-500 text-xs italic'>{formik.errors.title}</p>
					)}
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Category
					</label>
					<select
						name='category'
						value={formik.values.category}
						onChange={formik.handleChange}
						className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
							formik.touched.category && formik.errors.category
								? 'border-red-500'
								: 'border-gray-200'
						} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
					>
						<option value=''>Select a category</option>
						{categories?.map((category: ICategory) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>
					{formik.touched.category && formik.errors.category && (
						<p className='text-red-500 text-xs italic'>
							{formik.errors.category}
						</p>
					)}
				</div>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Start Date & Time
					</label>
					<input
						type='datetime-local'
						onChange={formik.handleChange}
						value={formik.values.startDate}
						name='startDate'
						className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
							formik.touched.startDate && formik.errors.startDate
								? 'border-red-500'
								: 'border-gray-200'
						} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
					/>
					{formik.touched.startDate && formik.errors.startDate && (
						<p className='text-red-500 text-xs italic'>
							{formik.errors.startDate}
						</p>
					)}
				</div>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						End Date & Time
					</label>
					<input
						type='datetime-local'
						onChange={formik.handleChange}
						value={formik.values.endDate}
						name='endDate'
						className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
							formik.touched.endDate && formik.errors.endDate
								? 'border-red-500'
								: 'border-gray-200'
						} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
					/>
					{formik.touched.endDate && formik.errors.endDate && (
						<p className='text-red-500 text-xs italic'>
							{formik.errors.endDate}
						</p>
					)}
				</div>
			</div>

			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Venue
			</label>
			<input
				className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
					formik.touched.venue && formik.errors.venue
						? 'border-red-500'
						: 'border-gray-200'
				} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
				id='venue'
				name='venue'
				type='text'
				value={formik.values.venue}
				onChange={formik.handleChange}
			/>
			{formik.touched.venue && formik.errors.venue && (
				<p className='text-red-500 text-xs italic'>{formik.errors.venue}</p>
			)}

			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Location/address
			</label>
			<input
				className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
					formik.touched.location && formik.errors.location
						? 'border-red-500'
						: 'border-gray-200'
				} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
				id='location'
				name='location'
				type='text'
				value={formik.values.location}
				onChange={formik.handleChange}
			/>
			{formik.touched.location && formik.errors.location && (
				<p className='text-red-500 text-xs italic'>{formik.errors.location}</p>
			)}

			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Description
			</label>
			<textarea
				className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
					formik.touched.description && formik.errors.description
						? 'border-red-500'
						: 'border-gray-200'
				} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
				id='description'
				name='description'
				value={formik.values.description}
				onChange={formik.handleChange}
			/>
			{formik.touched.description && formik.errors.description && (
				<p className='text-red-500 text-xs italic'>
					{formik.errors.description}
				</p>
			)}

			<div className='flex flex-wrap mb-6'>
				<FieldArray
					name='tickets'
					validateOnChange={false}
					render={(arrayHelpers) => (
						<div className='flex flex-wrap -mx-3 mb-6'>
							{formik.values.tickets.map((ticket, index) => (
								<div key={index} className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
										Ticket Type
									</label>
									<input
										className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
											formik.touched.tickets?.[index]?.type &&
											(
												formik.errors.tickets as {
													[key: number]: { type?: string };
												}
											)?.[index]?.type
												? 'border-red-500'
												: 'border-gray-200'
										} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
										type='text'
										name={`tickets[${index}].type`}
										value={ticket.type}
										onChange={formik.handleChange}
									/>
									{formik.touched.tickets?.[index]?.type &&
										(
											formik.errors.tickets as {
												[key: number]: { type?: string };
											}
										)?.[index]?.type && (
											<p className='text-red-500 text-xs italic'>
												{
													(
														formik.errors.tickets as {
															[key: number]: { type?: string };
														}
													)?.[index]?.type
												}
											</p>
										)}

									<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
										Ticket Price
									</label>
									<input
										className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
											formik.touched.tickets?.[index]?.price &&
											(
												formik.errors.tickets as {
													[key: number]: { price?: string };
												}
											)?.[index]?.price
												? 'border-red-500'
												: 'border-gray-200'
										} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
										type='number'
										name={`tickets[${index}].price`}
										value={ticket.price}
										onChange={formik.handleChange}
									/>

									{formik.touched.tickets?.[index]?.price &&
										(
											formik.errors.tickets as {
												[key: number]: { price?: string };
											}
										)?.[index]?.price && (
											<p className='text-red-500 text-xs italic'>
												{
													(
														formik.errors.tickets as {
															[key: number]: { price?: string };
														}
													)?.[index]?.price
												}
											</p>
										)}
								</div>
							))}

							<button
								type='button'
								onClick={() => arrayHelpers.push({ type: '', price: 0 })}
							>
								Add Ticket
							</button>
						</div>
					)}
				/>
			</div>

			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Event Image:
			</label>

			<input
				className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
					formik.touched.image && formik.errors.image
						? 'border-red-500'
						: 'border-gray-200'
				} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
				type='file'
				name='image'
				onChange={(event) => {
					const file = event.currentTarget.files?.[0];
					formik.setFieldValue('image', file || '');
				}}
			/>
			<input
				type='hidden'
				id='organizer'
				name='organizer'
				value={formik.values.organizer}
			/>

			{/* {formik.touched.image && formik.errors.image && (
				<p className='text-red-500 text-xs italic'>{formik.errors.image}</p>
			)} */}
			<button
				className='w-full bg-pink px-6 py-3 flex justify-center items-center'
				type='submit'
			>
				Create Event
			</button>
		</form>
	);
};

export default CreateEventPage;
