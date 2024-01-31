import React from 'react';
import ContactHero from '../components/ContactHero';

const ContactPage: React.FC = () => {
	return (
		<div className='flex flex-col justify-between items-center bg-white h-screen w-full mt-24 mb-[700px] relative'>
			<div className='mb-36'>
				<ContactHero />
			</div>

			<div className='justify-center container mx-auto px-80 rounded-md'>
				{/* Contact Form */}
				<form className='bg-white p-10 rounded-lg shadow-lg w-full'>
					<div className='mb-4'>
						<label
							htmlFor='name'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Your Name
						</label>
						<input
							type='text'
							id='name'
							name='name'
							className='w-full p-2 border border-gray-300 rounded text-black'
							placeholder='Your Name'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Your Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className='w-full p-2 border border-gray-300 rounded text-black'
							placeholder='Your Email'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='message'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							How can we help?
						</label>
						<textarea
							id='message'
							name='message'
							rows={4}
							className='w-full p-2 border border-gray-300 rounded text-black'
							placeholder='How can we help?'
						></textarea>
					</div>
					<button
						type='submit'
						className='bg-pink text-white font-bold py-2 px-4 rounded hover:bg-yellow'
					>
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactPage;
