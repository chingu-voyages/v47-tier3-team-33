import HeroImg from '../assets/hero-icon.png';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

function Hero() {
	const { user, handleOpen } = useAuth();
	console.log(user);

	return (
		<div className='h-full w-full'>
			<div className='left-0 w-full overflow-hidden line-0 transform -rotate-180 bg-pink h-[550px] md:h-[790px]'>
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
				<div className='w-full h-full absolute -top-10 md:top-0 left-0 -rotate-180 flex justify-center items-center md:items-stretch flex-col md:flex-row'>
					<div className='w-full text-center md:w-[50%] md:ml-40'>
						<h1 className='w-full mx-auto text-2xl md:text-5xl font-medium md:text-left text-[#f8f8f8f4] mt-6 md:mt-[20%] md:leading-[70px]'>
							Crafting Unforgettable Moments. Your Ultimate Events Planner.
						</h1>
						<div className='space-y-4 md:space-y-0 md:space-x-8 mt-[240px] md:mt-20 flex flex-col md:flex-row'>
							{user ? (
								<Link to={'/create-event'}>
									<button className='bg-white w-40 h-10 md:h-full md:w-full md:p-4 rounded-md md:text-2xl text-[#3C0345]'>
										Create a event
									</button>
								</Link>
							) : (
								<div>
									<button
										className='bg-white w-40 h-10 md:h-full md:w-full md:p-4 rounded-md md:text-2xl text-[#3C0345]'
										onClick={handleOpen}
									>
										Create a event
									</button>
								</div>
							)}
							<Link to='/events'>
								<button className='bg-white w-40 h-10 md:h-full md:w-full md:p-4 rounded-md md:text-2xl text-[#3C0345]'>
									Explore events
								</button>
							</Link>
						</div>
					</div>
					<div className='w-[60%] h-[60%]'>
						<img
							src={HeroImg}
							alt='hero party image'
							className='w-full h-[220px] md:h-[100%] -mt-[320px] md:mt-20'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
