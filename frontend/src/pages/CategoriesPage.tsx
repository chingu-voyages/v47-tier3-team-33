import axios from 'axios';
import EventCard from 'components/EventCard';
import Loader from 'components/Loader';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

interface ICategory {
	_id: string;
	name: string;
	description: string;
	events: [];
	image: string;
}

const CategoriesPage = () => {
	const [category, setCategory] = useState<ICategory | null>(null);
	const [categories, setCategories] = useState<ICategory[]>([]);

	const { id } = useParams<{ id: string }>();

	const navigate = useNavigate();

	const fetchCategoryById = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/categories/${id}`
			);
			setCategory(response.data.category);
		} catch (error) {
			console.error('Error fetching category:', error);
		}
	};

	const fetchAllCategories = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/categories`);
			setCategories(response.data.categories);
		} catch (error) {
			console.error('Error fetching category:', error);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (id) {
			fetchCategoryById();
		} else {
			fetchAllCategories();
		}
	}, [id]);

	if ((!category && id) || (!categories && !id)) {
		return <Loader />;
	}
	return (
		<div className='h-full'>
			{category && (
				<div className='h-full mb-72'>
					<div className='text-3xl mt-10 pl-8 py-30'>{category?.name}</div>
					<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-8'>
						{category?.events.map((event, idx) => (
							<EventCard event={event} id={event} />
						))}
					</div>
				</div>
			)}
			{categories && (
				<div className='h-full mb-72'>
					<div className='text-3xl mt-10 pl-8 py-30'>Categories</div>
					<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 p-8'>
						{categories?.map((cat, idx) => (
							<div
								className='cursor-pointer'
								key={idx}
								onClick={() => {
									navigate(`/categories/${cat._id}`);
								}}
							>
								<img
									src={cat.image}
									alt='category image'
									className='h-60 w-full'
								/>
								<div className='text-2xl text-black pl-2 p-4 bg-gray-300'>
									{cat.name}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoriesPage;
