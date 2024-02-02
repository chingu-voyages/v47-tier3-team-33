import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Planner from './../assets/planner-svg.svg';
import { Link } from 'react-router-dom';
import {
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useMediaQuery } from '@mui/material';
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
	const isMobile = useMediaQuery('(min-width: 640px)');
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

	const { user } = useAuth();

	useEffect(() => {
		const fetchCategories = async () => {
			await axios.get('http://localhost:8000/categories').then((response) => {
				console.log(response.data);
				setCategories(response.data.categories);
			});
		};
		fetchCategories();
	}, []);

	return (
		<div className='h-full w-full bg-white z-20 relative pt-28 md:pt-36 pb-6'>
			<div className='flex flex-col items-center md:mt-6'>
				<div className='text-center leading-10'>
					<span className='text-[#3C0345] text-xl md:text-3xl font-semibold'>
						Welcome to OmniEvents Platform
					</span>
					<h3 className='text-pink text-3xl md:text-5xl mt-2 md:mt-4 w-[350px] md:w-full'>
						Create an event for your next gathering
					</h3>
				</div>

				<div className='flex items-center justify-center mt-[80px] gap-10 '>
					<span
						onClick={prevSlide}
						className='text-3xl cursor-pointer mb-12 bg-yellow p-2 rounded-full'
					>
						<MdKeyboardDoubleArrowLeft />
					</span>
					{categories.slice(currIdx, currIdx + 3).map((cat, idx) => (
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
						className='text-3xl cursor-pointer mb-12 bg-yellow p-2 rounded-full'
					>
						<MdKeyboardDoubleArrowRight />
					</span>
				</div>
			</div>
			<div className='bg-teal mt-20 md:mt-36 h-[730px] md:pt-20'>
				<div className='w-full h-full flex flex-col-reverse md:flex-row justify-center items-center'>
					<div className='w-[50%] flex justify-center items-center -mt-6'>
						<img src={Planner} alt='planner' className='h-[400px]' />
					</div>
					<div className='md:w-[50%] text-center space-y-12 mt-40 md:-mt-28 flex flex-col items-center'>
						<h2 className='w-[80%] text-4xl md:text-5xl text-pink'>
							No More Chucky Planner 🚫
						</h2>
						<p className='text-3xl md:text-4xl md:w-[600px]'>
							Try our event planner made easy just for you
						</p>
						<Link to='/about'>
							<button className='bg-pink p-4 text-2xl rounded-md md:mt-20 text-white'>
								Learn more
							</button>
						</Link>
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
