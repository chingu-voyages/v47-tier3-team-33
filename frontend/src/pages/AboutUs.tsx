import Planning from '../assets/Planning.png';
import { teamMembers } from 'data';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoGlobeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const AboutUs = () => {
	return (
		<div>
			<div className='-rotate-180 bg-pink h-[580px] md:h-[900px]'>
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

				<div className='w-full mt-10 md:mt-12 flex flex-col-reverse md:flex-row justify-center items-center -rotate-180 space-x-8'>
					<img
						src={Planning}
						alt='hero party image'
						className='w-[80%] md:w-[500px] md:h-[500px] lg:w-[30%] mt-20 md:mt-8'
					/>

					<h1 className='text-white text-2xl md:text-5xl px-4 md:w-[27%] font-medium ml-6 md:ml-0'>
						Elevate your celebrations to new heights with our meticulous
						attention to detail and unwavering commitment to excellence.
					</h1>
				</div>
			</div>
			{/* <img src={confetti} className=' w-full relative h-[600px]' /> */}
			<div className='mt-12 md:mt-40 py-6'>
				<h2 className='text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-pink'>
					Our Mission
				</h2>
				<div className='text-center leading-10 w-[80%] md:w-[50%] mx-auto'>
					<span className='text-[#3C0345] text-xl md:text-3xl'>
						Our mission is to create unforgettable moments where you, your
						friends, family, and customers come together to share in the magic
						of extraordinary events.
					</span>
					<br />

					<span className='text-[#3C0345] text-xl md:text-3xl'>
						We firmly believe that quality time spent together and the
						experiences we share are invaluable opportunities for connection and
						joy.
					</span>
					<br />
					<span className='text-[#3C0345] text-xl md:text-3xl'>
						By bringing people together, we envision a world united as one
						global family, where the bonds formed through shared experiences
						transcend boundaries.
					</span>
					<br />
					<span className='text-[#3C0345] text-xl md:text-3xl'>
						We invite you to share your thoughts and plans with the world,
						knowing that in doing so, you open the door for others to
						reciprocate your feelings and create meaningful connections.
						Together, let's celebrate the power of togetherness and the beauty
						of shared experiences that enrich our lives and weave the fabric of
					</span>
					<br />
					<span className='text-[#3C0345] text-xl md:text-3xl'>
						our collective humanity.
					</span>
				</div>
			</div>

			<section className='bg-white h-full mt-12 mb-40'>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
					<div className='mx-auto mb-8 max-w-screen-sm lg:mb-16'>
						<h2 className='text-4xl tracking-tight font-extrabold text-gray-900 dark:text-pink mb-10'>
							Team Members
						</h2>
					</div>
					<div className='grid gap-10 md:gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll my-20'>
						{teamMembers.map((member, idx) => (
							<div
								key={idx}
								className='text-center text-gray-500 dark:text-gray-400 overflow-y-scroll'
							>
								<img
									className='mx-auto mb-4 w-36 md:w-[200px] h-36 md:h-[200px] rounded-full'
									src={member.image}
									alt='chingu team member avatar'
								/>

								<h3 className='mb-1 text-2xl font-bold tracking-tight text-gray-900 '>
									{member.name}
								</h3>
								<p className='text-md md:text-xl'>{member.role}</p>
								<ul className='flex justify-center mt-4 space-x-4 text-2xl'>
									<li className='hover:text-pink rounded-full'>
										<Link to={member.github}>
											<FaGithub />
										</Link>
									</li>
									<li className='hover:text-pink rounded-full'>
										<Link to={member.linkedIn}>
											<FaLinkedin />
										</Link>
									</li>
									<li className='hover:text-pink rounded-full'>
										<Link to={member.website}>
											<IoGlobeOutline />
										</Link>
									</li>
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
