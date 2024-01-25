import React from 'react';
import HeroImg from '../assets/hero-icon.png';
import { Link } from 'react-router-dom';

function Hero() {
	return (
		<div className='h-full w-full'>
			<div className=' left-0 w-full overflow-hidden line-0 transform -rotate-180 bg-pink h-[790px]'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'
					className='relative block w-full h-150'
				>
					<path
						d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
						className='relative block fill-white'
					></path>
				</svg>
				<div className='w-full h-full absolute top-0 left-0 -rotate-180 flex'>
					<div className='w-[50%] ml-40'>
						<h1 className='w-full text-5xl font-medium text-left text-[#f8f8f8f4] mt-[20%] leading-[70px]'>
							Crafting Unforgettable Moments. Your Ultimate Events Planner.
						</h1>
						<div className='space-x-8 mt-20'>
							<button className='bg-white p-4 rounded-md text-2xl text-[#3C0345]'>
								Get started for free
							</button>
							<Link to='/events'>
								<button className='bg-white p-4 rounded-md text-2xl text-[#3C0345]'>
									Explore events
								</button>
							</Link>
						</div>
					</div>
					<div className='w-[60%] h-[60%]'>
						<img
							src={HeroImg}
							alt='hero party image'
							className='w-[84%] h-[100%] mt-20'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
