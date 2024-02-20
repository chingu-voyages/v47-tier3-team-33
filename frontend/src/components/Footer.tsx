import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import LOGO from '../assets/omni-logo.png';

function Footer() {
	return (
		<footer className='text-white w-full h-[455px] z-20 relative'>
			<div className='absolute bottom-0 left-0 w-full overflow-hidden bg-pink'>
				<svg
					data-name='Layer 1'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'
				>
					{' '}
					<path
						d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
						className='relative block fill-white bg-white'
					></path>{' '}
				</svg>

				<div className='w-full flex flex-col md:flex-row justify-start items-center md:justify-around -pt-20 pb-4 md:pb-0 md:-mt-20'>
					<div className='-mt-16 md:mt-0'>
						<img src={LOGO} alt='logo' className='h-[300px] md:h-[450px]' />
					</div>
					<div className='grid md:grid-cols-3 grid-cols-1 px-6 text-center md:text-left -mt-24 md:mt-12'>
						<div className='flex flex-col gap-5 mb-4 md:mb-0'>
							<h2 className='text-teal text-xl md:text-2xl'>Navigation</h2>
							<ul className='space-y-2'>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									<Link to='/about'>About</Link>
								</li>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									<Link to='/events'>Events</Link>
								</li>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									<Link to='/categories'>Categories</Link>
								</li>
							</ul>
						</div>
						<div className='flex flex-col gap-5 mb-4 md:mb-0'>
							<h2 className='text-teal text-xl md:text-2xl'>Company</h2>
							<ul className='space-y-2'>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									Developers
								</li>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									Accessibility
								</li>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									Terms of Service
								</li>
							</ul>
						</div>
						<div className='flex flex-col gap-5 mb-4 md:mb-0'>
							<h2 className='text-teal text-xl md:text-2xl'>Contact Us</h2>
							<ul className='space-y-2'>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									Email: company@omnievents.com
								</li>
								<li className='text-lg cursor-pointer hover:text-yellow md:text-xl'>
									<a href="mail">Phone: 443-678-4567</a>
								</li>
								<li className='flex items-center justify-center md:justify-start space-x-3 cursor-pointer'>
									<Link
										to='https://github.com/chingu-voyages/v47-tier3-team-33'
										className='text-white'
									>
										<FaGithub className='hover:text-yellow text-xl' />
									</Link>
									<Link
										to='https://www.linkedin.com/company/chingu-os/'
										className='text-white'
									>
										<FaLinkedinIn className='hover:text-yellow text-xl' />
									</Link>
									<Link
										to='https://twitter.com/ChinguCollabs'
										className='text-white'
									>
										<FaTwitter className='hover:text-yellow text-xl' />
									</Link>
									<FaInstagram className='hover:text-yellow text-xl' />
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
export {};
