import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Planner from './../assets/planner-svg.svg';
import { Link } from 'react-router-dom';
import {
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import BellSvg from '../assets/bell.svg';
import MessageSvg from '../assets/messageIcon.svg';
import Typewriter from 'typewriter-effect';
import confetti from '../assets/—Pngtree—colorful confetti falling png isolated_7432197.png';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface ICategory {
	_id: string;
	name: string;
	description: string;
	events: [];
	image: string;
}

function Features() {
	let [currIdx, setCurrIdx] = useState<number>(0);
	const [categories, setCategories] = useState<ICategory[]>([]);

	const prevSlide = () => {
		const isFirstSlide = currIdx === 0;
		const newIndex = isFirstSlide ? categories?.length - 1 : currIdx - 1;
		setCurrIdx(newIndex);
	};

	const nextSlide = () => {
		const newIndex = (currIdx + 3) % categories.length;
		setCurrIdx(newIndex);
	};

	const navigate = useNavigate();

	const { user, handleOpen } = useAuth();

	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1250);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 1250);
		};

		const fetchCategories = async () => {
			await axios.get('http://localhost:8000/categories').then((response) => {
				setCategories(response.data.categories);
			});
		};
		fetchCategories();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const renderSingleCategory = () => {
		return (
			<div
				key={currIdx}
				className='border bottom-2 border-black -mt-6 w-[250px] md:w-[320px] h-[250px] md:h-[370px] rounded-md relative shadow-md'
			>
				<img
					src={categories[currIdx]?.image}
					alt='category image'
					className='h-full w-full object-cover'
				/>
				<Link to={`/categories/${categories[currIdx]?._id}`}>
					<div className='absolute  w-full h-16 top-36 opacity-60 hover:opacity-100 shadow-md bg-pink flex items-center justify-center ease-in-out cursor-pointer'>
						{' '}
						<p className='text-3xl text-white'>{categories[currIdx]?.name}</p>
					</div>
				</Link>
			</div>
		);
	};

	return (
		<div className='h-full w-full bg-white z-20 relative pt-28 md:pt-36 pb-6 overflow-x-hidden'>
			<div className='flex flex-col items-center md:mt-6'>
				<div className='text-center leading-10'>
					<span className='text-[#3C0345] text-xl md:text-3xl font-semibold'>
						Welcome to OmniEvents Platform
					</span>
					<h3 className='text-pink text-3xl md:text-5xl mt-2 md:mt-4 w-[350px] md:w-full'>
						Create an event for your next gathering
					</h3>
				</div>

				<div className='flex items-center justify-center mt-[80px] gap-10 relative w-full'>
					<span
						onClick={prevSlide}
						className='text-3xl cursor-pointer mb-12 lg:-left-14 bg-yellow p-2 rounded-full absolute -bottom-28 left-14 lg:relative lg:bottom-0'
					>
						<MdKeyboardDoubleArrowLeft />
					</span>
					{isSmallScreen
						? renderSingleCategory()
						: categories.slice(currIdx, currIdx + 3).map((cat, idx) => (
								<div
									key={idx}
									className='border bottom-2 border-black -mt-6 w-[250px] md:w-[320px] h-[250px] md:h-[370px] rounded-md relative shadow-md'
								>
									<img
										src={cat.image}
										alt='category image'
										className='h-full w-full object-cover'
									/>
									<Link to={`/categories/${cat._id}`}>
										<div className='absolute  w-full h-16 top-36 opacity-60 hover:opacity-100 shadow-md bg-pink flex items-center justify-center ease-in-out cursor-pointer'>
											{' '}
											<p className='text-3xl text-white'>{cat.name}</p>
										</div>
									</Link>
								</div>
						  ))}
					<span
						onClick={nextSlide}
						className='text-3xl cursor-pointer mb-12 bg-yellow p-2 rounded-full absolute -bottom-28 right-12 lg:relative lg:-right-14 lg:bottom-0'
					>
						<MdKeyboardDoubleArrowRight />
					</span>
				</div>
			</div>

			<div className='bg-teal mt-20 md:mt-36 h-full w-full lg:h-[700px] py-20'>
				<p className='mx-auto flex justify-center items-center text-center text-4xl mb-20 lg:mb-0 text-black border-spacing-4 border-2 w-[200px] p-2'>
					Features
				</p>
				<div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-10 px-20'>
					<div className='flex flex-col items-center justify-evenly'>
						<img src={Planner} alt='planner' className='h-[200px]' />
						<div className='text-2xl font-medium text-center'>
							No More Chucky Planner
							<p className=''>Try our event planner made easy just for you</p>
						</div>
					</div>
					<div className='flex flex-col items-center justify-evenly'>
						<img src={BellSvg} alt='planner' className='h-[200px]' />
						<div className='text-2xl font-medium text-center'>
							<p className=''>Get notified on new events</p>
							Never miss another event with daily reminders
						</div>
					</div>
					<div className='flex flex-col items-center justify-evenly'>
						<img src={MessageSvg} alt='planner' className='h-[200px]' />
						<div className='text-2xl font-medium text-center'>
							<p className=''>Chat with event oragnizers easily</p>
							Didn't you get the memo? direct message the organizer with
							messenger widget
						</div>
					</div>
				</div>
			</div>
			<div className='h-[600px] md:h-[670px] w-full flex items-center justify-center text-center flex-col md:mt-[88px]'>
				<img src={confetti} className=' w-full relative h-[850px]' />
				<div className='absolute z-50 bg-white -mt-40 w-[350px] md:w-full'>
					<h2 className='text-pink text-3xl md:text-6xl w-full'>
						Create an event for your next{' '}
						<Typewriter
							options={{
								strings: ['meetup', 'party', 'concert'],
								autoStart: true,
								loop: true,
							}}
						/>{' '}
					</h2>

					<button
						className='bg-pink p-2 md:p-6 text-2xl md:text-4xl rounded-md mt-10 md:mt-28 text-white'
						onClick={() => {
							if (user) {
								navigate('/create-event');
							} else {
								window.scrollTo(0, 0);
								handleOpen();
							}
						}}
					>
						Get started
					</button>
				</div>
			</div>
		</div>
	);
}

export default Features;
