import React from 'react';
import Planner from './../assets/planner-svg.svg';
import { Link } from 'react-router-dom';

function Features() {
	return (
		<div className='h-full w-full bg-white z-20 relative pt-36 pb-6'>
			<div className='mt-6'>
				<div className='text-center leading-10'>
					<span className='text-[#3C0345] text-3xl text-medium'>
						Welcome to OmniEvents Platform
					</span>
					<h3 className='text-pink text-5xl mt-4'>
						Create an event for your next gathering
					</h3>
				</div>
				<div className='flex items-center justify-center space-x-10 mt-[80px] '>
					<div className='border bottom-2 border-black w-[300px] h-[400px] rounded-md'></div>
					<div className='border bottom-2 border-black w-[300px] h-[400px] rounded-md'></div>
					<div className='border bottom-2 border-black w-[300px] h-[400px] rounded-md'></div>
				</div>
			</div>
			<div className='bg-teal mt-36 h-[730px]'>
				<div className='w-full h-full flex justify-center items-center'>
					<div className='w-[50%] flex justify-center items-center'>
						<img src={Planner} alt='planner' />
					</div>
					<div className='w-[50%] text-center space-y-12 -mt-18'>
						<h2 className='text-5xl text-pink'>No More Chucky Planner 🚫</h2>
						<p className='text-3xl'>
							Try our event planner made easy just for you
						</p>
						<Link to='/about'>
							<button className='bg-pink p-4 text-2xl rounded-md mt-20'>
								Learn more
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className=' h-[850px] flex items-center justify-center flex-col'>
				<h2 className='text-pink text-6xl'>
					Create an event for your next thing
				</h2>
				<button className='bg-pink p-6 text-3xl rounded-md mt-28'>
					Create an event
				</button>
			</div>
		</div>
	);
}

export default Features;
