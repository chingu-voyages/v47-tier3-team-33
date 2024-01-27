import React, { useState } from 'react';
import Planner from './../assets/planner-svg.svg';
import { Link } from 'react-router-dom';
import {
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useMediaQuery } from '@mui/material';
import Typewriter from 'typewriter-effect';
import confetti from '../assets/—Pngtree—colorful confetti falling png isolated_7432197.png';

const categories = [
	{
		title: 'Music',
		image:
			'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		title: 'Technology',
		image:
			'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		title: 'Sports & Fitness',
		image:
			'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		title: 'Theatre & Arts',
		image:
			'https://images.unsplash.com/photo-1640891175384-e599abd85c6d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
];

function Features() {
	const isMobile = useMediaQuery('(min-width: 640px)');
	let [currIdx, setCurrIdx] = useState<number>(0);

	const prevSlide = () => {
		const isFirstSlide = currIdx === 0;
		const newIndex = isFirstSlide ? categories.length - 1 : currIdx - 1;
		setCurrIdx(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currIdx === categories.length - 1;
		const newIndex = isLastSlide ? 0 : currIdx + 1;
		setCurrIdx(newIndex);
	};

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
				{!isMobile ? (
					<div className='flex items-center justify-center space-x-10 mt-[80px]'>
						<span onClick={prevSlide}>
							<MdKeyboardDoubleArrowLeft />
						</span>
						<div className='border bottom-2 border-black -mt-6 w-[250px] md:w-[300px] h-[250px] md:h-[370px] rounded-md relative'>
							<img
								src={categories[currIdx].image}
								alt='category image'
								className='h-full w-full object-cover'
							/>
							<div className='absolute bg-darkTeal w-full h-16 bottom-0 flex items-center justify-center'>
								{' '}
								<p className='text-3xl text-black'>
									{categories[currIdx].title}
								</p>
							</div>
						</div>
						<span onClick={nextSlide}>
							<MdKeyboardDoubleArrowRight />
						</span>
					</div>
				) : (
					<div className='flex items-center justify-center space-x-10 mt-[80px] '>
						{categories.map((cat, idx) => (
							<div
								key={idx}
								className='border bottom-2 border-black -mt-6 w-[250px] md:w-[300px] h-[250px] md:h-[370px] rounded-md relative'
							>
								<img
									src={cat.image}
									alt='category image'
									className='h-full w-full object-cover'
								/>
								<div className='absolute bg-darkTeal w-full h-16 bottom-0 flex items-center justify-center'>
									{' '}
									<p className='text-3xl text-black'>{cat.title}</p>
								</div>
							</div>
						))}
					</div>
				)}
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
					<button className='bg-pink p-2 md:p-6 text-2xl md:text-4xl rounded-md mt-10 md:mt-28 text-white'>
						Get started
					</button>
				</div>
			</div>
		</div>
	);
}

export default Features;
