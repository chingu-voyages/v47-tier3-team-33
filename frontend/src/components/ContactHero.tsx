import contactus from '../assets/contactus-img.png';
import contactText from '../assets/contactUs-text.svg';

const ContactHero = () => {
	return (
		<div className='flex flex-col justify-content container w-full z-20'>
			<img
				className='object-contain h-[450px]'
				src={contactus}
				alt='contact us sign'
			/>
			<img src={contactText} alt='' className='my-4 w-[800px] h-[300px]' />

			{/* <div className='w-full text-center leading-10'>
				<span className='text-[#3C0345] text-2xl text-medium'>
					Customer satisfaction is very important to us!
				</span>
				<br />
				<span className='text-[#3C0345] text-2xl text-medium'>
					Send a message using the contact
				</span>
				<br />
				<span className='text-[#3C0345] text-2xl text-medium'>
					form below for inquires.
				</span>
			</div> */}
		</div>
	);
};

export default ContactHero;
