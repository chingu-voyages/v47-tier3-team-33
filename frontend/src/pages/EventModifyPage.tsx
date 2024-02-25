import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import { IEvent } from 'interface';

const EventModifyPage = ({
	close,
	event,
}: {
	close: () => void;
	event: IEvent;
}) => {
	const { user } = useAuth();

	const eventId = event?._id;
	const userId = user?._id ? user?._id : user?.user?._id;

	const [data, setData] = useState<IEvent>({
		_id: event?._id,
		title: event?.title,
		category: event?.category,
		startDate: event?.startDate,
		endDate: event?.endDate,
		location: event?.location,
		description: event?.description,
		image: event?.image,
		venue: event?.venue,
		tickets: [[]],
	});

	const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await axios.put(
				`https://omni-events-571e671c7a3f.herokuapp.com/events/${eventId}`,
				{
					userId: userId,
					updatedEventData: data,
				}
			);
			toast('Event updated successfully!', {
				style: {
					color: 'green',
				},
			});
			window.location.reload();
		} catch (error: any) {
			console.error(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	return (
		<form
			className='w-full max-w-2xl content-center mx-auto py-20 relative'
			onSubmit={handleUpdateEvent}
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
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
						id='grid-first-name'
						type='text'
						name='title'
						value={data.title}
						onChange={handleChange}
					/>
					<p className='text-red-500 text-xs italic'>
						Please fill out this field.
					</p>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Category
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-last-name'
						type='text'
						name='catgeory'
						value={data.category}
						onChange={handleChange}
					/>
				</div>
			</div>

			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Location/address
			</label>
			<input
				className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
				id='grid-first-name'
				type='text'
				name='location'
				value={data.location}
				onChange={handleChange}
			/>
			<p className='text-red-500 text-xs italic'>Please fill out this field.</p>
			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Description
			</label>
			<input
				className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
				id='grid-first-name'
				type='text'
				name='description'
				value={data.description}
				onChange={handleChange}
			/>

			<button
				type='submit'
				className='px-6 py-3 bg-pink text-white absolute top-0 right-0 z-40 rounded-md'
			>
				Save
			</button>
		</form>
	);
};

export default EventModifyPage;
