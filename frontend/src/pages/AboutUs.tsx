import Planning from '../assets/Planning.png';
import { teamMembers } from 'data';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoGlobeOutline } from 'react-icons/io5';
import confetti from '../assets/—Pngtree—colorful confetti falling png isolated_7432197.png';
import { Link } from 'react-router-dom';

const AboutUs = () => {
	return (
		<div className=''>
			<div className=' -rotate-180 bg-pink h-[500px] md:h-[800px]'>
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

				<div className='w-full mt-[27%] md:mt-40 flex flex-col-reverse md:flex-row justify-center items-center -rotate-180'>
					<img
						src={Planning}
						alt='hero party image'
						className='w-[80%] md:w-[50%] mt-8'
					/>

					<h1 className='text-white text-3xl md:text-5xl px-4 md:w-[37%] font-semibold ml-6 md:ml-0'>
						Crafting Unforgettable Moments. Your Ultimate Events Planner.
					</h1>
				</div>
			</div>
			{/* <img src={confetti} className=' w-full relative h-[600px]' /> */}
			<div className='mt-6 md:mt-40 py-6'>
				<h2 className='text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-pink'>
					Our Mission
				</h2>
				<div className='text-center leading-10 w-[90%] mx-auto '>
					<span className='text-[#3C0345] text-2xl text-medium'>
						Our mission is for you and your friends, family,
					</span>
					<br />
					<span className='text-[#3C0345] text-2xl text-medium'>
						and customers can get together and share amazing events together.
					</span>
					<br />
					<span className='text-[#3C0345] text-2xl text-medium'>
						We believe quality time and events are such a great opprotunity and
					</span>
					<br />
					<span className='text-[#3C0345] text-2xl text-medium'>
						gift for people to have toegether we can unite the world as a
						family.
					</span>
					<br />
					<span className='text-[#3C0345] text-2xl text-medium'>
						Share your thoughts and plans with the world so the world can
						recipricate
					</span>
					<br />
					<span className='text-[#3C0345] text-2xl text-medium'>
						your thoughts and feelings.
					</span>
				</div>
			</div>

			<section className='bg-white h-full mt-20 mb-40'>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
					<div className='mx-auto mb-8 max-w-screen-sm lg:mb-16'>
						<h2 className='text-4xl tracking-tight font-extrabold text-gray-900 dark:text-pink mb-10'>
							Team Members
						</h2>
					</div>
					<div className='grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll'>
						{teamMembers.map((member, idx) => (
							<div
								key={idx}
								className='text-center text-gray-500 dark:text-gray-400 overflow-y-scroll'
							>
								<img
									className='mx-auto mb-4 w-36 h-36 rounded-full'
									src={member.image}
									alt='chingu team member avatar'
								/>

								<h3 className='mb-1 text-2xl font-bold tracking-tight text-gray-900 '>
									<a href='#'>{member.name}</a>
								</h3>
								<p>{member.role}</p>
								<ul className='flex justify-center mt-4 space-x-4'>
									<br />
									<li>
										<Link
											to={member.github}
											className='text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300'
										>
											<FaGithub />
										</Link>
									</li>
									<li>
										<Link
											to={member.linkedIn}
											className='text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300'
										>
											<FaLinkedin />
										</Link>
									</li>
									<li>
										<Link
											to={member.website}
											className='text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300'
										>
											<IoGlobeOutline />
										</Link>
									</li>
									<br />
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutUs;
